const ADDITION_OPERATOR = '+';
const SUBTRACTION_OPERATOR = '-';
const MULTIPLICATION_OPERATOR = '*';
const DIVISION_OPERATOR = '/';

let result = document.querySelector('#result');
let calculations = document.querySelector('#calculations');
let clearButton = document.querySelector('#clearButton');
let deleteButton = document.querySelector('#deleteButton');

const Add = (a, b) => Number(a) + Number(b);
const Subtract = (a, b) => Number(a) - Number(b);
const Multiply = (a, b) => Number(a) * Number(b);
const Divide = (a, b) => Number(a)/Number(b);

const operate = (operator,a,b) => {
    if (operator === ADDITION_OPERATOR) return Add(a, b);
    if (operator === SUBTRACTION_OPERATOR) return Subtract(a, b);
    if (operator === MULTIPLICATION_OPERATOR) return Multiply(a,b);
    if (operator === DIVISION_OPERATOR) return Divide(a, b);
}

// EVENT LISTENERS FOR CLEAR AND DELETE BUTTONS

result.textContent = 0;
console.log(operate('/',1, 2));