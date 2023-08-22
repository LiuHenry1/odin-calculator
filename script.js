const runningOperation = document.getElementById('runningOperation');
const accumulator = document.getElementById('accumulator');
const equal = document.getElementById('equal');
let currentOperation = new Operation();

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
    updateRunningOperation();
    const result = currentOperation.compute();
    currentOperation = new Operation();
    displayResult(result);
}

function Operation() {
    this.operand1 = undefined;
    this.operand2 = undefined;
    this.operatorString = undefined;
    this.operator = undefined;
    this.compute = function() {
        if (this.operand1 == undefined) {
            return;
        } else if (this.operand2 === undefined || this.operator === undefined) {
            return this.operand1;
        } else {
            return this.operator(this.operand1, this.operand2);
        }
    }

    this.processOperand = function(operand) {
        if (this.operand1 === undefined) {
            this.operand1 = operand;
        } else {
            this.operand2 = operand;
        }
    },
    this.processOperator = function(operatorString) {
        this.operatorString = operatorString;
        switch(operatorString) {
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

    this.toString = function() {
        let toReturn = "";
        if (this.operand1 !== undefined) {
            toReturn += `${this.operand1} `;
        } 
        if (this.operator !== undefined) {
            toReturn += `${this.operatorString} `;
        }  
        if (this.operand2 !== undefined) {
            toReturn += ` ${this.operand2} `;
        }
        return toReturn;
    }
}

function setUpEventListeners() {
    setUpDigitEventListeners();
    setUpOperatorEventListeners();
    equal.addEventListener('click', () => {
        storeOperand();
        evaluateOperation();
    })
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
        storeOperator(event);
        resetAccumulator();
        updateRunningOperation();
    })
}

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
    const operatorString = event.currentTarget.value;
    currentOperation.processOperator(operatorString);
}

// TODO: handles displaying to interface

function updateRunningOperation() {
    runningOperation.textContent = currentOperation.toString();
}

function resetAccumulator() {
    accumulator.textContent = '0';
}

function displayResult(result) {
    accumulator.textContent = result;
}

setUpEventListeners();


