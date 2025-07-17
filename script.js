let display = document.querySelector("#display");

let content = '';
let operator = '';
let leftOperand = '';
let rightOperand = '';
let displayingTotal = false;
let operatorButtonPressed = false;

// button assignments
const numBtns = document.querySelectorAll(".numbtn");
const btnadd = document.querySelector(".add");
const btnsub = document.querySelector(".subtract");
const btnmul = document.querySelector(".multiply");
const btndiv = document.querySelector(".divide");
const btnclear = document.querySelector(".clear");
const btndel = document.querySelector(".delete");
const btnequals = document.querySelector(".equals")
const btnPeriod = document.querySelector(".period");

// Arithmetic functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function mul(a, b) {
    return a * b;
};

function div(a, b) {
    if (b === 0) {
        return "SYNTAX ERR";
    }
    return a / b;
};

function clear() {
    return;
};

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return mul(a, b);
        case "/": return div(a, b);
        default: return "INVALID";
    }
}

function populateDisplay(value) {
    if (displayingTotal) {
        content = '';
        displayingTotal = false;
    }
    content += value;
    display.textContent = content;
}

numBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        populateDisplay(btn.textContent);
    });
});

function handleOperator(op) {
    if (!displayingTotal && content !== '') {
        leftOperand = content;
    }

    operator = op;
    content = '';
    displayingTotal = false;
}

btnadd.addEventListener("click", () => handleOperator("+"));
btnsub.addEventListener("click", () => handleOperator("-"));
btnmul.addEventListener("click", () => handleOperator("*"));
btndiv.addEventListener("click", () => handleOperator("/"));

btnequals.addEventListener("click", () => {
    if (leftOperand && operator && content) {
        rightOperand = content;
        let result = operate(leftOperand, rightOperand, operator);
        display.textContent = result;
        leftOperand = result;
        content = '';
        operator = '';
        displayingTotal = true;
    } 
});

btnclear.addEventListener("click", () => {
    content = '';
    leftOperand = '';
    rightOperand = '';
    operator = '';
    display.textContent = '';
});

btndel.addEventListener("click", () => {
    content = content.slice(0, -1);
    display.textContent = content;
});

btnPeriod.addEventListener("click", () => {
    if (!content.includes(".")) {
        populateDisplay(".");
    }
});

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (/\d/.test(key)) {
        populateDisplay(key);
    } else if (key === ".") {
        if (!content.includes(".")) {
            populateDisplay(".");
        }
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperator(key);
    } else if (key === "Enter" || key === "=") {
        btnequals.click(); 
    } else if (key === "Backspace") {
        btndel.click();
    } else if (key === "Escape" || key.toLowerCase() === "c") {
        btnclear.click();
    }
});
