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

function calculate(op, prevNum, currNum) {
  return operators[op](prevNum, currNum);
}

// DOM References
const interface = document.querySelector(".interface-container");
const btns = document.querySelectorAll("button");
const ops = document.querySelectorAll(".operator");
const nums = document.querySelectorAll(".number");
const currDisplay = document.querySelector(".current-result");
const prevDisplay = document.querySelector(".prev-result");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");

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

function handleNumber(num) {
  if (currentNum.length < 11) {
    currentNum += num;
    currDisplay.textContent = currentNum;
  }
  // Add infinity msg
}

function handleOperator(op) {
  // handle if user hit any operator after equal sign
  if (prevDisplay.textContent) {
    if (currDisplay.textContent) {
      if (op == operator) {
        handleCalculation();
      } else {
        operator = op;
        prevDisplay.textContent = `${previousNum} ${operator}`;
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
    prevDisplay.textContent = `${previousNum} ${operator}`;
    currentNum = "";
    currDisplay.textContent = "";
  }
}

function handleCalculation() {
  prevDisplay.textContent = `${previousNum} ${operator} ${currentNum} = ${calculate(
    operator,
    previousNum,
    currentNum
  )}`;
  previousNum = calculate(operator, previousNum, currentNum);
  currDisplay.textContent = `${previousNum}`;
  currentNum = "";
}

function handleClear() {
  currentNum = "";
  operator = "";
  previousNum = "";
  currDisplay.textContent = "";
  prevDisplay.textContent = "";
}
