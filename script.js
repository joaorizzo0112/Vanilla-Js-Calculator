const historyEl = document.getElementById('history');
const resultEl = document.getElementById('result');
const pad = document.querySelector('.pad');
const copyBtn = document.getElementById('copyBtn');
const backspaceBtn = document.getElementById('backspaceBtn');
const themeSwitch = document.getElementById('theme-switch');

let current = '';
let lastExpr = '';
let justEvaluated = false;

function render() {
  historyEl.textContent = lastExpr;
  resultEl.textContent = current || '0';
}

function clearAll() { current = ''; lastExpr = ''; render(); }
function backspace() { current = current.slice(0, -1); render(); }
function toggleSign() {
  if (!current) return;
  current = current.startsWith('−') ? current.slice(1) : '−' + current;
  render();
}
function appendValue(val) {
  if (justEvaluated && /[0-9.]/.test(val)) {
    current = val; justEvaluated = false;
  } else {
    if (/[\u00D7\u00F7\u2212+%]$/.test(current) && /[\u00D7\u00F7\u2212+%]/.test(val)) {
      current = current.slice(0, -1);
    }
    current += val;
  }
  render();
}
function calculate() {
  try {
    let expr = current.replace(/÷/g,'/').replace(/×/g,'*').replace(/\u2212/g,'-').replace(/%/g,'/100');
    if (/[+\-*/]$/.test(expr)) expr = expr.slice(0,-1);
    let res = eval(expr);
    lastExpr = current;
    current = res.toString().startsWith('-') ? '−' + res.toString().slice(1) : res.toString();
    justEvaluated = true;
    render();
  } catch {
    current = 'Erro'; render();
  }
}

pad.addEventListener('click', (e) => {
  const btn = e.target.closest('button.btn');
  if (!btn) return;
  if (btn.dataset.action === 'clear') return clearAll();
  if (btn.dataset.action === 'toggleSign') return toggleSign();
  if (btn.dataset.action === 'equals') return calculate();
  if (btn.dataset.value) return appendValue(btn.dataset.value);
});
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(resultEl.textContent.replace('−','-'));
});
backspaceBtn.addEventListener('click', backspace);
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeSwitch.checked);
});
window.addEventListener('keydown', (e) => {
  if (/\d/.test(e.key)) appendValue(e.key);
  else if (['+','-','*','/','%'].includes(e.key)) {
    appendValue(e.key==='-'?'−':e.key==='*'?'×':e.key==='/'?'÷':e.key);
  } else if (e.key==='Enter') calculate();
  else if (e.key==='Backspace') backspace();
});
render();
