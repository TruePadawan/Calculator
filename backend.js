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
let equalityUsed = false; // SPECIAL VAR FOR CHECKING IF A CALC WAS EVALUATED WITH EQ SIGN

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
        b: result.textContent,
        operator
    };
}

const calc = (data) => {
    
    let res = operate(data.operator,data.a,data.b);

    if ( isNaN(res) || isFinite(res) === false ) return 0;

    if (res.toString().length > 4)
    {
        return res.toFixed(3);
    }
    return res;
}
/////////////////////////////
// EVENT LISTENERS FOR BUTTONS
clearButton.addEventListener('click', () => {
    result.textContent = 0;
    calculations.textContent = '';
    currentOperator = '';
    secondOperand = false;
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
    })
});

specialButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!equalityUsed)
        {
            if (needsTobeEvaluated())
            {
                let operands = getOperands(currentOperator);
                let newRes = calc(operands);
                console.log(newRes);
                calculations.textContent = `${newRes} ${button.textContent}`;
                currentOperator = button.textContent;
                result.textContent = '0';
                return;
            }
        }else
        {
            equalityUsed = false;
        }

        currentOperator = button.textContent;
        calculations.textContent = `${result.textContent} ${currentOperator}`;
        result.textContent = '0';
    })
});

decimalButton.addEventListener('click', () => {
    if (!result.textContent.includes('.'))
    {
        let newRes = result.textContent + '.';
        result.textContent = newRes;
    }
});

equalityButton.addEventListener('click', () => {
    if (needsTobeEvaluated())
    {
        let operands = getOperands(currentOperator);
        calculations.textContent = `${operands.a} ${currentOperator} ${operands.b} =`;
        result.textContent = calc(operands);
        equalityUsed = true;
    }
});
result.textContent = 0;