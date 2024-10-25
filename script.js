const numbers = document.querySelectorAll('.num'),
    operators = document.querySelectorAll('.op'),
    equal = document.querySelector('.equal'),
    dot = document.querySelector('.dot'),
    allClear = document.querySelector('.ac'),
    plusMinus = document.querySelector('.plusMinus'),
    delBtn = document.querySelector('.delete'),
    expressionDisplay = document.querySelector('.expression'),
    resultDisplay = document.querySelector('.result');

let num1 = "",
    num2 = "",
    operator = "";
const MAXLENGTH = 10;


numbers.forEach((button) => {
    button.addEventListener('click', () => {
        if (!num2 && !operator && num1.length < MAXLENGTH && num1 !== 'Err') {
            num1 += button.textContent;
            expressionDisplay.textContent = num1;
            resultDisplay.textContent = num1;
        } else if (num1 && operator && num2.length < MAXLENGTH) {
            num2 += button.textContent;
            expressionDisplay.textContent = `${num1} ${operator} ${num2}`
            resultDisplay.textContent = num2;
        }

    })
})

dot.addEventListener('click', () => {
    if (resultDisplay.textContent !== '') {
        if (!operator && !num1.includes('.')) {
            num1 += '.';
            expressionDisplay.textContent = num1;
            resultDisplay.textContent = num1;
        } else if (num1 && operator && !num2.includes('.')) {
            num2 += '.';
            expressionDisplay.textContent = `${num1} ${operator} ${num2}`
            resultDisplay.textContent = num2;
        }
    }
})

operators.forEach((button) => {
    button.addEventListener('click', () => {

        if (resultDisplay.textContent === 'Err') return;

        if (num1 && !num2 && num1) {
            operator = button.textContent;
            expressionDisplay.textContent = `${num1} ${operator}`
            resultDisplay.textContent = operator;
        } else if (num1 && num2) {
            let result = calculate(num1, num2, operator).toString();
            num1 = result;
            num2 = "";
            operator = button.textContent;
            expressionDisplay.textContent = `${num1} ${operator}`;
            resultDisplay.textContent = formatResult(result)
        }
    })
})

function calculate(num1, num2, op) {
    let num1F = parseFloat(num1);
    let num2F = parseFloat(num2);

    switch (op) {
        case "+": return add(num1F, num2F);
        case "-": return subtract(num1F, num2F);
        case "x": return multiply(num1F, num2F);
        case "/": return divide(num1F, num2F);
    }
}

equal.addEventListener('click', () => {
    if (num1 && num2 && operator) {
        let result = calculate(num1, num2, operator).toString();
        resultDisplay.textContent = formatResult(result)
        expressionDisplay.textContent = `${num1} ${operator} ${num2}=`
        num1 = result;
        num2 = "";
        operator = "";
    }
})

plusMinus.addEventListener('click', () => {
    if (!operator && !num2) {
        if (resultDisplay.textContent !== "") {
            resultDisplay.textContent = `-${num1}`
            num1 = resultDisplay.textContent;
        }
    } else if (num1 && operator) {
        if (resultDisplay.textContent !== "") {
            resultDisplay.textContent = `-${num2}`
            num2 = resultDisplay.textContent
        }
    }
})

allClear.addEventListener('click', () => {
    num1 = "",
        num2 = "",
        operator = "";
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "";
})

delBtn.addEventListener('click', () => {
    if (num1 && !operator) {
        num1 = num1.slice(0, -1);
        resultDisplay.textContent = num1;
        expressionDisplay.textContent = num1;
    } else if (operator && num2) {
        num2 = num2.slice(0, -1);
        resultDisplay.textContent = num2;
        currentExp = expressionDisplay.textContent;
        resultDisplay.textContent = num2;
        if (expressionDisplay.textContent.charAt(expressionDisplay.textContent.length - 1) !== ' ') {
            expressionDisplay.textContent = `${currentExp.slice(0, currentExp.length - 1)}`
        }

    }
})

function formatResult(result) {
    return result.toString().slice(0, MAXLENGTH);
}


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num2 === 0 ? 'Err' : num1 / num2;
}


