const CodeView = {
    container: null,
    lineNumbersEl: null,
    codeContentEl: null,
    errorLine: null,
    showHint: false,

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.lineNumbersEl = this.container.querySelector('.line-numbers');
        this.codeContentEl = this.container.querySelector('.code-content');
    },

    render(code, language, errorLine = null, showHint = false) {
        if (!this.codeContentEl || !this.lineNumbersEl) return;
        
        this.errorLine = errorLine;
        this.showHint = showHint;

        const highlighted = SyntaxHighlight.highlight(code, language);
        const lines = highlighted.split('\n');
        
        const codeHtml = lines.map((line, index) => {
            const lineNum = index + 1;
            let lineClass = 'code-line';
            
            if (errorLine && lineNum === errorLine) {
                if (showHint) {
                    lineClass += ' hint-highlight';
                } else {
                    lineClass += ' error-line';
                }
            }
            
            return `<span class="${lineClass}" data-line="${lineNum}">${line || ' '}</span>`;
        }).join('\n');

        const lineNumbersHtml = lines.map((_, index) => {
            return `<span class="line-number">${index + 1}</span>`;
        }).join('\n');

        this.codeContentEl.innerHTML = codeHtml;
        this.lineNumbersEl.innerHTML = lineNumbersHtml;
    },

    highlightErrorLine() {
        if (!this.codeContentEl || !this.errorLine) return;
        
        const line = this.codeContentEl.querySelector(`[data-line="${this.errorLine}"]`);
        if (line) {
            line.classList.remove('hint-highlight');
            line.classList.add('error-line');
        }
    },

    showHintLine() {
        if (!this.codeContentEl || !this.errorLine) return;
        
        const line = this.codeContentEl.querySelector(`[data-line="${this.errorLine}"]`);
        if (line) {
            line.classList.remove('error-line');
            line.classList.add('hint-highlight');
        }
    },

    scrollToLine(lineNumber) {
        if (!this.codeContentEl) return;
        
        const line = this.codeContentEl.querySelector(`[data-line="${lineNumber}"]`);
        if (line) {
            line.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
};
