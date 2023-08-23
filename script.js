const accumulator = document.getElementById('accumulator');
const historyDisplay = document.getElementById('history');
let shouldProcessNewOperand = false;


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
    if (shouldProcessNewOperand) {
        resetAccumulator();
    }
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

// TODO: write logic to store operand when an operator is pressed
let currentOperation = new Operation();
function setUpOperatorEventListeners() {
    const operators = document.getElementsByClassName('operator');
    Array.from(operators).forEach(operator => operator.addEventListener('click', () => {
        processInputs(operator.value);
        shouldProcessNewOperand = true;
        updateDisplay();
    }))
}

function processInputs(operator) {
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

function updateDisplay() {
    updateHistoryDisplay();
}   

function resetAccumulator() {
    accumulator.textContent = '';
    shouldProcessNewOperand = false;
}

function updateHistoryDisplay() {
    historyDisplay.textContent = currentOperation.toString();
}


setUpOperatorEventListeners();

// TODO: write logic to compute operation
function setUpEqualEventListener() {
    const equal = document.getElementById('equal');
    equal.addEventListener('click', () => {
        processOperand();
        updateDisplay();
        const result = evaluateOperation();
        displayResult(result);
    });
}

function evaluateOperation() {
    let result;
    if (currentOperation.operand1 === undefined) {
        return;
    } else if (currentOperation.operand2 === undefined || currentOperation.operator === undefined) {
        result = currentOperation.operand1;
    } else {
        result = currentOperation.compute();
    }
    return result;
}

function displayResult(result) {
    accumulator.textContent = result;
}

setUpEqualEventListener();