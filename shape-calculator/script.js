// Base class
class Shape {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `This is a ${this.name}.`;
  }
}

// Rectangle subclass
class Rectangle extends Shape {
  constructor(width, height) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

// Circle subclass
class Circle extends Shape {
  constructor(radius) {
    super("Circle");
    this.radius = radius;
  }

  area() {
    return (Math.PI * this.radius ** 2).toFixed(2);
  }
}

// DOM Elements
const shapeSelect = document.getElementById("shape");
const inputsDiv = document.getElementById("inputs");
const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");

// Input templates
const inputTemplates = {
  rectangle: `
        <input type="number" id="width" placeholder="Enter width">
        <input type="number" id="height" placeholder="Enter height">
      `,
  circle: `
        <input type="number" id="radius" placeholder="Enter radius">
      `,
};

// Set default inputs
inputsDiv.innerHTML = inputTemplates[shapeSelect.value];

// Change inputs when shape changes
shapeSelect.addEventListener("change", () => {
  const shape = shapeSelect.value;
  inputsDiv.innerHTML = inputTemplates[shape];
  resultDiv.textContent = "";
});

// Calculate area
calculateBtn.addEventListener("click", () => {
  const shape = shapeSelect.value;
  let shapeObj;

  if (shape === "rectangle") {
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    if (isNaN(width) || isNaN(height)) {
      alert("Please enter valid numbers.");
      return;
    }
    shapeObj = new Rectangle(width, height);
  } else if (shape === "circle") {
    const radius = parseFloat(document.getElementById("radius").value);
    if (isNaN(radius)) {
      alert("Please enter a valid number.");
      return;
    }
    shapeObj = new Circle(radius);
  }

  const area = shapeObj.area();
  resultDiv.innerHTML = `${shapeObj.describe()}<br>Area = ${area}`;
});
