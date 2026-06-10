document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = Storage.getTheme();
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/themes/light.css';
        const darkLink = document.querySelector('link[href="css/themes/dark.css"]');
        if (darkLink) {
            darkLink.remove();
        }
        document.head.insertBefore(link, document.querySelector('link[href="css/style.css"]'));
        setTimeout(() => {
            const toggle = document.getElementById('theme-toggle');
            if (toggle) toggle.textContent = '☀️';
        }, 100);
    }

    const savedLang = Storage.getPreferredLanguage();
    Game.state.currentLanguage = savedLang;

    Game.init();
    CustomLevel.init();

    if (savedTheme === 'light') {
        Game.setTheme('light');
    }

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            Game.state.currentLanguage = lang;
            Game.updateStartScreen();
        });
    });

    const initialLangBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
    if (initialLangBtn) {
        langBtns.forEach(b => b.classList.remove('active'));
        initialLangBtn.classList.add('active');
    }

    document.getElementById('start-game-btn').addEventListener('click', () => {
        const activeLangBtn = document.querySelector('.lang-btn.active');
        const lang = activeLangBtn ? activeLangBtn.dataset.lang : 'javascript';
        Game.startGame(lang);
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        Game.restart();
    });

    document.getElementById('menu-btn').addEventListener('click', () => {
        Game.showScreen('start-screen');
        Game.updateStartScreen();
    });

    document.getElementById('win-restart-btn').addEventListener('click', () => {
        Game.restart();
    });

    document.getElementById('win-menu-btn').addEventListener('click', () => {
        Game.showScreen('start-screen');
        Game.updateStartScreen();
    });

    if (typeof PythonSandbox !== 'undefined') {
        PythonSandbox.ensureLoaded().catch(err => {
            console.warn('Skulpt 预加载失败:', err);
        });
    }
});
