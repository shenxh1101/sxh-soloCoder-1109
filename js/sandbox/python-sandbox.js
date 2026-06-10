const PythonSandbox = {
    isLoaded: false,

    ensureLoaded() {
        return new Promise((resolve, reject) => {
            if (this.isLoaded) {
                resolve();
                return;
            }

            if (typeof Sk !== 'undefined') {
                this.isLoaded = true;
                this.configureSkulpt();
                resolve();
                return;
            }

            let attempts = 0;
            const checkSkulpt = () => {
                if (typeof Sk !== 'undefined') {
                    this.isLoaded = true;
                    this.configureSkulpt();
                    resolve();
                } else if (attempts < 50) {
                    attempts++;
                    setTimeout(checkSkulpt, 200);
                } else {
                    reject(new Error('Skulpt 加载失败'));
                }
            };
            checkSkulpt();
        });
    },

    configureSkulpt() {
        if (typeof Sk === 'undefined') return;
        
        Sk.configure({
            output: function(text) {
                if (PythonSandbox.currentOutput) {
                    PythonSandbox.currentOutput.push({ type: 'stdout', message: text });
                }
            },
            read: function(x) {
                if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                    throw "File not found: '" + x + "'";
                return Sk.builtinFiles["files"][x];
            },
            __future__: Sk.python3
        });
    },

    async run(code) {
        try {
            await this.ensureLoaded();
        } catch (error) {
            return {
                success: false,
                output: [{ type: 'error-header', message: '错误：' }, { type: 'error-message', message: 'Python 运行环境加载失败' }],
                error: 'Python 运行环境加载失败'
            };
        }

        this.currentOutput = [];
        let hasError = false;
        let errorMessage = '';

        try {
            const result = await Sk.misceval.asyncToPromise(() => {
                return Sk.importMainWithBody("<stdin>", false, code, true);
            });
        } catch (error) {
            hasError = true;
            errorMessage = error.toString ? error.toString() : String(error);
            
            if (errorMessage.includes('Error:')) {
                const parts = errorMessage.split('Error:');
                const errorType = parts[0].split('.').pop() + 'Error';
                const errorMsg = parts[parts.length - 1].trim();
                errorMessage = `${errorType}: ${errorMsg}`;
            }
            
            this.currentOutput.push({ type: 'error-header', message: '错误：' });
            this.currentOutput.push({ type: 'error-message', message: errorMessage });
        }

        const output = this.currentOutput || [];
        this.currentOutput = null;

        return {
            success: !hasError,
            output: output,
            error: hasError ? errorMessage : null
        };
    }
};
