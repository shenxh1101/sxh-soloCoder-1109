const JsSandbox = {
    async run(code) {
        return new Promise((resolve) => {
            let output = [];
            let hasError = false;
            let errorMessage = '';

            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;

            const captureOutput = (type, ...args) => {
                const message = args.map(arg => {
                    if (typeof arg === 'object') {
                        try {
                            return JSON.stringify(arg);
                        } catch (e) {
                            return String(arg);
                        }
                    }
                    return String(arg);
                }).join(' ');
                output.push({ type, message });
            };

            console.log = (...args) => captureOutput('stdout', ...args);
            console.error = (...args) => captureOutput('stderr', ...args);
            console.warn = (...args) => captureOutput('stderr', ...args);

            try {
                const timeoutId = setTimeout(() => {
                    throw new Error('代码执行超时（超过5秒）');
                }, 5000);

                const result = eval(code);
                
                clearTimeout(timeoutId);
                
                if (result !== undefined) {
                    output.push({ type: 'result', message: String(result) });
                }
            } catch (error) {
                hasError = true;
                errorMessage = error.message;
                output.push({ type: 'error-header', message: '错误：' });
                output.push({ type: 'error-message', message: errorMessage });
            } finally {
                console.log = originalLog;
                console.error = originalError;
                console.warn = originalWarn;
            }

            resolve({
                success: !hasError,
                output: output,
                error: hasError ? errorMessage : null
            });
        });
    }
};
