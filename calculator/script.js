const topDisplay = document.getElementById("previous-operand");
const buttonDisplay = document.getElementById("current-operand");
let operand = "";
let operandCopy = "";
let result = "";

//calculate
const calculate = () => {
  //   console.log(topDisplay.textContent);
  //   console.log(buttonDisplay.textContent);

  topValue = parseFloat(
    topDisplay.textContent.slice(0, topDisplay.textContent.length - 1)
  );
  buttomValue = parseFloat(buttonDisplay.textContent);
  operator = operand;
  console.log(topValue);
  console.log(buttomValue);

  switch (operator) {
    case "+":
      result = topValue + buttomValue;
      break;
    case "-":
      result = topValue - buttomValue;
      break;
    case "×":
      result = topValue * buttomValue;
      break;
    case "÷":
      result = topValue / buttomValue;
      break;
    default:
      result = "Inavalid calculation";
      break;
  }

  //set the result
  topDisplay.textContent = `${topValue}${operand}${buttomValue}`;
  buttonDisplay.textContent = result;
  console.log(`The resuslt is ${result}`);
};

//append operation
const appendOperation = (sign) => {
  //if there is not result previously
  if (result === "") {
    //if it is percentage
    if (sign === "%") {
      result = buttonDisplay.textContent / 100;
      topDisplay.textContent = `${buttonDisplay.textContent}%`;
      buttonDisplay.textContent = result;
      operand = "";
      return;
    }

    //other operands
    if (operand === "") {
      topDisplay.textContent = buttonDisplay.textContent;
      buttonDisplay.textContent = sign;
      operand = sign;
      operandCopy = sign;
    } else if (buttonDisplay.textContent === operand) {
      buttonDisplay.textContent = sign;
      operand = sign;
      operandCopy = sign;
    } else {
      calculate();
    }
  } else {
    topDisplay.textContent = `${result}`;
    buttonDisplay.textContent = sign;
    operand = sign;
    operandCopy = sign;
    console.log("I did the work");
  }
};

//append number
const appendNumber = (number) => {
  //check if the first element is 0 and clear it
  if (buttonDisplay.textContent.startsWith("0")) {
    buttonDisplay.textContent = "";
  }
  //   console.log(operandCopy);

  // if we have an operand set
  if (operand === "") {
    buttonDisplay.textContent += number;
    console.log("11111111");
  } else if (operandCopy !== "") {
    topDisplay.textContent = topDisplay.textContent + operand;
    buttonDisplay.textContent = "";
    buttonDisplay.textContent = number;
    operandCopy = "";
    console.log("22222222");
  } else {
    buttonDisplay.textContent += number;
    console.log("3333333");
  }
};

//Clear all
const clearAll = () => {
  topDisplay.textContent = "";
  buttonDisplay.textContent = 0;
  operand = "";
  operandCopy = "";
  result = "";
};

//delete number
const deleteNumber = () => {
  buttonDisplay.textContent = buttonDisplay.textContent.slice(
    0,
    buttonDisplay.textContent.length - 1
  );
};
