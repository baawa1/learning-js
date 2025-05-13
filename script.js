// // console.log(Math)
// document.addEventListener("DOMContentLoaded", function () {
//   // const increase = document.querySelector(".increase");
//   const increase = document.querySelector(".increase");
//   const decrease = document.querySelector(".descrease");
//   // console.log(increase)
//   const reset = document.querySelector(".reset");
//   const counter = document.querySelector(".counter");
//   let count = 0;

//   increase.onclick = () => {
//     count++;
//     counter.textContent = count;
//   };

//   decrease.onclick = () => {
//     count--;
//     counter.textContent = count;
//   };

//   reset.onclick = () => {
//     count = 0;
//     counter.textContent = count;
//   };
// });

// let score = 75 ;

// let grade;
// if (age < 18) {
//   message = "You can not enter becasue you are below 18";
// }
// if (age >= 18) {
//   message = "Youn can enter because you are 18(+)";
// }
// if (age >= 30) {
//   message = "You are 30+";
// }
// if (age >= 40) {
//   message = "You are 40+";
// }
// console.log(message);

// switch (true) {
//   case score >= 80:
//     grade = "AA";
//     break;
//   case score >= 75:
//     grade = "AB";
//     break;
//   case score >= 70:
//     grade = "A";
//     break;
//   case score < 65:
//     grade = "AB";
//     break;
//   case score < 60:
//     grade = "B";
//     break;
//   case score < 55:
//     grade = "BC";
//     break;
//   case score < 50:
//     grade = "C";
//     break;
//   case score < 65:
//     grade = "AB";
//     break;
//   case score < 65:
//     grade = "AB";
//     break;
//   default:
//     break;
// }
// console.log(grade);

// let userName = "Aishat Kehinde Bello";

// FirstName = userName.slice(0, `${userName.indexOf(" ")}`);
// LastName = userName.slice(`${userName.indexOf(" ") + 1}`);
// console.log(FirstName);
// console.log(LastName);

// let email = "muabarakbello@gmail.com"

// let newUserName = userName.split(" ")

// console.log(newUserName)

// let userName = window.prompt("Enter your username");

// userName =
//   userName.trim().charAt(0).toUpperCase() +
//   userName.trim().slice(1).toLowerCase();

// console.log(userName);

// const temp = -10;

// if (temp >= 0 && temp <= 30) {
//   console.log("the temprature is good");
// } else {
//   console.log("the temprature is bad");
// }

// let message = "";

// do {
//   message = window.prompt("Enter your username");
// } while (message === "" || message === null);

// // while (message === "" || message === null) {
// //   message = window.prompt("Enter your username");
// // }

// console.log(message);

// let loggedIn = false;
// let userName = "";
// let password = "";

// do {
//   userName = window.prompt("Enter your username");
//   password = window.prompt("Enter your password");

//   if (userName === "Mubarak" && password === "password") {
//     loggedIn = true;
//   }
// } while (!loggedIn);

// for (let i = 1; i < 11; i++) {
//   if (i === 5) {
//     continue;
//   } else {
//     console.log(`I love you ${i}`);
//   }
// }

// const minimun = 10;
// const maximum = 100;
// const answer = Math.floor(Math.random() * (maximum - minimun + 1) + minimun);
// // console.log(`answer is ${answer}`);
// let attempts = 0;
// let runinig = true;

// while (runinig) {
//   attempts++;
//   let guess = window.prompt(`Enter a number between ${minimun} and ${maximum}`);

//   guess = Number(guess);

//   if (isNaN(guess)) {
//     window.alert("This is a not number, try again");
//   } else if (guess < minimun || guess > maximum) {
//     window.alert("This is outside of the stipulated range, try again");
//   } else {
//     if (guess < answer) {
//       window.alert(`${guess} is too low, try again`);
//     } else if (guess > answer) {
//       window.alert(`${guess} is too high, try again`);
//     } else if (guess === answer) {
//       window.alert(
//         `${guess} is correct. It took you ${attempts} attempts to get it`
//       );
//       runinig = false;
//     }
//   }
// }

// const maximum = 50;
// const minimun = 20;
// const rand = Math.floor(Math.random() * (maximum - minimun + 1)) + minimun;
// let attempts = 0;
// let runinig = true;
// console.log(rand);

// while (runinig) {
//   attempts++;
//   let guess = window.prompt(`Enter a number bettwen ${minimun} and ${maximum}`);
//   guess = Number(guess);

//   if (isNaN(guess)) {
//     window.alart("This is not a number");
//   } else if (guess < minimun || guess > maximum) {
//     window.alert("This is outside of the stipulated range, please try again");
//   } else {
//     if (guess < rand) {
//       window.alert("This is lower the answer, try again");
//     } else if (guess > rand) {
//       window.alert("This is higher than the answer, try again");
//     } else if (guess === rand) {
//       window.alert(
//         `${guess} is correct, it took you ${attempts} attempts to get it right`
//       );
//       runinig = false;
//     }
//   }
// }

// Functions
// function happyBirthday(username, age) {
//   console.log(`Happy birthday to you!`);
//   console.log(`Happy birthday to you!`);
//   console.log(`Happy birthday to you! ${username}`);
//   console.log(`Happy birthday to you!`);
//   console.log(`Happy birthday to you!`);
//   console.log(`You are ${age} years old`);
// }

// happyBirthday("BaaWa", 20);

// function add(x, y) {
//   return x + y;
// }

// let add1 = add(4, 6);
// console.log(add1);

// function isEven(x) {
//   Number(x);
//   let div = x % 2;
//   return div === 0 ? `${x} is even` : `${x} is odd`;
//   // if (div === 0) {
//   //   return `${x} is even`;
//   // } else {
//   //   return `${x} is odd`;
//   // }
// }

// console.log(isEven(9078867))

//Class
// class Person {
//   constructor(firstName, lastName, age, country, relegion) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.country = country;
//     this.relegion = relegion;
//   }

//   school(schoolName) {
//     console.log(`The name of my school is ${schoolName}`);
//   }
// }

// const Person1 = new Person("Mubarak", "Bello", 34, "Nigeria", "Islam");
// const Person2 = new Person("ROqeeb", "Bello", 30, "Nigeria", "Islam");

// Person1.school("NUD");
// Person2.school("Ogun");

// class School extends Person {
//   constructor(schoolName, location, type) {
//     this.schoolName = schoolName;
//     this.location = location;
//     this.type = type;
//   }
// }

// filters

// const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// const numArrayFilter = numArray.filter((num) => {
//   return num % 2 !== 0;
// });

// const numArrayReduce = numArray.reduce((num, sum) => {
//   return sum + num;
// });

// console.log(numArrayReduce);

//destructuring

// let a = 5;
// let b = 7;

// [a, b] = ["mubarak", "roqeeb"];

// console.log(a);

//sychronous JS

// console.log("1. Start");
// alert("2. This blocks everything until closed");
// console.log("3. End");

// asynchrnous JS

// console.log("1. Start");

// setTimeout(() => {
//   console.log("2. Timeout finished");
// }, 2000);

// console.log("3. End");

// Promise

const myPromise = new Promise((resolve, reject) => {
  let success = false;

  setTimeout(() => {
    if (success) {
      resolve("✅ Operation successful!");
    } else {
      reject("❌ Operation failed.");
    }
  }, 2000);
});

myPromise
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
