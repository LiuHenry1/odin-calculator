const accumulator = document.getElementById('accumulator');
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

// TODO: object that stores operand and operator data
function Operation() {
    this.operand1 = undefined;
    this.operand2 = undefined;
    this.operator = undefined;
    this.compute = function() {
        return this.operator(this.operand1, this.operand2);
    }
}

// TODO: functions that attach event listeners
function setUpClickEventListeners(className, callbackFunc) {
    const collection = document.getElementsByClassName(className);
    Array.from(collection).forEach(element => {
        element.addEventListener('click', callbackFunc);
    });
}

function setUpDigitEventListeners() {
    setUpClickEventListeners('digit', buildOperand)
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

setUpDigitEventListeners();

