const accumulator = document.getElementById('accumulator');
const equal = document.getElementById('equal');
let currentOperation = new Operation();

// TODO: simple arthimetic functions
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

function evaluateOperation() {
    let result;
    if (currentOperation.operand1 === undefined || currentOperation.operator === undefined) {
        return;
    } else if (currentOperation.operand2 === undefined) {
        result = currentOperation.operand1;
    }  else {
        result = currentOperation.compute();
        currentOperation = new Operation();
        currentOperation.processOperand(result);
    }
    displayResult(result);
}

// TODO: object that stores operand and operator data
function Operation() {
    this.operand1 = undefined;
    this.operand2 = undefined;
    this.operator = undefined;
    this.compute = function() {
        return this.operator(this.operand1, this.operand2);
    }
    this.processOperand = function(operand) {
        if (this.operand1 === undefined) {
            this.operand1 = operand;
        } else {
            this.operand2 = operand;
        }
    },
    this.processOperator = function(operator) {
        switch(operator) {
            case '+':
                this.operator = add;
                break;
            case '-':
                this.operator = subtract;
                break;
            case 'x':
                this.operator = multiply;
                break;
            case '/':
                this.operator = divide;
                break;
        }
    }
}

// TODO: functions that attach event listeners
function setUpEventListeners() {
    setUpDigitEventListeners();
    setUpOperatorEventListeners();
    equal.addEventListener('click', evaluateOperation);
}
function setUpClickEventListeners(className, callbackFunc) {
    const collection = document.getElementsByClassName(className);
    Array.from(collection).forEach(element => {
        element.addEventListener('click', callbackFunc);
    });
}

function setUpDigitEventListeners() {
    setUpClickEventListeners('digit', buildOperand)
}

function setUpOperatorEventListeners() {
    setUpClickEventListeners('operator', () => {
        storeOperand();
        resetAccumulator();
        storeOperator(event);
    })
}

// TODO: callback functions for the event listeners
function buildOperand(event) {
    const digit = event.currentTarget.value;
    if (accumulator.textContent == '0') {
        accumulator.textContent = digit;
    } else {
        accumulator.textContent += digit;
    }
}

function storeOperand() {
    const operand = Number(accumulator.textContent);
    currentOperation.processOperand(operand);
}

function storeOperator(event) {
    const operator = event.currentTarget.value;
    currentOperation.processOperator(operator);
}

// TODO: handles displaying to interface
function resetAccumulator() {
    accumulator.textContent = '0';
}

function displayResult(result) {
    accumulator.textContent = result;
}

setUpEventListeners();


