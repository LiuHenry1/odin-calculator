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
// 1) attach handlers
function setUpDigitEventListeners() {
    const digits = document.getElementsByClassName('digit');
    Array.from(digits).forEach(digit => digit.addEventListener('click', () => {
        appendDigit(digit.value);
    }));
}

// 2) implement callback
function appendDigit(digit) {
    const accumulator = document.getElementById('accumulator');
    
    if (accumulator.textContent === '0') 
        accumulator.textContent = digit;
    else 
        accumulator.textContent += digit;
}

setUpDigitEventListeners();

