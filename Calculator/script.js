const buttons = document.querySelectorAll('.btn');
const display = document.getElementById('display');

let currentInput = '';
let operator = null;
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleInput(value);
    });
});

function handleInput(value) {
    if (value === 'C') {
        clearDisplay();
    } else if (value === '=') {
        calculateResult();
    } else if (['+', '-', '*', '/'].includes(value)) {
        setOperator(value);
    } else {
        updateDisplay(value);
    }
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousInput = '';
    display.textContent = '0';
}

function updateDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.textContent = currentInput;
}

function setOperator(value) {
    if (currentInput === '') return;
    if (operator !== null) calculateResult();
    operator = value;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (operator === null && currentInput === '' &&  previousInput === '') return;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    }

    display.textContent = result;
    currentInput = result.toString();
    operator = null;
    previousInput = '';
}