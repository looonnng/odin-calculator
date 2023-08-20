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


