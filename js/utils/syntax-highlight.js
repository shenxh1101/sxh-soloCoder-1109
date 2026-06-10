const SyntaxHighlight = {
    jsKeywords: [
        'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while',
        'do', 'switch', 'case', 'break', 'continue', 'new', 'class', 'extends',
        'super', 'this', 'import', 'export', 'default', 'from', 'typeof',
        'instanceof', 'in', 'of', 'try', 'catch', 'finally', 'throw', 'async',
        'await', 'yield', 'void', 'delete', 'null', 'undefined', 'true', 'false',
        'NaN', 'Infinity'
    ],

    pythonKeywords: [
        'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'break',
        'continue', 'class', 'import', 'from', 'as', 'try', 'except',
        'finally', 'raise', 'with', 'pass', 'lambda', 'yield', 'global',
        'nonlocal', 'in', 'is', 'not', 'and', 'or', 'None', 'True', 'False',
        'print', 'range', 'len', 'str', 'int', 'float', 'list', 'dict', 'set',
        'tuple', 'bool', 'input', 'open', 'type', 'isinstance'
    ],

    highlight(code, language = 'javascript') {
        if (!code) return '';
        
        const escaped = Helpers.escapeHtml(code);
        const tokens = [];
        
        this.findStrings(escaped, tokens, language);
        this.findComments(escaped, tokens, language);
        this.findNumbers(escaped, tokens);
        this.findKeywords(escaped, tokens, language);
        this.findFunctions(escaped, tokens, language);
        
        tokens.sort((a, b) => a.start - b.start);
        
        let result = '';
        let lastIndex = 0;
        
        const usedRanges = [];
        for (const token of tokens) {
            if (this.isOverlapping(token.start, token.end, usedRanges)) {
                continue;
            }
            usedRanges.push({ start: token.start, end: token.end });
            
            result += escaped.substring(lastIndex, token.start);
            result += `<span class="token-${token.type}">${token.text}</span>`;
            lastIndex = token.end;
        }
        
        result += escaped.substring(lastIndex);
        return result;
    },

    isOverlapping(start, end, ranges) {
        for (const range of ranges) {
            if (start < range.end && end > range.start) {
                return true;
            }
        }
        return false;
    },

    findStrings(code, tokens, language) {
        const patterns = [
            /`[^`]*`/g,
            /'(?:[^'\\]|\\.)*'/g,
            /"(?:[^"\\]|\\.)*"/g
        ];
        
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(code)) !== null) {
                tokens.push({
                    type: 'string',
                    text: match[0],
                    start: match.index,
                    end: match.index + match[0].length
                });
            }
        }
    },

    findComments(code, tokens, language) {
        if (language === 'python') {
            const pattern = /#.*$/gm;
            let match;
            while ((match = pattern.exec(code)) !== null) {
                tokens.push({
                    type: 'comment',
                    text: match[0],
                    start: match.index,
                    end: match.index + match[0].length
                });
            }
        } else {
            const linePattern = /\/\/.*$/gm;
            let match;
            while ((match = linePattern.exec(code)) !== null) {
                tokens.push({
                    type: 'comment',
                    text: match[0],
                    start: match.index,
                    end: match.index + match[0].length
                });
            }
            
            const blockPattern = /\/\*[\s\S]*?\*\//g;
            while ((match = blockPattern.exec(code)) !== null) {
                tokens.push({
                    type: 'comment',
                    text: match[0],
                    start: match.index,
                    end: match.index + match[0].length
                });
            }
        }
    },

    findNumbers(code, tokens) {
        const pattern = /\b\d+\.?\d*\b/g;
        let match;
        while ((match = pattern.exec(code)) !== null) {
            tokens.push({
                type: 'number',
                text: match[0],
                start: match.index,
                end: match.index + match[0].length
            });
        }
    },

    findKeywords(code, tokens, language) {
        const keywords = language === 'python' ? this.pythonKeywords : this.jsKeywords;
        const pattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
        let match;
        while ((match = pattern.exec(code)) !== null) {
            tokens.push({
                type: 'keyword',
                text: match[0],
                start: match.index,
                end: match.index + match[0].length
            });
        }
    },

    findFunctions(code, tokens, language) {
        const pattern = /(\w+)\s*\(/g;
        let match;
        while ((match = pattern.exec(code)) !== null) {
            const funcName = match[1];
            const start = match.index;
            const end = match.index + funcName.length;
            
            if (/^\d/.test(funcName)) continue;
            
            const keywords = language === 'python' ? this.pythonKeywords : this.jsKeywords;
            if (keywords.includes(funcName)) continue;
            
            tokens.push({
                type: 'function',
                text: funcName,
                start: start,
                end: end
            });
        }
    },

    highlightLine(code, language, lineNumber, errorLine) {
        const lines = code.split('\n');
        const highlightedLines = lines.map((line, index) => {
            const lineNum = index + 1;
            const highlighted = this.highlight(line, language);
            let lineClass = 'code-line';
            
            if (lineNum === errorLine) {
                lineClass += ' error-line';
            }
            
            return `<span class="${lineClass}" data-line="${lineNum}">${highlighted || ' '}</span>`;
        });
        
        return highlightedLines.join('\n');
    },

    generateLineNumbers(code) {
        const lines = code.split('\n');
        return lines.map((_, index) => {
            return `<span class="line-number">${index + 1}</span>`;
        }).join('\n');
    }
};
