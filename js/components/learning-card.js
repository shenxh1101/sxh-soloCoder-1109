const LearningCard = {
    card: null,
    isFlipped: false,

    init(cardId) {
        this.card = document.getElementById(cardId);
        if (!this.card) return;
        
        this.card.addEventListener('click', () => {
            this.toggle();
        });
    },

    render(knowledgePoint) {
        if (!this.card) return;
        
        const titleEl = this.card.querySelector('#knowledge-title');
        const descEl = this.card.querySelector('#knowledge-desc');
        const exampleEl = this.card.querySelector('#knowledge-example');
        const tipEl = this.card.querySelector('#knowledge-tip');
        
        if (titleEl) titleEl.textContent = knowledgePoint.title;
        if (descEl) descEl.textContent = knowledgePoint.description;
        if (exampleEl) exampleEl.textContent = knowledgePoint.example;
        
        if (tipEl) {
            if (knowledgePoint.tip) {
                tipEl.textContent = '💡 ' + knowledgePoint.tip;
                tipEl.style.display = 'block';
            } else {
                tipEl.style.display = 'none';
            }
        }
        
        this.reset();
    },

    toggle() {
        if (!this.card) return;
        
        this.isFlipped = !this.isFlipped;
        
        if (this.isFlipped) {
            this.card.classList.add('flipped');
        } else {
            this.card.classList.remove('flipped');
        }
    },

    reset() {
        this.isFlipped = false;
        if (this.card) {
            this.card.classList.remove('flipped');
        }
    },

    flipToFront() {
        this.isFlipped = false;
        if (this.card) {
            this.card.classList.remove('flipped');
        }
    },

    flipToBack() {
        this.isFlipped = true;
        if (this.card) {
            this.card.classList.add('flipped');
        }
    }
};
