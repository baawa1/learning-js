addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("converter-form");

  form.addEventListener("submit", (e) => {
    const temp = parseFloat(document.getElementById("temperature").value);
    const converter = document.querySelector(
      "[name='conversion']:checked"
    ).value;
    const resultDiv = document.getElementById("result");

    e.preventDefault();

    if (isNaN(temp)) {
      alert("Please enter a valid number");
    }

    if (converter === "cToF") {
      result = `${temp}°C = ${((temp * 9) / 5 + 32).toFixed(2)}°F`;
    } else if (converter === "fToC") {
      result = `${temp}°F = ${((temp - 32) * (5 / 9)).toFixed(2)}°C`;
    }

    resultDiv.textContent = result;
    // console.log(result);
  });
});
