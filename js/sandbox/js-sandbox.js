const JsSandbox = {
    async run(code, timeoutMs = 3000) {
        return new Promise((resolve) => {
            let output = [];
            let hasError = false;
            let errorMessage = '';

            const workerCode = `
                self.onmessage = function(e) {
                    const code = e.data.code;
                    let output = [];
                    
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
                        const startTime = Date.now();
                        const checkTimeout = () => {
                            if (Date.now() - startTime > ${timeoutMs}) {
                                throw new Error('代码执行超时（超过' + (${timeoutMs} / 1000) + '秒）');
                            }
                        };
                        
                        const result = eval(code);
                        
                        if (result !== undefined) {
                            output.push({ type: 'result', message: String(result) });
                        }
                        
                        self.postMessage({ success: true, output: output });
                    } catch (error) {
                        output.push({ type: 'error-header', message: '错误：' });
                        output.push({ type: 'error-message', message: error.message });
                        self.postMessage({ success: false, output: output, error: error.message });
                    } finally {
                        console.log = originalLog;
                        console.error = originalError;
                        console.warn = originalWarn;
                    }
                };
            `;

            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const workerUrl = URL.createObjectURL(blob);
            const worker = new Worker(workerUrl);

            const timeoutId = setTimeout(() => {
                worker.terminate();
                URL.revokeObjectURL(workerUrl);
                output.push({ type: 'error-header', message: '错误：' });
                output.push({ type: 'error-message', message: `代码执行超时（超过${timeoutMs/1000}秒），可能存在死循环` });
                resolve({
                    success: false,
                    output: output,
                    error: '代码执行超时'
                });
            }, timeoutMs);

            worker.onmessage = (e) => {
                clearTimeout(timeoutId);
                worker.terminate();
                URL.revokeObjectURL(workerUrl);
                resolve({
                    success: e.data.success,
                    output: e.data.output,
                    error: e.data.error || null
                });
            };

            worker.onerror = (e) => {
                clearTimeout(timeoutId);
                worker.terminate();
                URL.revokeObjectURL(workerUrl);
                output.push({ type: 'error-header', message: '错误：' });
                output.push({ type: 'error-message', message: e.message || '代码执行出错' });
                resolve({
                    success: false,
                    output: output,
                    error: e.message || '代码执行出错'
                });
            };

            worker.postMessage({ code: code });
        });
    }
};
