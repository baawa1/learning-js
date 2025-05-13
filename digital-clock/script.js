const hoursText = document.querySelector(".hours");
const minutesText = document.querySelector(".minutes");
const secondsText = document.querySelector(".seconds");
const dateText = document.querySelector(".date");
const meridianText = document.querySelector(".am-pm");

const days = [
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get and set time and date
function getTime() {
  let date = new Date();
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const meridian = date.toLocaleString().slice(-2);

  // set the date
  dateText.innerHTML = `${days[day - 1]}, ${month} ${day}, ${year}`;

  //set the time
  hoursText.innerHTML = hours.toString().padStart(2, "0");
  minutesText.innerHTML = minutes.toString().padStart(2, "0");
  secondsText.innerHTML = seconds.toString().padStart(2, "0");
  meridianText.innerHTML = meridian;
}

getTime();

setInterval(getTime, 500);
