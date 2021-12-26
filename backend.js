const ADDITION_OPERATOR = '+';
const SUBTRACTION_OPERATOR = '-';
const MULTIPLICATION_OPERATOR = '*';
const DIVISION_OPERATOR = '/';

let result = document.querySelector('#result');
let calculations = document.querySelector('#calculations');
let clearButton = document.querySelector('#clearButton');
let deleteButton = document.querySelector('#deleteButton');
let nonSpecialButtons = document.querySelectorAll('.button-row button:not(.special-button, .extra-special)');
let decimalButton = document.querySelector('.extra-special');

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

// EVENT LISTENERS FOR BUTTONS
clearButton.addEventListener('click', () => {
    result.textContent = 0;
    calculations.textContent = '';
});

nonSpecialButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (result.textContent === '0')
        {
            result.textContent = button.textContent;
        }
        else
        {
            if (result.textContent.length < 16)
            {
                let newRes = result.textContent + button.textContent;
                result.textContent = newRes;
            }
        }
        console.log(`Button ${button.textContent} clicked!`);
    })
});

decimalButton.addEventListener('click', () => {
    if (!result.textContent.includes('.'))
    {
        let newRes = result.textContent + '.';
        result.textContent = newRes;
    }
})
result.textContent = 0;
console.log(nonSpecialButtons);