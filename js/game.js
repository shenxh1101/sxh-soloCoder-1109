const Game = {
    state: {
        currentLanguage: 'javascript',
        currentLevelIndex: 0,
        score: 0,
        lives: 3,
        selectedOptionIndex: null,
        isCorrect: null,
        hasRun: false,
        showHint: false,
        isGameOver: false,
        isWin: false,
        correctCount: 0
    },

    levels: [],
    customLevels: [],

    init() {
        this.loadCustomLevels();
        this.initComponents();
        this.bindEvents();
        this.updateStartScreen();
    },

    loadCustomLevels() {
        this.customLevels = Storage.getCustomLevels();
    },

    initComponents() {
        CodeView.init('code-editor');
        OptionsPanel.init('options-list');
        SandboxOutput.init('sandbox-output', 'sandbox-status');
        LearningCard.init('learning-card');
    },

    bindEvents() {
        OptionsPanel.onSelect = (index) => {
            this.state.selectedOptionIndex = index;
            this.updateRunButton();
        };

        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('run-btn').addEventListener('click', () => {
            this.runCode();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.showScreen('start-screen');
        });

        document.getElementById('language-select').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    startGame(language = 'javascript') {
        this.state = {
            currentLanguage: language,
            currentLevelIndex: 0,
            score: 0,
            lives: 3,
            selectedOptionIndex: null,
            isCorrect: null,
            hasRun: false,
            showHint: false,
            isGameOver: false,
            isWin: false,
            correctCount: 0
        };

        this.loadLevels(language);
        this.updateUI();
        this.loadLevel();
        this.showScreen('game-screen');
    },

    loadLevels(language) {
        const builtinLevels = language === 'python' ? PythonLevels : JavaScriptLevels;
        const customLevelsForLang = this.customLevels.filter(l => l.language === language);
        this.levels = [...builtinLevels, ...customLevelsForLang];
    },

    loadLevel() {
        const level = this.getCurrentLevel();
        if (!level) return;

        this.state.selectedOptionIndex = null;
        this.state.isCorrect = null;
        this.state.hasRun = false;
        this.state.showHint = false;

        CodeView.render(level.buggyCode, level.language, level.errorLine, false);
        OptionsPanel.render(level.options, level.correctOptionIndex);
        LearningCard.render(level.knowledgePoint);
        SandboxOutput.clear();

        this.updateLevelUI();
        this.updateRunButton();
        this.hideFeedback();

        const hintContainer = document.getElementById('hint-container');
        if (hintContainer) {
            hintContainer.style.display = 'none';
        }

        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.disabled = false;
            hintBtn.textContent = '💡 提示';
        }
    },

    getCurrentLevel() {
        return this.levels[this.state.currentLevelIndex];
    },

    showHint() {
        const level = this.getCurrentLevel();
        if (!level || this.state.showHint) return;

        this.state.showHint = true;
        
        CodeView.render(level.buggyCode, level.language, level.errorLine, true);
        
        const hintContainer = document.getElementById('hint-container');
        const hintText = document.getElementById('hint-text');
        if (hintContainer && hintText) {
            hintText.textContent = level.hint;
            hintContainer.style.display = 'flex';
        }

        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.disabled = true;
            hintBtn.textContent = '💡 已提示';
        }

        if (this.state.score >= 20) {
            this.state.score -= 10;
            this.updateScoreDisplay();
        }
    },

    async runCode() {
        if (this.state.selectedOptionIndex === null) return;
        if (this.state.hasRun) return;

        const level = this.getCurrentLevel();
        const isCorrect = this.state.selectedOptionIndex === level.correctOptionIndex;
        
        this.state.isCorrect = isCorrect;
        this.state.hasRun = true;

        OptionsPanel.revealAnswer();

        if (isCorrect) {
            this.state.correctCount++;
            this.state.score += 100;
            this.showFeedback(true, level.options[level.correctOptionIndex].explanation);
        } else {
            this.state.lives--;
            this.showFeedback(false, level.options[this.state.selectedOptionIndex].explanation);
        }

        this.updateUI();

        SandboxOutput.showRunning();
        await Helpers.delay(500);

        const codeToRun = isCorrect ? level.correctCode : level.buggyCode;
        
        let result;
        if (level.language === 'python') {
            result = await PythonSandbox.run(codeToRun);
        } else {
            result = await JsSandbox.run(codeToRun);
        }

        await SandboxOutput.showOutput(result);
        this.updateNextButton();

        if (this.state.lives <= 0) {
            setTimeout(() => {
                this.gameOver();
            }, 2000);
        }
    },

    nextLevel() {
        if (this.state.currentLevelIndex >= this.levels.length - 1) {
            this.win();
            return;
        }

        this.state.currentLevelIndex++;
        this.loadLevel();
    },

    gameOver() {
        this.state.isGameOver = true;
        
        Storage.setHighScore(this.state.currentLanguage, this.state.score);

        document.getElementById('final-score').textContent = this.state.score;
        document.getElementById('final-correct').textContent = this.state.correctCount;
        document.getElementById('final-level').textContent = this.state.currentLevelIndex + 1;

        this.showScreen('gameover-screen');
    },

    win() {
        this.state.isWin = true;
        
        Storage.setHighScore(this.state.currentLanguage, this.state.score);

        document.getElementById('win-score').textContent = this.state.score;
        document.getElementById('win-correct').textContent = this.state.correctCount;
        document.getElementById('win-lives').textContent = this.state.lives;

        this.showScreen('win-screen');
    },

    showFeedback(isCorrect, message) {
        const section = document.getElementById('feedback-section');
        const content = document.getElementById('feedback-content');
        if (!section || !content) return;

        content.className = 'feedback-content ' + (isCorrect ? 'success' : 'error');
        content.innerHTML = `
            <strong>${isCorrect ? '✓ 回答正确！' : '✗ 回答错误'}</strong><br>
            ${message}
        `;
        section.style.display = 'block';
    },

    hideFeedback() {
        const section = document.getElementById('feedback-section');
        if (section) {
            section.style.display = 'none';
        }
    },

    updateUI() {
        this.updateScoreDisplay();
        this.updateLivesDisplay();
        this.updateProgress();
        this.updateHeader();
    },

    updateScoreDisplay() {
        const scoreEl = document.getElementById('score-value');
        if (scoreEl) {
            scoreEl.textContent = this.state.score;
            scoreEl.classList.add('bounce');
            setTimeout(() => scoreEl.classList.remove('bounce'), 500);
        }
    },

    updateLivesDisplay() {
        const livesContainer = document.getElementById('lives-display');
        if (!livesContainer) return;

        const hearts = livesContainer.querySelectorAll('.life-heart');
        hearts.forEach((heart, index) => {
            if (index >= this.state.lives) {
                heart.classList.add('lost');
            } else {
                heart.classList.remove('lost');
            }
        });
    },

    updateProgress() {
        const total = this.levels.length;
        const current = this.state.currentLevelIndex + 1;
        const percent = (current / total) * 100;

        const progressFill = document.getElementById('progress-fill');
        const progressCurrent = document.getElementById('progress-current');
        const progressTotal = document.getElementById('progress-total');

        if (progressFill) progressFill.style.width = percent + '%';
        if (progressCurrent) progressCurrent.textContent = current;
        if (progressTotal) progressTotal.textContent = total;
    },

    updateHeader() {
        const level = this.getCurrentLevel();
        if (!level) return;

        const currentLevelEl = document.getElementById('current-level');
        const levelTitleEl = document.getElementById('level-title');
        const difficultyBadge = document.getElementById('difficulty-badge');

        if (currentLevelEl) currentLevelEl.textContent = this.state.currentLevelIndex + 1;
        if (levelTitleEl) levelTitleEl.textContent = level.title;
        if (difficultyBadge) {
            difficultyBadge.textContent = Helpers.getDifficultyLabel(level.difficulty);
            difficultyBadge.setAttribute('data-level', level.difficulty);
        }

        const langSelect = document.getElementById('language-select');
        if (langSelect) {
            langSelect.value = this.state.currentLanguage;
        }
    },

    updateLevelUI() {
        this.updateProgress();
        this.updateHeader();
    },

    updateRunButton() {
        const runBtn = document.getElementById('run-btn');
        if (!runBtn) return;
        
        runBtn.disabled = this.state.selectedOptionIndex === null || this.state.hasRun;
    },

    updateNextButton() {
        const nextBtn = document.getElementById('next-btn');
        const runBtn = document.getElementById('run-btn');
        
        if (!nextBtn || !runBtn) return;

        if (this.state.hasRun && this.state.isCorrect) {
            nextBtn.style.display = 'flex';
            runBtn.style.display = 'none';
        } else if (this.state.hasRun && !this.state.isCorrect) {
            if (this.state.lives > 0) {
                nextBtn.style.display = 'flex';
                nextBtn.textContent = '⏭️ 跳过';
                runBtn.style.display = 'none';
            }
        }
    },

    changeLanguage(language) {
        this.state.currentLanguage = language;
        Storage.setPreferredLanguage(language);
        
        if (this.levels.length > 0 && this.state.currentLevelIndex >= 0) {
            this.loadLevels(language);
            this.state.currentLevelIndex = 0;
            this.loadLevel();
        }
        
        this.updateStartScreen();
    },

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        this.setTheme(newTheme);
    },

    setTheme(theme) {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        
        body.setAttribute('data-theme', theme);
        
        const darkCss = document.querySelector('link[href="css/themes/dark.css"]');
        const lightCss = document.querySelector('link[href="css/themes/light.css"]');
        
        if (theme === 'dark') {
            if (lightCss) lightCss.remove();
            if (!darkCss) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'css/themes/dark.css';
                document.head.insertBefore(link, document.querySelector('link[href="css/style.css"]'));
            }
        } else {
            if (darkCss) darkCss.remove();
            if (!lightCss) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'css/themes/light.css';
                document.head.insertBefore(link, document.querySelector('link[href="css/style.css"]'));
            }
        }

        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
        }

        Storage.setTheme(theme);
    },

    showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    },

    updateStartScreen() {
        const highScore = Storage.getHighScore(this.state.currentLanguage);
        const levels = this.state.currentLanguage === 'python' ? PythonLevels : JavaScriptLevels;
        
        const highScoreDisplay = document.getElementById('high-score-display');
        const totalLevelsDisplay = document.getElementById('total-levels-display');
        
        if (highScoreDisplay) highScoreDisplay.textContent = highScore;
        if (totalLevelsDisplay) totalLevelsDisplay.textContent = levels.length + this.customLevels.filter(l => l.language === this.state.currentLanguage).length;
    },

    restart() {
        this.startGame(this.state.currentLanguage);
    }
};
