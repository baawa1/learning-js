document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const welcomeScreen = document.getElementById("welcome-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");
  const startBtn = document.getElementById("start-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const reviewBtn = document.getElementById("review-btn");
  const progressBar = document.getElementById("progress-bar");
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options-container");
  const finalScore = document.getElementById("final-score");
  const resultMessage = document.getElementById("result-message");
  const categoryBtns = document.querySelectorAll(".category-btn");
  const categoryTitle = document.getElementById("category-title");

  // Quiz State Variables
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];
  let selectedCategory = "all";
  let quizQuestions = [];

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
      options: [
        "Respiration",
        "Photosynthesis",
        "Transpiration",
        "Condensation",
      ],
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

  // Event Listeners
  startBtn.addEventListener("click", startQuiz);
  prevBtn.addEventListener("click", showPreviousQuestion);
  nextBtn.addEventListener("click", handleNextButton);
  restartBtn.addEventListener("click", restartQuiz);
  reviewBtn.addEventListener("click", reviewAnswers);

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryBtns.forEach((button) => button.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");
      // Update selected category
      selectedCategory = btn.dataset.category;
      // Update category title
      categoryTitle.textContent = btn.textContent;
    });
  });

  // Start Quiz Function
  function startQuiz() {
    // Filter questions based on selected category
    if (selectedCategory === "all") {
      quizQuestions = [...allQuestions];
    } else {
      quizQuestions = allQuestions.filter(
        (q) => q.category === selectedCategory
      );
    }

    // Shuffle questions
    quizQuestions = shuffleArray(quizQuestions);

    // Initialize quiz state
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = Array(quizQuestions.length).fill(null);

    // Update UI
    welcomeScreen.classList.remove("active");
    quizScreen.classList.add("active");

    // Show first question
    showQuestion(currentQuestionIndex);
    updateProgress();
  }

  // Show Question Function
  function showQuestion(index) {
    const question = quizQuestions[index];

    // Update question text
    questionElement.textContent = question.question;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Add new options
    question.options.forEach((option, i) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.textContent = option;

      // Check if this option was previously selected
      if (userAnswers[index] === i) {
        optionElement.classList.add("selected");
      }

      // Add event listener to option
      optionElement.addEventListener("click", () => selectOption(i));

      optionsContainer.appendChild(optionElement);
    });

    states;
    prevBtn.disabled = index === 0;
    nextBtn.textContent =
      index === quizQuestions.length - 1 ? "Finish" : "Next";
  }

  // Select Option Function
  function selectOption(optionIndex) {
    // Update user answers
    userAnswers[currentQuestionIndex] = optionIndex;

    // Update UI
    const options = optionsContainer.querySelectorAll(".option");
    options.forEach((option, i) => {
      if (i === optionIndex) {
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }
    });
  }

  // Show Previous Question
  function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
      updateProgress();
    }
  }

  // Handle Next Button
  function handleNextButton() {
    if (currentQuestionIndex === quizQuestions.length - 1) {
      // Last question, finish quiz
      finishQuiz();
    } else {
      // Go to next question
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
      updateProgress();
    }
  }

  // Update Progress Bar
  function updateProgress() {
    const progressPercentage =
      ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercentage + "%";
  }

  // Finish Quiz
  function finishQuiz() {
    // Calculate score
    calculateScore();

    // Update result screen
    finalScore.textContent =
      Math.round((score / quizQuestions.length) * 100) + "%";

    // Set result message based on score
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) {
      resultMessage.textContent =
        "Excellent! You have a deep understanding of biology!";
    } else if (percentage >= 70) {
      resultMessage.textContent =
        "Great job! You have a good grasp of biology concepts.";
    } else if (percentage >= 50) {
      resultMessage.textContent =
        "Good effort! Keep studying to improve your knowledge.";
    } else {
      resultMessage.textContent =
        "You might need more practice. Don't give up!";
    }

    // Show result screen
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
  }

  // Calculate Score
  function calculateScore() {
    score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      if (userAnswers[i] === quizQuestions[i].answer) {
        score++;
      }
    }
  }

  // Review Answers
  function reviewAnswers() {
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    // Show first question with answers
    currentQuestionIndex = 0;
    showQuestionWithAnswers(currentQuestionIndex);

    // Change next button text
    nextBtn.textContent =
      currentQuestionIndex === quizQuestions.length - 1 ? "Finish" : "Next";

    // Update progress bar
    updateProgress();
  }

  // Show Question with Answers
  function showQuestionWithAnswers(index) {
    const question = quizQuestions[index];

    // Update question text
    questionElement.textContent = question.question;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Add options with correct/wrong indicators
    question.options.forEach((option, i) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");

      // Check if this is the correct answer
      if (i === question.answer) {
        optionElement.classList.add("correct");
      }
      // Check if this was the user's answer and it was wrong
      else if (userAnswers[index] === i) {
        optionElement.classList.add("wrong");
      }

      // Add text content
      optionElement.textContent = option;

      // Add feedback indicator
      if (i === question.answer || userAnswers[index] === i) {
        const feedbackElement = document.createElement("div");
        feedbackElement.classList.add("option-feedback");
        optionElement.appendChild(feedbackElement);
      }

      optionsContainer.appendChild(optionElement);
    });

    // Disable option clicks during review
    const options = optionsContainer.querySelectorAll(".option");
    options.forEach((option) => {
      option.style.cursor = "default";
    });

    // Update button

    // Update button states
    prevBtn.disabled = index === 0;
    nextBtn.textContent =
      index === quizQuestions.length - 1 ? "Finish" : "Next";
  }

  // Restart Quiz
  function restartQuiz() {
    // Reset to welcome screen
    resultScreen.classList.remove("active");
    welcomeScreen.classList.add("active");

    // Reset progress bar
    progressBar.style.width = "0%";
  }

  // Shuffle Array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});
