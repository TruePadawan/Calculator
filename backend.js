const ADDITION_OPERATOR = '+';
const SUBTRACTION_OPERATOR = '-';
const MULTIPLICATION_OPERATOR = 'x';
const DIVISION_OPERATOR = '/';
const EQUALITY_OPERATOR = '=';

let result = document.querySelector('#result');
let calculations = document.querySelector('#calculations');

let clearButton = document.querySelector('#clearButton');
let deleteButton = document.querySelector('#deleteButton');

let nonSpecialButtons = document.querySelectorAll('.button-row button:not(.special-button, .extra-special)');
let specialButtons = document.querySelectorAll('.special-button:not(#equality)');
let decimalButton = document.querySelector('.extra-special');
let equalityButton = document.querySelector('#equality');

let currentOperator = '';
let secondOperand = false;

// FUNCTIONS USED IN CALC LOGIC
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

const needsTobeEvaluated = () => {
    if (calculations.textContent.includes(ADDITION_OPERATOR)) return true;
    if (calculations.textContent.includes(SUBTRACTION_OPERATOR)) return true;
    if (calculations.textContent.includes(MULTIPLICATION_OPERATOR)) return true;
    if (calculations.textContent.includes(DIVISION_OPERATOR)) return true;
    if (calculations.textContent.includes(EQUALITY_OPERATOR)) return true;
    return false;
}

const getOperands = (operator) => {
    let operands = calculations.textContent.split(operator);
    return {
        a: operands[0],
        b: operands[1],
        operator
    };
}

const calc = (data) => {
    let res = operate(data.operator,data.a,data.b);
    if (res.toString().length > 4)
    {
        result.textContent = res.toFixed(3);
        return;
    }
    result.textContent = res;
}
/////////////////////////////
// EVENT LISTENERS FOR BUTTONS
clearButton.addEventListener('click', () => {
    result.textContent = 0;
    calculations.textContent = '';
});

deleteButton.addEventListener('click', () => {
    if (result.textContent.length > 1)
    {
        result.textContent = result.textContent.substring(0, result.textContent.length - 1);
    }else if (result.textContent.length === 1 && result.textContent != '0')
    {
        result.textContent = '0';
    }
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

specialButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (secondOperand)
        {
            let newRes = calculations.textContent + result.textContent;
            calculations.textContent = newRes;
            let operands = getOperands(currentOperator);
            calc(operands);
        }
        
        currentOperator = button.textContent;
        let newRes = result.textContent + currentOperator;
        calculations.textContent = newRes;
        result.textContent = '0';
        secondOperand = true;
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