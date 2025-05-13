const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const millisecondsEl = document.querySelector(".milliseconds");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let startTime = 0;
let interval = 0;
let elapsedTime = 0;
let isRuning = false;

//Start timer
startBtn.addEventListener("click", () => {
  if (!isRuning) {
    startTime = new Date().getTime();
    isRuning = true;
    interval = setInterval(timeElapsed, 10);
    // console.log(startTime);
  }
});

// Get timeElapsed
function timeElapsed() {
  elapsedTime = new Date().getTime() - startTime;

  //Set the clock

  //hours
  hoursEl.textContent = Math.floor(elapsedTime / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");

  //minutes
  minutesEl.textContent = Math.floor(
    (elapsedTime % (60 * 60 * 1000)) / (60 * 1000)
  )
    .toString()
    .padStart(2, "0");

  // seconds
  secondsEl.textContent = Math.floor((elapsedTime % (60 * 1000)) / 1000)
    .toString()
    .padStart(2, "0");

  //miliseconds
  millisecondsEl.textContent = Math.floor(elapsedTime % 1000)
    .toString()
    .padStart(3, "0");
}

//Stop timer
stopBtn.addEventListener("click", () => {
  if (isRuning) {
    isRuning = false;
    clearInterval(interval);
  }
});

//Reset timer
resetBtn.addEventListener("click", () => {
  isRuning = false;
  startTime = 0;
  elapsedTime = 0;
  clearInterval(interval);

  //reset clock
  //hours
  hoursEl.textContent = "00";

  //minutes
  minutesEl.textContent = "00";

  // seconds
  secondsEl.textContent = "00";

  //miliseconds
  millisecondsEl.textContent = "000";
});
