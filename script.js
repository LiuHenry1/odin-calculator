function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// TODO: write logic to accumulate operand when a number is pressed
function setUpDigitEventListeners() {
    const digits = document.getElementsByClassName('digit');
    Array.from(digits).forEach(digit => digit.addEventListener('click', () => 
        appendDigit(digit.value)));
}

function appendDigit(digit) {
    const accumulator = document.getElementById('accumulator');
    
    if (accumulator.textContent === '0') 
        accumulator.textContent = digit;
    else 
        accumulator.textContent += digit;
}

setUpDigitEventListeners();

// TODO: write logic to implement 'AC' and 'C'
function setUpClearEventListeners() {
    const allclearButton = document.getElementById('AC');
    allclearButton.addEventListener('click', reset);

    const clearButton = document.getElementById('C');
    clearButton.addEventListener('click', deleteDigit);

}

function reset() {
    
}

function deleteDigit() {
    const accumulator = document.getElementById('accumulator');
    accumulator.textContent = accumulator.textContent.slice(0, -1);
}

setUpClearEventListeners();

// TODO: write object to store operand and operator
function Operation() {
    this.operand1 = undefined;
    this.operand2 = undefined;
    this.operator = undefined;

    this.storeOperand = function(operand) {
        if (this.operand1 === undefined) 
            this.operand1 = operand;
        else 
            this.operand2 = operand;
    }

    this.storeOperator = function(operator) {
        this.operator = operator;
    }
}

// TODO: write logic to store operand when an operator is pressed
let currentOperation = new Operation();
function setUpOperatorEventListeners() {
    const operators = document.getElementsByClassName('operator');
    Array.from(operators).forEach(operator => operator.addEventListener('click', () => {
        processInputs(operator.value);
    }))
}

function processInputs(operator) {
    processOperand();
    processOperator(operator);
}

function processOperand() {
    const accumulator = document.getElementById('accumulator');
    const operand = Number(accumulator.textContent);
    currentOperation.storeOperand(operand);
}

function processOperator(operator) {
    currentOperation.storeOperator(operator);
}