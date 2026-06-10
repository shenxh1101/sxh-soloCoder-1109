const CustomLevel = {
    form: null,

    init() {
        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('custom-level-btn').addEventListener('click', () => {
            this.show();
        });

        document.getElementById('custom-back-btn').addEventListener('click', () => {
            this.hide();
        });

        document.getElementById('test-custom-btn').addEventListener('click', () => {
            this.testLevel();
        });

        document.getElementById('save-custom-btn').addEventListener('click', () => {
            this.saveLevel();
        });

        document.getElementById('preview-run-btn').addEventListener('click', () => {
            this.runPreview();
        });
    },

    show() {
        Game.showScreen('custom-screen');
        this.resetForm();
    },

    hide() {
        Game.showScreen('start-screen');
    },

    resetForm() {
        document.getElementById('custom-language').value = 'javascript';
        document.getElementById('custom-title').value = '';
        document.getElementById('custom-buggy-code').value = '';
        document.getElementById('custom-correct-code').value = '';
        document.getElementById('custom-error-line').value = 1;
        document.getElementById('custom-hint').value = '';
        document.getElementById('custom-kp-title').value = '';
        document.getElementById('custom-kp-desc').value = '';

        const optionInputs = document.querySelectorAll('.option-input');
        optionInputs.forEach(input => input.value = '');

        const firstRadio = document.querySelector('input[name="correct-option"][value="0"]');
        if (firstRadio) firstRadio.checked = true;

        document.getElementById('custom-preview-section').style.display = 'none';
    },

    getFormData() {
        const language = document.getElementById('custom-language').value;
        const title = document.getElementById('custom-title').value;
        const buggyCode = document.getElementById('custom-buggy-code').value;
        const correctCode = document.getElementById('custom-correct-code').value;
        const errorLine = parseInt(document.getElementById('custom-error-line').value) || 1;
        const hint = document.getElementById('custom-hint').value;
        const kpTitle = document.getElementById('custom-kp-title').value;
        const kpDesc = document.getElementById('custom-kp-desc').value;

        const optionInputs = document.querySelectorAll('.option-input');
        const options = Array.from(optionInputs).map((input, index) => ({
            id: String.fromCharCode(97 + index),
            label: input.value || `选项 ${String.fromCharCode(65 + index)}`,
            explanation: '这是一个自定义选项。'
        }));

        const correctRadio = document.querySelector('input[name="correct-option"]:checked');
        const correctOptionIndex = correctRadio ? parseInt(correctRadio.value) : 0;

        return {
            language,
            title,
            buggyCode,
            correctCode,
            errorLine,
            hint,
            options,
            correctOptionIndex,
            knowledgePoint: {
                title: kpTitle || '自定义知识点',
                description: kpDesc || '这是一个自定义关卡的知识点。',
                example: correctCode,
                tip: '仔细观察代码，找出错误所在。'
            }
        };
    },

    validate(data) {
        const errors = [];

        if (!data.title.trim()) {
            errors.push('请填写关卡标题');
        }
        if (!data.buggyCode.trim()) {
            errors.push('请填写错误代码');
        }
        if (!data.correctCode.trim()) {
            errors.push('请填写正确代码');
        }
        if (data.options.some(o => !o.label.trim())) {
            errors.push('请填写所有选项');
        }
        if (data.errorLine < 1) {
            errors.push('错误行号必须大于0');
        }

        return errors;
    },

    testLevel() {
        const data = this.getFormData();
        const errors = this.validate(data);

        if (errors.length > 0) {
            alert('验证失败：\n' + errors.join('\n'));
            return;
        }

        const previewSection = document.getElementById('custom-preview-section');
        if (previewSection) {
            previewSection.style.display = 'flex';
            previewSection.style.flexDirection = 'column';
        }

        const previewCodeContent = document.getElementById('preview-code-content');
        const previewLineNumbers = document.getElementById('preview-line-numbers');
        
        if (previewCodeContent && previewLineNumbers) {
            const highlighted = SyntaxHighlight.highlight(data.buggyCode, data.language);
            const lines = highlighted.split('\n');
            
            previewCodeContent.innerHTML = lines.map((line, i) => 
                `<span class="code-line ${i + 1 === data.errorLine ? 'error-line' : ''}" data-line="${i + 1}">${line || ' '}</span>`
            ).join('\n');
            
            previewLineNumbers.innerHTML = lines.map((_, i) => 
                `<span class="line-number">${i + 1}</span>`
            ).join('\n');
        }
    },

    async runPreview() {
        const data = this.getFormData();
        
        const outputEl = document.getElementById('preview-sandbox-output');
        if (!outputEl) return;

        outputEl.innerHTML = '<div class="output-line stdout">运行中...</div>';

        let result;
        if (data.language === 'python') {
            result = await PythonSandbox.run(data.correctCode, 3000);
        } else {
            result = await JsSandbox.run(data.correctCode, 3000);
        }

        outputEl.innerHTML = '';
        if (result.output && result.output.length > 0) {
            result.output.forEach(item => {
                const line = document.createElement('div');
                line.className = 'output-line ' + item.type;
                line.textContent = item.message;
                outputEl.appendChild(line);
            });
        } else {
            outputEl.innerHTML = '<div class="output-line result">（无输出）</div>';
        }
    },

    saveLevel() {
        const data = this.getFormData();
        const errors = this.validate(data);

        if (errors.length > 0) {
            alert('保存失败：\n' + errors.join('\n'));
            return;
        }

        const level = {
            id: 'custom-' + Helpers.generateId(),
            title: data.title,
            language: data.language,
            difficulty: 3,
            category: '自定义',
            buggyCode: data.buggyCode,
            correctCode: data.correctCode,
            errorLine: data.errorLine,
            hint: data.hint || '仔细检查代码，找出语法错误。',
            options: data.options,
            correctOptionIndex: data.correctOptionIndex,
            knowledgePoint: data.knowledgePoint,
            isCustom: true
        };

        Storage.saveCustomLevel(level);
        Game.loadCustomLevels();
        Game.updateStartScreen();

        if (confirm('关卡保存成功！是否立即开始挑战这个关卡？')) {
            Game.startGameWithCustomLevel(level.id);
        } else {
            this.hide();
        }
    },

    playCustomLevel(levelId) {
        Game.startGameWithCustomLevel(levelId);
    }
};
