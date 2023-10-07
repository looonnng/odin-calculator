// basic math operators
const operators = {
  "+": function (a, b) {
    return parseFloat(a) + parseFloat(b);
  },
  "-": function (a, b) {
    return parseFloat(a) - parseFloat(b);
  },
  "*": function (a, b) {
    return parseFloat(a) * parseFloat(b);
  },
  "/": function (a, b) {
    return parseFloat(a) / parseFloat(b);
  },
};

let currentNum = "";
let operator = "";
let previousNum = "";
let result = "";

// DOM References
const interface = document.querySelector(".interface-container");
const btns = document.querySelectorAll("button");
const ops = document.querySelectorAll(".operator");
const nums = document.querySelectorAll(".number");
const currDisplay = document.querySelector(".current-result");
const prevDisplay = document.querySelector(".prev-result");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const clearEntry = document.querySelector("#clear-entry");

//Event Listeners
nums.forEach((num) => {
  num.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

ops.forEach((op) => {
  op.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

equal.addEventListener("click", () => {
  handleCalculation();
});

clear.addEventListener("click", () => {
  handleClear();
});

clearEntry.addEventListener("click", () => {
  handleClearEntry();
});

//Functions
function calculate(op, prevNum, currNum) {
  let result = operators[op](prevNum, currNum);
  if (result.toString().length > 11) {
    // Handle decimal numbers
    return Math.round((result + Number.EPSILON) * 100) / 100;
  }
  return result;
}

function handleNumber(num) {
  if (currentNum.length < 11) {
    currentNum += num;
    currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
  }
}

function handleOperator(op) {
  if (prevDisplay.textContent) {
    if (currDisplay.textContent) {
      if (op == operator) {
        handleCalculation();
      } else if (previousNum === "") {
        operator = op;
        previousNum = currentNum;
        currDisplay.textContent = `${previousNum} ${operator}`;
        currentNum = "";
      } else {
        operator = op;
        currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
      }
    } else {
      operator = op;
      prevDisplay.textContent = `${previousNum} ${operator}`;
      currentNum = "";
      currDisplay.textContent = "";
    }
  } else {
    operator = op;
    previousNum = currentNum;
    currDisplay.textContent = `${previousNum} ${operator}`;
    currentNum = "";
  }
}

function handleCalculation() {
  if (currentNum === "0" && operator === "/") {
    // user input number is typeof string at first - fix doubling clicking operations that lead to "ERROR"
    handleDivideByZero();
  } else if (currentNum && operator && previousNum) {
    prevDisplay.textContent = `${previousNum} ${operator} ${currentNum} = ${calculate(
      operator,
      previousNum,
      currentNum
    )}`;
    previousNum = calculate(operator, previousNum, currentNum);
    currDisplay.textContent = `${previousNum} ${operator}`;
    currentNum = "";
  }
}

function handleClear() {
  currDisplay.textContent = "";
  prevDisplay.textContent = "";
  currentNum = "";
  operator = "";
  previousNum = "";
}

function handleClearEntry() {
  if (currentNum) {
    currentNum = "";
    currDisplay.textContent = `${previousNum} ${operator}`;
  } else {
    currDisplay.textContent = "";
    currentNum = "";
    previousNum = "";
    operator = "";
  }
}

function handleDivideByZero() {
  currDisplay.textContent = "ERROR";
  prevDisplay.textContent = "";
  currentNum = "";
  operator = "";
  previousNum = "";
}
