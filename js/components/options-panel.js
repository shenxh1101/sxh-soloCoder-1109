const OptionsPanel = {
    container: null,
    options: [],
    selectedIndex: null,
    isAnswered: false,
    correctIndex: 0,
    onSelect: null,

    init(containerId) {
        this.container = document.getElementById(containerId);
    },

    render(options, correctIndex, selectedIndex = null, isAnswered = false) {
        if (!this.container) return;
        
        this.options = options;
        this.correctIndex = correctIndex;
        this.selectedIndex = selectedIndex;
        this.isAnswered = isAnswered;

        let html = '';
        options.forEach((option, index) => {
            const letter = Helpers.getLetterFromIndex(index);
            let cardClass = 'option-card';
            
            if (selectedIndex === index) {
                cardClass += ' selected';
            }
            
            if (isAnswered) {
                if (index === correctIndex) {
                    cardClass += ' correct';
                } else if (selectedIndex === index) {
                    cardClass += ' incorrect';
                }
                cardClass += ' show-explanation';
            }

            const statusIcon = isAnswered 
                ? (index === correctIndex ? '✓' : (selectedIndex === index ? '✗' : ''))
                : '';

            html += `
                <div class="${cardClass}" data-index="${index}">
                    <span class="option-label">${letter}</span>
                    <div class="option-content">
                        ${option.label}
                        <div class="option-explanation">
                            ${option.explanation}
                        </div>
                    </div>
                    <span class="option-status-icon">${statusIcon}</span>
                </div>
            `;
        });

        this.container.innerHTML = html;
        this.bindEvents();
    },

    bindEvents() {
        if (!this.container) return;
        
        const cards = this.container.querySelectorAll('.option-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (this.isAnswered) return;
                
                const index = parseInt(card.dataset.index);
                this.selectOption(index);
            });
        });
    },

    selectOption(index) {
        if (this.isAnswered) return;
        
        this.selectedIndex = index;
        
        const cards = this.container.querySelectorAll('.option-card');
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });

        if (this.onSelect) {
            this.onSelect(index);
        }
    },

    revealAnswer() {
        if (this.selectedIndex === null) return;
        
        this.isAnswered = true;
        
        const cards = this.container.querySelectorAll('.option-card');
        cards.forEach((card, index) => {
            if (index === this.correctIndex) {
                card.classList.add('correct');
            } else if (index === this.selectedIndex) {
                card.classList.add('incorrect');
            }
            card.classList.add('show-explanation');
            
            const statusIcon = card.querySelector('.option-status-icon');
            if (statusIcon) {
                statusIcon.textContent = index === this.correctIndex ? '✓' : (index === this.selectedIndex ? '✗' : '');
            }
        });
    },

    reset() {
        this.selectedIndex = null;
        this.isAnswered = false;
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
};
