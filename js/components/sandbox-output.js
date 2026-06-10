const SandboxOutput = {
    container: null,
    statusEl: null,
    isTyping: false,
    typeSpeed: 20,

    init(containerId, statusId = null) {
        this.container = document.getElementById(containerId);
        if (statusId) {
            this.statusEl = document.getElementById(statusId);
        }
    },

    setStatus(status, text) {
        if (!this.statusEl) return;
        
        this.statusEl.className = 'sandbox-status ' + status;
        this.statusEl.textContent = text;
    },

    clear() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="output-placeholder">
                <span class="placeholder-icon">⌨️</span>
                <span class="placeholder-text">选择修复方案后点击"运行"查看结果</span>
            </div>
        `;
        this.setStatus('', '等待运行');
    },

    showRunning() {
        if (!this.container) return;
        this.container.innerHTML = '<div class="output-line stdout">运行中...</div>';
        this.setStatus('running', '运行中');
    },

    async showOutput(outputData, useTypingEffect = true) {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        this.setStatus(outputData.success ? 'success' : 'error', 
                       outputData.success ? '运行成功' : '运行出错');

        if (!outputData.output || outputData.output.length === 0) {
            this.container.innerHTML = '<div class="output-line result">（无输出）</div>';
            return;
        }

        if (useTypingEffect) {
            await this.typeOutput(outputData.output);
        } else {
            outputData.output.forEach(item => {
                this.addLine(item.message, item.type);
            });
        }
    },

    async typeOutput(outputLines) {
        this.isTyping = true;
        
        for (const item of outputLines) {
            await this.typeLine(item.message, item.type);
        }
        
        this.isTyping = false;
    },

    async typeLine(text, type = 'stdout') {
        const lineElement = document.createElement('div');
        lineElement.className = 'output-line ' + type;
        this.container.appendChild(lineElement);
        lineElement.scrollIntoView({ behavior: 'smooth', block: 'end' });

        for (let i = 0; i < text.length; i++) {
            lineElement.textContent += text[i];
            await Helpers.delay(this.typeSpeed);
        }
        
        if (text.endsWith('\n') || type === 'stdout') {
        }
    },

    addLine(text, type = 'stdout') {
        const lineElement = document.createElement('div');
        lineElement.className = 'output-line ' + type;
        lineElement.textContent = text;
        this.container.appendChild(lineElement);
        this.container.scrollTop = this.container.scrollHeight;
    },

    showError(errorMessage) {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        this.setStatus('error', '运行出错');
        
        const header = document.createElement('div');
        header.className = 'output-line error-header';
        header.textContent = '错误：';
        this.container.appendChild(header);
        
        const message = document.createElement('div');
        message.className = 'output-line error-message';
        message.textContent = errorMessage;
        this.container.appendChild(message);
    }
};
