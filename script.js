class Calculator {
    constructor(resultEl, historyEl) {
        this.resultEl = resultEl;
        this.historyEl = historyEl;
        this.currentInput = '';
        this.lastResult = '';
        this.justEvaluated = false;
    }

    updateDisplay() {
        this.resultEl.textContent = this.currentInput || '0';
        this.historyEl.textContent = this.lastResult;

        if (this.currentInput.length > 10) {
            this.resultEl.style.fontSize = '2.5rem';
        } else {
            this.resultEl.style.fontSize = '5rem';
        }
    }

    clear() {
        this.currentInput = '';
        this.lastResult = '';
        this.updateDisplay();
    }

    deleteLast() {
        if (!this.currentInput) return;
        
        const scientificFuncs = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√('];
        let foundFunc = false;
        
        for (let func of scientificFuncs) {
            if (this.currentInput.endsWith(func)) {
                this.currentInput = this.currentInput.slice(0, -func.length);
                foundFunc = true;
                break;
            }
        }
        
        if (!foundFunc) {
            this.currentInput = this.currentInput.slice(0, -1);
        }
        this.updateDisplay();
    }

    handleInput(val) {
        const operators = ['+', '−', '×', '÷', '^'];
        const isOperator = operators.includes(val);
        const lastChar = this.currentInput.slice(-1);
        const isLastCharOperator = operators.includes(lastChar);

        if (this.currentInput === '' && isOperator && val !== '−') return;

        if (isOperator && isLastCharOperator) {
            this.currentInput = this.currentInput.slice(0, -1) + val;
        } else {
            if (this.justEvaluated) {
                if (isOperator) {
                    this.currentInput += val; 
                } else {
                    this.currentInput = val; 
                }
            } else {
                this.currentInput += val;
            }
        }
        
        this.justEvaluated = false;
        this.updateDisplay();
    }

    compute() {
        if (!this.currentInput) return;

        try {
            let expression = this.currentInput;

            expression = expression.replace(/(\d+(?:\.\d+)?)(\+|−)(\d+(?:\.\d+)?)%/g, '$1$2($1*$3/100)');
            expression = expression
                .replace(/÷/g, '/')
                .replace(/×/g, '*')
                .replace(/−/g, '-')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/\^/g, '**')
                .replace(/√\(/g, 'Math.sqrt(')
                .replace(/%/g, '/100')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(');

            expression = expression.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, val) => {
                return `Math.${func}((${val}) * Math.PI / 180)`;
            });

            const openParens = (expression.match(/\(/g) || []).length;
            const closeParens = (expression.match(/\)/g) || []).length;
            for (let i = 0; i < openParens - closeParens; i++) {
                expression += ')';
            }

            const rawResult = eval(expression);

            const formattedResult = Number.isInteger(rawResult) 
                ? rawResult.toString() 
                : parseFloat(rawResult.toFixed(10)).toString();

            this.lastResult = this.currentInput + ' =';
            this.currentInput = formattedResult;
            this.justEvaluated = true;

        } catch (error) {
            const prevInput = this.currentInput;
            this.currentInput = 'Erro';
            this.updateDisplay();
            setTimeout(() => { 
                this.currentInput = prevInput; 
                this.updateDisplay(); 
            }, 1500);
            return;
        }
        this.updateDisplay();
    }
}

const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');
const sciSwitch = document.getElementById('scientific-switch');
const pad = document.querySelector('.pad');

const calc = new Calculator(resultEl, historyEl);

sciSwitch.addEventListener('change', () => {
    document.body.classList.toggle('scientific-mode', sciSwitch.checked);
});

function triggerVisualFeedback(type, value) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (btn.dataset[type] === value) {
            btn.classList.add('active-visual');
            setTimeout(() => btn.classList.remove('active-visual'), 150);
        }
    });
}

pad.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    const oldRipple = btn.querySelector('.ripple');
    if (oldRipple) oldRipple.remove();
    btn.appendChild(circle);

    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === 'clear') calc.clear();
    else if (action === 'backspace') calc.deleteLast();
    else if (action === 'equals') calc.compute();
    else if (val) calc.handleInput(val);
});

window.addEventListener('keydown', (e) => {
    const key = e.key;
    const keyMap = { '+': '+', '-': '−', '*': '×', '/': '÷', '^': '^' };

    if (key === 'Enter' || key === '=' || key === 'Backspace' || key === 'Escape') {
        e.preventDefault(); 
    }

    if (/\d/.test(key) || key === '(' || key === ')' || key === '.' || key === '%') {
        calc.handleInput(key);
        triggerVisualFeedback('value', key);
    } 
    else if (keyMap[key]) {
        calc.handleInput(keyMap[key]);
        triggerVisualFeedback('value', keyMap[key]);
    } 
    else if (key === 'Enter' || key === '=') {
        calc.compute();
        triggerVisualFeedback('action', 'equals');
    } 
    else if (key === 'Backspace') {
        calc.deleteLast();
        triggerVisualFeedback('action', 'backspace');
    } 
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        calc.clear();
        triggerVisualFeedback('action', 'clear');
    }
});

calc.updateDisplay();