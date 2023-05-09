import { $, $$ } from "./dom";
import { doOperation } from "./operations";
import "./style.css";

const equalBtn = $("#equalBtn");
const display = $("#display");
const history = $("#history");
const clear = $("#clear");
const clearAll = $("#clearAll");
const changeSignal = $("#changeSignal");
const numbers = $$(".digits__numbers");
const operations = $$(".digits__operation");
const VALUES = {
  op1: "",
  op2: "",
  operator: "",
  reset: false,
};

/**
 * Reset all parameters to default
 */
const resetCalculator = () => {
  display.textContent = "0";
  history.textContent = "...";
  VALUES.op1 = "";
  VALUES.op2 = "";
  VALUES.operator = "";
  VALUES.reset = false;
  operations.forEach((operation) => {
    operation.disabled = false;
  });
};

/**
 * Evaluate if value is 0
 * @param {string} value
 * @returns
 */
const isInitWithZero = (value) => value === "0";

/**
 * Update display according to value
 * @param {string} newValue Value to update display
 */
const updateDisplay = (newValue) => (display.textContent = newValue);

/**
 * Add numbers and dot to display when click on them
 */
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (VALUES.reset) resetCalculator();
    let currentNumber = number.textContent;
    const currentDisplay = display.textContent.replaceAll(",", "");
    if (isInitWithZero(currentDisplay)) updateDisplay("");
    const newDisplay = currentDisplay + currentNumber;

    if (currentNumber === ".") {
      if (currentDisplay.includes(".")) return;
      const formatDisplay = Number(newDisplay).toLocaleString("en-US");
      updateDisplay(formatDisplay + currentNumber);
      return;
    }

    const formatDisplay = Number(newDisplay).toLocaleString("en-US");
    updateDisplay(formatDisplay);
  });
});

/**
 * Do operation according to /, *, +, - and = buttons
 */
operations.forEach((operation) => {
  operation.addEventListener("click", async () => {
    const currentDisplay = display.textContent;
    const currentOperation = operation.textContent;
    if (currentDisplay === "0") return;

    // Handle first operator
    if (VALUES.op1 === "") {
      VALUES.op1 = currentDisplay;
      VALUES.operator = currentOperation;
      updateDisplay("0");
      history.textContent = `${VALUES.op1} ${VALUES.operator} ...`;
      operations.forEach((operation) => {
        operation.disabled = true;
        equalBtn.disabled = false;
      });
      return;
    }

    // Handle second operator
    if (VALUES.op2 === "") {
      VALUES.op2 = currentDisplay;
      history.textContent = `${VALUES.op1} ${VALUES.operator} ${VALUES.op2} =`;
      updateDisplay("Calculando...");
    }

    // Do operation
    try {
      const op1 = Number(VALUES.op1.replaceAll(",", ""));
      const op2 = Number(VALUES.op2.replaceAll(",", ""));
      console.log("realizar suma");
      const res = await doOperation({ op1, op2, typeOfOperation: VALUES.operator });

      if (res instanceof Error) {
        updateDisplay("Error");
        return;
      }

      const valueWithTwoDecimals = Number(res).toFixed(2);
      const formatDisplay = Number(valueWithTwoDecimals).toLocaleString("en-US");
      updateDisplay(formatDisplay);
      VALUES.reset = true;
    } catch (error) {
      console.error("Error al intentar operar", error);
    }
  });
});

/**
 * Clear display one by one
 */
clear.addEventListener("click", () => {
  const currentDisplay = display.textContent;
  const newDisplay = currentDisplay.slice(0, -1);
  if (newDisplay === "") {
    updateDisplay("0");
    return;
  }
  const formatNewDisplay = Number(newDisplay.replaceAll(",", "")).toLocaleString("en-US");
  console.log(formatNewDisplay);
  updateDisplay(formatNewDisplay);
});

/**
 * Clear all display
 */
clearAll.addEventListener("click", () => {
  resetCalculator();
});

/**
 * Change signal
 */
changeSignal.addEventListener("click", () => {
  const currentDisplay = Number(display.textContent.replaceAll(",", ""));
  console.log(currentDisplay);
  const newDisplay = currentDisplay * -1;
  const formatNewDisplay = Number(newDisplay).toLocaleString("en-US");
  updateDisplay(formatNewDisplay);
});
