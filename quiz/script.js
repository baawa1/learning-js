const categoryBtns = document.querySelectorAll(".category-btn");
const startQuiz = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const categoryTitle = document.getElementById("category-title");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const reviewBtn = document.getElementById("review-btn");

// All Quiz Questions
const allQuestions = [
  // Cell Biology
  {
    category: "cell",
    question:
      "Which organelle is responsible for protein synthesis in the cell?",
    options: ["Ribosomes", "Mitochondria", "Golgi apparatus", "Lysosomes"],
    answer: 0,
  },
  {
    category: "cell",
    question: "The cell membrane is primarily composed of which molecules?",
    options: ["Carbohydrates", "Proteins", "Phospholipids", "Nucleic acids"],
    answer: 2,
  },
  {
    category: "cell",
    question: "What is the main function of mitochondria in a cell?",
    options: [
      "Protein synthesis",
      "Energy production",
      "Cellular digestion",
      "Storage of genetic information",
    ],
    answer: 1,
  },
  {
    category: "cell",
    question:
      "Which of the following is NOT a component of the endomembrane system?",
    options: [
      "Endoplasmic reticulum",
      "Golgi apparatus",
      "Mitochondria",
      "Lysosomes",
    ],
    answer: 2,
  },

  // Genetics
  {
    category: "genetics",
    question: "Which of the following is NOT a nucleotide base found in DNA?",
    options: ["Adenine", "Cytosine", "Uracil", "Guanine"],
    answer: 2,
  },
  {
    category: "genetics",
    question:
      "During which phase of mitosis do chromosomes line up at the equator of the cell?",
    options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
    answer: 1,
  },
  {
    category: "genetics",
    question:
      "Mendel's principle of independent assortment applies to genes that are:",
    options: [
      "On the same chromosome and close together",
      "On the same chromosome but far apart",
      "On different chromosomes",
      "All of the above",
    ],
    answer: 2,
  },
  {
    category: "genetics",
    question:
      "Which process creates genetic diversity through the exchange of genetic material between homologous chromosomes?",
    options: ["Mitosis", "Crossing over", "Translation", "Transcription"],
    answer: 1,
  },

  // Ecology
  {
    category: "ecology",
    question:
      "What is the term for all the organisms of the same species in a particular area?",
    options: ["Community", "Ecosystem", "Population", "Biome"],
    answer: 2,
  },
  {
    category: "ecology",
    question:
      "Which of the following is an example of a density-dependent limiting factor?",
    options: [
      "Temperature",
      "Natural disasters",
      "Competition for resources",
      "Seasonal changes",
    ],
    answer: 2,
  },
  {
    category: "ecology",
    question: "What type of organism breaks down dead organic matter?",
    options: [
      "Producer",
      "Primary consumer",
      "Secondary consumer",
      "Decomposer",
    ],
    answer: 3,
  },
  {
    category: "ecology",
    question:
      "The process by which water is lost from plants through evaporation is called:",
    options: ["Respiration", "Photosynthesis", "Transpiration", "Condensation"],
    answer: 2,
  },

  // Human Anatomy
  {
    category: "anatomy",
    question: "Which of the following is NOT a function of the liver?",
    options: [
      "Detoxification",
      "Production of bile",
      "Glucose storage",
      "Production of insulin",
    ],
    answer: 3,
  },
  {
    category: "anatomy",
    question:
      "The sinoatrial (SA) node acts as the natural pacemaker of the heart and is located in the:",
    options: [
      "Left ventricle",
      "Right ventricle",
      "Left atrium",
      "Right atrium",
    ],
    answer: 3,
  },
  {
    category: "anatomy",
    question: "Which of the following is NOT a part of the human brain?",
    options: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Pancreas"],
    answer: 3,
  },
  {
    category: "anatomy",
    question: "What is the main function of red blood cells?",
    options: [
      "Transport oxygen",
      "Fight infection",
      "Form blood clots",
      "Produce antibodies",
    ],
    answer: 0,
  },
];

let category = "all";
let questions = [...allQuestions];
let questionIndex = 0;
let userAnswers = [];
let score = 0;
let progressPercentage = 0;
let reviewAnswers = false;

//get category and set active button class
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    //remove active class
    categoryBtns.forEach((btns) => {
      btns.classList.remove("active");
    });
    //add active class to the clicked btn
    btn.classList.add("active");
    //set category veriable
    category = btn.getAttribute("data-category");
  });
});

// start quiz
startQuiz.addEventListener("click", () => {
  //get question for selected categoy
  if (category === "all") {
    questions = allQuestions;
  } else {
    questions = allQuestions.filter(
      (question) => question.category === category
    );
  }

  //shuffle quiz questions
  shuffleArray(questions);

  //create empty answers
  questions.forEach((question) => {
    userAnswers.push("");
  });

  //render quesitons
  renderQuestion();

  //render category text
  categoryTitle.textContent =
    category.charAt(0).toLocaleUpperCase() + category.slice(1);

  // go to quiz screen
  welcomeScreen.style.display = "none";
  quizScreen.style.display = "block";

  // calculate proogress percentage
  progress();
});

//shuffle quiz questions
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

//render questions
const renderQuestion = () => {
  //render the question
  questionText.textContent = `${questionIndex + 1}. ${
    questions[questionIndex].question
  }`;

  // Add new options
  optionsContainer.innerHTML = "";

  questions[questionIndex].options.forEach((option, i) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;

    // check if this not reviewing the answer
    if (!reviewAnswers) {
      //add event listenner
      optionElement.addEventListener("click", (e) => {
        checkanswer(option, i);
      });
    }

    if (reviewAnswers) {
      //selected answer
      if (
        userAnswers[questionIndex] === i &&
        i === questions[questionIndex].answer
      ) {
        optionElement.classList.add("correct");
      } else if (
        userAnswers[questionIndex] === i &&
        i !== questions[questionIndex].answer
      ) {
        optionElement.classList.add("wrong");
      } else {
      }

      //correct answer
      if (i === questions[questionIndex].answer) {
        console.log(questions[questionIndex].answer);
        optionElement.classList.add("correct");
      }

      const feedbackElement = document.createElement("div");
      feedbackElement.classList.add("option-feedback");
      optionElement.appendChild(feedbackElement);
    }

    //append to the option div
    optionsContainer.appendChild(optionElement);
  });
};

// Check answer
const checkanswer = (option, i) => {
  //push answer into userAnswer array
  userAnswers[questionIndex] = i;

  // add selected class
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach((optionDiv) => {
    optionDiv.classList.remove("selected");

    if (optionDiv.textContent === option) {
      optionDiv.classList.add("selected");
    }
  });
};

//next button
nextBtn.addEventListener("click", () => {
  // change next button text
  if (questionIndex === questions.length - 2) {
    nextBtn.textContent = "See result";
  }
  //check if the question is finiished
  if (questionIndex === questions.length - 1) {
    showresult();
  } else {
    questionIndex++;
    renderQuestion();
  }

  // remove disabled attr from the previous button
  prevBtn.removeAttribute("disabled");

  // calculate proogress percentage
  progress();
});

//previous button
prevBtn.addEventListener("click", () => {
  //check if the question is finiished
  if (questionIndex === 1) {
    prevBtn.setAttribute("disabled", "");
    questionIndex--;
    renderQuestion();
  }

  if (questionIndex === 0) {
  } else {
    questionIndex--;
    renderQuestion();
  }

  //check if the question is finiished
  if (questionIndex < questions.length - 1) {
    nextBtn.textContent = "Next";
  }

  // calculate proogress percentage
  progress();
});

// show result

const showresult = () => {
  if (!reviewAnswers) {
    score = 0;
    questions.forEach((question, i) => {
      if (question.answer === userAnswers[i]) {
        score++;
      }
    });
  }

  //set final score
  finalScore.textContent = `${(score / questions.length) * 100}%`;

  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  // console.log(score);
};

// reset quiz
restartBtn.addEventListener("click", () => {
  category = "all";
  questions = [...allQuestions];
  questionIndex = 0;
  userAnswers = [];
  score = 0;
  reviewAnswers = false;

  //reset category and active button class
  categoryBtns.forEach((btn) => {
    //remove active class
    btn.classList.remove("active");
  });

  //add active class to the clicked btn
  categoryBtns[0].classList.add("active");

  //reset progress bar
  progressBar.style.width = `0%`;

  // show start screen
  quizScreen.style.display = "none";
  resultScreen.style.display = "none";
  welcomeScreen.style.display = "block";

  //  disabled the previous button
  prevBtn.setAttribute("disabled", "");

  // set next button text
  nextBtn.textContent = "Next";
});

// progrees bar
const progress = () => {
  progressPercentage = ((questionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
};

// review answer

reviewBtn.addEventListener("click", () => {
  reviewAnswers = true;

  //reset questionIndex
  questionIndex = 0;

  //render quesitons
  renderQuestion();

  // go to quiz screen
  welcomeScreen.style.display = "none";
  resultScreen.style.display = "none";
  quizScreen.style.display = "block";

  // calculate proogress percentage
  progress();

  //  disabled the previous button
  prevBtn.setAttribute("disabled", "");

  // set next button text
  nextBtn.textContent = "Next";
});
