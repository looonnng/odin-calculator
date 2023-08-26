// basic math operators

const operators = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  "*": function (a, b) {
    return a * b;
  },
  "/": function (a, b) {
    return a / b;
  },
};

let firstNum;
let operator;
let secNum;

const operate = (op, num1, num2) => {
  return operators[op](num1, num2);
};

// DOM Manipulations

const numbers = document.querySelectorAll(".number");
const currResult = document.querySelector(".current-result");
const prevResult = document.querySelector(".prev-result");
console.log(numbers);

numbers.forEach((num) => {
  num.addEventListener("click", () => {
    currResult.innerText += num.innerText;
  });
});

document.addEventListener("keypress", (e) => {
  numbers.forEach((num) => {
    if (e.key == num.innerText) {
      currResult.innerText += e.key;
    }
  });
});
