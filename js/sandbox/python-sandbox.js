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

    async run(code, timeoutMs = 3000) {
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

        let isCancelled = false;
        const timeoutId = setTimeout(() => {
            isCancelled = true;
            if (typeof Sk !== 'undefined' && Sk.execStart) {
                try {
                    Sk.misceval.cancel = true;
                } catch (e) {}
            }
        }, timeoutMs);

        try {
            Sk.execLimit = 1000000;
            
            const result = await Sk.misceval.asyncToPromise(() => {
                if (isCancelled) {
                    throw new Error(`代码执行超时（超过${timeoutMs/1000}秒），可能存在死循环`);
                }
                return Sk.importMainWithBody("<stdin>", false, code, true);
            });
        } catch (error) {
            clearTimeout(timeoutId);
            hasError = true;
            
            if (isCancelled) {
                errorMessage = `代码执行超时（超过${timeoutMs/1000}秒），可能存在死循环`;
            } else {
                errorMessage = error.toString ? error.toString() : String(error);
                
                if (errorMessage.includes('Error:')) {
                    const parts = errorMessage.split('Error:');
                    const errorType = parts[0].split('.').pop() + 'Error';
                    const errorMsg = parts[parts.length - 1].trim();
                    errorMessage = `${errorType}: ${errorMsg}`;
                }
            }
            
            this.currentOutput.push({ type: 'error-header', message: '错误：' });
            this.currentOutput.push({ type: 'error-message', message: errorMessage });
        }

        clearTimeout(timeoutId);

        const output = this.currentOutput || [];
        this.currentOutput = null;

        return {
            success: !hasError,
            output: output,
            error: hasError ? errorMessage : null
        };
    }
};
