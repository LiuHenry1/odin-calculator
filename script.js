const accumulator = document.getElementById('accumulator');
const historyDisplay = document.getElementById('history');
let shouldProcessNewOperand = false
let isDecimalPresent = false;
let currentOperation = new Operation();

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

    this.compute = function() {
        switch(this.operator) {
            case '+':
                return add(this.operand1, this.operand2);
            case '-':
                return subtract(this.operand1, this.operand2);
            case 'x':
                return multiply(this.operand1, this.operand2);
            case '/':
                return divide(this.operand1, this.operand2);
        }
    }

    this.toString = function() {
        let stringRepr = "";
        if (this.operand1 !== undefined)
            stringRepr += `${this.operand1} `;
        if (this.operator !== undefined) 
            stringRepr += `${this.operator} `;
        if (this.operand2 !== undefined)   
            stringRepr += `${this.operand2}`;

        return stringRepr;
    }
}

function setUpAllEventListeners() {
    setUpClearEventListeners();
    setUpDigitEventListeners();
    setUpEqualEventListener();
    setUpOperatorEventListeners();
}

function setUpClearEventListeners() {
    const allclearButton = document.getElementById('AC');
    allclearButton.addEventListener('click', reset);

    const clearButton = document.getElementById('C');
    clearButton.addEventListener('click', deleteDigit);

}

function setUpDigitEventListeners() {
    const digits = document.getElementsByClassName('digit');
    Array.from(digits).forEach(digit => digit.addEventListener('click', () => 
        appendDigit(digit.value)));
}

function setUpOperatorEventListeners() {
    const operators = document.getElementsByClassName('operator');
    Array.from(operators).forEach(operator => operator.addEventListener('click', () => {
        processInputs(operator.value);
        shouldProcessNewOperand = true;
        isDecimalPresent = false;
        updateHistory();
    }))
}

function setUpEqualEventListener() {
    const equal = document.getElementById('equal');
    equal.addEventListener('click', () => {
        evaluateOperation();
    });
}

function reset() {
    isDecimalPresent = false;
    currentOperation = new Operation();
    resetAccumulator();
    resetHistory();
}

function appendDigit(digit) {
    if (accumulator.textContent === '0' || shouldProcessNewOperand) {
        resetAccumulator();
    } 

    if (digit === '.') {
        if (isDecimalPresent) 
            return;

        if (accumulator.textContent === '') 
            accumulator.textContent = '0';

        isDecimalPresent = true;
    }
    accumulator.textContent += digit;
}

function deleteDigit() {
    accumulator.textContent = accumulator.textContent.slice(0, -1);
}

function processInputs(operator) {
    if (currentOperation.operator !== undefined) {
        evaluateOperation();
    } 
    processOperand();
    processOperator(operator);
}

function processOperand() {
    const operand = Number(accumulator.textContent);
    currentOperation.storeOperand(operand);
}

function processOperator(operator) {
    currentOperation.storeOperator(operator);
}

function resetAccumulator() {
    accumulator.textContent = '';
    shouldProcessNewOperand = false;
}

function updateHistory() {
    historyDisplay.textContent = currentOperation.toString();
}

function resetHistory() {
    historyDisplay.textContent = '';
}

function displayResult(result) {
    accumulator.textContent = result;
}

function evaluateOperation() {
    processOperand();
    updateHistory();

    let result;
    if (currentOperation.operand1 === undefined) {
        return;
    } else if (currentOperation.operand2 === undefined || currentOperation.operator === undefined) {
        result = currentOperation.operand1;
    } else {
        result = currentOperation.compute();
    }

    displayResult(result);
    currentOperation = new Operation();
}

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

setUpAllEventListeners();