function add(a, b) {
    return (a + b)
};
  
function subtract(a, b) {
    return (a - b)
};

function multiply(a, b) {
    return (a * b)
};

function divide(a, b) {
    return (a / b)
};

function operate(a, operator, b){
    let answer = "";
    if (!operator && !b){
        answer = a;
    }
    if (operator == "+"){
        answer = add(a, b);
    }
    else if (operator == "-"){
        answer = subtract(a, b);
    }
    else if (operator == "*"){
        answer = multiply(a, b);
    }
    else if (operator == "/"){
        if (b === 0){
            return ("ERROR");
        }
        answer = divide(a, b);
    }
    answer = parseFloat(Number(answer).toPrecision(11)).toString();
    //answer = String(Number(answer));
    return answer;
}

let container = document.querySelector(".container");
let display = document.querySelector(".value");
let operatorPresent = false;
let firstNumber = "";
let operator = ""
let secondNumber = "";
let answerOnce = false;
let firstNumberPercentage = false;
let secondNumberPercentage = false;
let firstNumberDot = false;
let secondNumberDot = false;
let canZero = false;


container.addEventListener("click", event => {
    let id = event.target.id;

    if (id == "AC"){
        display.textContent = "";
        operatorPresent = false;
        firstNumber = "";
        secondNumber = "";
        operator = "";
        firstNumberDot = "";
        secondNumberDot = "";
        bracketCount = 0;
        highlight = document.querySelector(".selected");
        highlight.classList.remove("selected");
    }

    if (!isNaN(Number(id))){
        if (answerOnce === true){
            display.textContent = "";
            firstNumber = "";
            answerOnce = false;
        }
        if (operatorPresent === false){
            if (id === "0" && firstNumber === "0") {
                firstNumber = "";  
                display.textContent = "";
            }
            if (firstNumber === "0" && id !== "0") {
                display.textContent = "";
                firstNumber = "";  
            }
            display.textContent += id;
            firstNumber += id;
        }

        else if(operatorPresent === true){
            if (!secondNumber){
                display.textContent = "";
            }
            if (id === "0" && secondNumber === "0") {
                secondNumber = "";  
                display.textContent = "";
            }
            if (secondNumber === "0" && id !== "0") {
                display.textContent = "";
                secondtNumber = "";  
            }
            display.textContent += id;
            secondNumber += id
        }
    }

    if (id == "%"){
        if (!operatorPresent && !firstNumberPercentage) {
            percentageValue = (Number(firstNumber) * 0.01).toFixed(10);
            firstNumber = parseFloat(percentageValue).toString();
            firstNumberPercentage = true;
        } 
        else if (operatorPresent && !secondNumberPercentage){
            percentageValue = (Number(secondNumber) * 0.01).toFixed(10);
            secondNumber = parseFloat(percentageValue).toString();
            secondNumberPercentage = true;
        }
        display.textContent = parseFloat(percentageValue).toString();
    }

    let operators = ["/", "*", "-", "+"]
    if (answerOnce === true){
        answerOnce = false;
    }

    if (operators.includes(id)){
        if (operatorPresent === false){
            operator = id;
            operatorPresent = true;
            highlight = document.getElementById(id);
            highlight.classList.add("selected");
        }
    }

    if (id == "="){
        highlight = document.querySelector(".selected");
        highlight.classList.remove("selected");
        answer = operate(Number(firstNumber), operator, Number(secondNumber))
        display.textContent = answer;
        firstNumber = answer;
        secondNumber = "";
        operator = "";
        firstNumberDot = "";
        secondNumberDot = "";
        bracketCount = 0;
        operatorPresent = false;
        answerOnce = true;
    }

    if (id == "."){
        if (operatorPresent == false && firstNumberDot == false){
            firstNumber += id;
            display.textContent += id;
            firstNumberDot = true;
        }
        else if (operatorPresent == true && secondNumberDot == false){
            secondNumber += id;
            display.textContent += id;
            secondNumberDot = true;
        }
    }
})
