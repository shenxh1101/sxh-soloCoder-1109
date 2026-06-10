const Helpers = {
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatNumber(num) {
        return num.toLocaleString();
    },

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    getLetterFromIndex(index) {
        return String.fromCharCode(65 + index);
    },

    getDifficultyLabel(level) {
        const labels = {
            1: '入门',
            2: '简单',
            3: '中等',
            4: '困难',
            5: '专家'
        };
        return labels[level] || '未知';
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    copyToClipboard(text) {
        return navigator.clipboard.writeText(text);
    },

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};
