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
const btns = document.querySelectorAll("button");
const ops = document.querySelectorAll(".operator");
const nums = document.querySelectorAll(".number");
const currDisplay = document.querySelector(".current-result");
const prevDisplay = document.querySelector(".prev-result");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const clearEntry = document.querySelector("#clear-entry");
const decimal = document.querySelector("#decimal");
const plusOrMinus = document.querySelector("#plus-or-minus");

//Event Listeners

document.addEventListener("keydown", (e) => {
  handleNumber(e.key);
  if (e.key == "=" || e.key == "Enter") {
    console.log("test");
    handleCalculation();
  }
  if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
    handleOperator(e.key);
    e.preventDefault();
  }
});

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

decimal.addEventListener("click", (e) => {
  handleDecimal(e.target.textContent);
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

plusOrMinus.addEventListener("click", () => {
  handlePlusOrMinus();
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

function handleDecimal(dec) {
  if (!currentNum.includes(".")) {
    currentNum += dec;
    currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
  }
}

function handleNumber(num) {
  if ((Number(num) || num === "0") && currentNum.length < 11) {
    if (currentNum[0] != "0" || currentNum.includes(".")) {
      currentNum += num;
      currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
    }
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
  } else if (currentNum) {
    if (previousNum) {
      if (op == operator) {
        handleCalculation();
      } else if (op != operator) {
        operator = op;
        currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
      }
    } else {
      operator = op;
      previousNum = currentNum;
      currDisplay.textContent = `${previousNum} ${operator}`;
      currentNum = "";
    }
  } else if (previousNum) {
    operator = op;
    currDisplay.textContent = `${previousNum} ${operator}`;
  }
}

function handleCalculation() {
  previousNum = previousNum.toString(); //After one calculation, prevNum will be typeof num, this prevents that
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

function handlePlusOrMinus() {
  if (currentNum) {
    if (currentNum.includes("-")) {
      currentNum = currentNum.replace("-", "");
      currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
    } else {
      currentNum = "-" + currentNum;
      currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
    }
  } else if (previousNum) {
    if (previousNum.toString().includes("-")) {
      previousNum = previousNum.toString().replace("-", "");
      currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
    } else {
      previousNum = "-" + previousNum.toString();
      currDisplay.textContent = `${previousNum} ${operator} ${currentNum}`;
    }
  }
}
