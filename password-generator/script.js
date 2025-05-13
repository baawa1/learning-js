const result = document.getElementById("result");
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const generateBtn = document.getElementById("generate");
const lenghtInput = document.getElementById("length");
let lenghtInputValue = parseFloat(lenghtInput.value);

// setting up the submit funtion to genrate password

generateBtn.addEventListener("click", (e) => {
  e.preventDefault;
  const lenghtInput = document.getElementById("length");
  const uppercaseInput = document.getElementById("uppercase").checked;
  const lowercaseInput = document.getElementById("lowercase").checked;
  const numbersInput = document.getElementById("numbers").checked;
  const symbolsInput = document.getElementById("symbols").checked;
  const lenghtInputValue = parseFloat(lenghtInput.value);

  // check if password lenght is more than 6
  if (lenghtInputValue < 6) {
    alert("Password lenght must be at least 6 characters");
    return;
  }

  // check if at least one setting is checked
  if (!uppercaseInput && !lowercaseInput && !numbersInput && !symbolsInput) {
    alert("You have to select at least one password settings");
    return;
  }

  let password = "";
  // Generate password
  for (let i = 0; i < lenghtInputValue; i++) {
    // Generate random character array from selected settings
    let allChars = [];

    if (uppercaseInput) {
      allChars.push(String.fromCharCode(Math.floor(Math.random() * 26 + 65)));
    }
    if (lowercaseInput) {
      allChars.push(String.fromCharCode(Math.floor(Math.random() * 26 + 97)));
    }
    if (numbersInput) {
      allChars.push(String.fromCharCode(Math.floor(Math.random() * 10 + 48)));
    }
    if (symbolsInput) {
      allChars.push(
        "!@#$%^&*()_+~`|}{[]:;?><,./-=".charAt(Math.floor(Math.random() * 30))
      );
    }

    //generate password
    password += allChars.at(Math.floor(Math.random() * allChars.length));
  }

  result.textContent = password;
});

// increament the lenght input
increaseBtn.addEventListener("click", (e) => {
  e.preventDefault;
  lenghtInputValue++;
  lenghtInput.value = lenghtInputValue;
});

// Decreament the lenght input
decreaseBtn.addEventListener("click", (e) => {
  e.preventDefault;
  lenghtInputValue--;
  lenghtInput.value = lenghtInputValue;
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// const submit = document.getElementById("generate");
// const result = document.getElementById("result");
// const decreaseBtn = document.getElementById("decrease");
// const increaseBtn = document.getElementById("increase");
// const lenghtInput = document.getElementById("length");
// let lenghtInputValue = parseFloat(lenghtInput.value);
// let password = "";

// const genrateChar = {
//   uppercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
//   lowercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
//   number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
//   symbol: () =>
//     "!@#$%^&*()_+~`|}{[]:;?><,./-=".charAt(Math.floor(Math.random() * 30)),
// };

// // Generate passowrd function
// submit.addEventListener("click", function passGenerate(e) {
//   e.prevetDefault;

//   const passLenght = parseFloat(document.getElementById("length").value);
//   const passUpperCase = document.getElementById("uppercase").checked;
//   const passLowerCase = document.getElementById("lowercase").checked;
//   const passNumbers = document.getElementById("numbers").checked;
//   const passSymbols = document.getElementById("symbols").checked;

//   // check passowrd lenght
//   if (passLenght < 4) {
//     alert("Password lenght must be more 6 or more");
//     return;
//   }

//   let selectedType = [];
//   if (passUpperCase) selectedType.push("uppercase");
//   if (passLowerCase) selectedType.push("lowercase");
//   if (passNumbers) selectedType.push("number");
//   if (passSymbols) selectedType.push("symbol");

//   if (selectedType.length < 1) {
//     alert("Please select at least one password settings");
//     return;
//   }

//   //generate password
//   password = "";
//   for (let i = 0; i < passLenght; i++) {
//     let type = selectedType[Math.floor(Math.random() * selectedType.length)];
//     password += genrateChar[type]();
//   }

//   result.textContent = password;
// });

// // Decrease count
// decreaseBtn.addEventListener("click", (e) => {
//   e.preventDefault;
//   lenghtInputValue--;
//   lenghtInput.value = lenghtInputValue;
// });

// // Increase count
// increaseBtn.addEventListener("click", (e) => {
//   e.preventDefault;
//   lenghtInputValue++;
//   lenghtInput.value = lenghtInputValue;
// });
