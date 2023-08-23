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