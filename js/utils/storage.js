const Storage = {
    PREFIX: 'syntax_puzzle_',

    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.PREFIX + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(this.PREFIX + key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    getHighScore(language = 'javascript') {
        const scores = this.get('high_scores', {});
        return scores[language] || 0;
    },

    setHighScore(language, score) {
        const scores = this.get('high_scores', {});
        if (score > (scores[language] || 0)) {
            scores[language] = score;
            this.set('high_scores', scores);
            return true;
        }
        return false;
    },

    getCustomLevels() {
        return this.get('custom_levels', []);
    },

    saveCustomLevel(level) {
        const levels = this.getCustomLevels();
        if (level.id) {
            const index = levels.findIndex(l => l.id === level.id);
            if (index >= 0) {
                levels[index] = level;
            } else {
                levels.push(level);
            }
        } else {
            level.id = Helpers.generateId();
            levels.push(level);
        }
        this.set('custom_levels', levels);
        return level;
    },

    deleteCustomLevel(levelId) {
        const levels = this.getCustomLevels();
        const filtered = levels.filter(l => l.id !== levelId);
        this.set('custom_levels', filtered);
    },

    getTheme() {
        return this.get('theme', 'dark');
    },

    setTheme(theme) {
        this.set('theme', theme);
    },

    getPreferredLanguage() {
        return this.get('language', 'javascript');
    },

    setPreferredLanguage(language) {
        this.set('language', language);
    }
};
