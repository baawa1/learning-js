const rollDice = document.getElementById("roll-btn");
const reultText = document.getElementById("result-text");
const diceContainer = document.getElementById("dice-container");

const diceFaces = {
  1: ["center"],
  2: ["top-left", "bottom-right"],
  3: ["top-left", "center", "bottom-right"],
  4: ["top-left", "top-right", "bottom-left", "bottom-right"],
  5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
  6: [
    "top-left",
    "top-right",
    "middle-left",
    "middle-right",
    "bottom-left",
    "bottom-right",
  ],
};

rollDice.addEventListener("click", () => {
  const diceNumber =
    parseFloat(document.getElementById("dice-count").value) || 1;
  //
  let diceArray = [];
  diceContainer.innerHTML = "";

  //generate random number
  for (let i = 1; i <= diceNumber; i++) {
    let randNumber = Math.floor(Math.random() * 6) + 1;
    diceArray.push(randNumber);

    // generate dice
    let diceWrap = document.createElement("div");
    diceWrap.className = "die";
    //append die
    diceContainer.appendChild(diceWrap);

    //generate dots
    diceFaces[randNumber].forEach((eachDot) => {
      let dot = document.createElement("div");
      dot.className = `dot ${eachDot}`;
      diceWrap.appendChild(dot);
    });
  }

  // display generated numbers
  reultText.textContent = diceArray.join(", ");
});
