const coffee = document.getElementById('cup');
const steam = document.querySelectorAll('.steam');
const questionsContainer = document.getElementById('questions-container'); // Renamed
const nextButton = document.getElementById('nextButton');
const gameOver = document.getElementById('gameOver');
const restartButton = document.getElementById('restartButton');
const questionsArray = [
  "Какой кофеин содержит кофе?",
  "Что такое эспрессо?",
  "В чем разница между капучино и латте?",
  "Что такое флэт уайты?",
  "Какие виды зерен кофе вы знаете?"
];
let startTime = null;
let questionIndex = 0;
let gameStarted = false;
let answers = [];

coffee.addEventListener('click', startGame);

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    gameOver.style.display = 'none'; // Скрыть окно проигрыша
    startTime = Date.now();

    // Correct way to show steam (opacity needs to be a string '1')
    steam.forEach(element => element.style.opacity = '1');  //Fixed this line!

    // Make the questions visible immediately
    displayQuestions();
    questionsContainer.style.display = 'block'; //Show the quiz container.  Fix.

    // Set a timeout to check time after 2 minutes
    setTimeout(checkTime, 120000);
  }
}


function checkTime() {
  if (questionIndex < questionsArray.length) {
    showGameOver();
  }
}

function showQuestions() {  // Removed this function, no longer used
  // Removed the hiding of the steam since the steam already has a timer
  questionsContainer.style.display = 'block';   //Removed the style
  nextButton.style.display = 'block';   //Removed the style
  gameStarted = false; //This shouldn't be here
}

function displayQuestions() {
  //Clear any previous answers to make the game playable multiple times
  for (let i = 0; i < questionsArray.length; i++) {
    const questionId = 'question' + (i + 1);
    const questionElement = document.getElementById(questionId);

    if (questionElement) {
      questionElement.textContent = questionsArray[i];
    } else {
      console.error("Question element not found: " + questionId);
    }
  }
}


function showGameOver() {
  gameOver.style.display = 'flex';
}

nextButton.addEventListener('click', () => {
  // Here add the logic for verifying answers
  // This needs to happen *before* you reset the game

  // Increment question index.
  questionIndex++;

  if (questionIndex < questionsArray.length) {
    // Load the next question.
    displayQuestions();
  }
  else{
    console.log("All questions have been answered!")
    // Reset the quiz
    resetGame();
  }
});

restartButton.addEventListener('click', resetGame);

function resetGame() {
  startTime = null;
  questionIndex = 0;
  questionsContainer.style.display = 'none';   //Fixed this style
  nextButton.style.display = 'none';
  steam.forEach(element => element.style.opacity = 0);  // Fixed this style
  gameOver.style.display = 'none';
  gameStarted = false;
  answers = []; // Очистить массив ответов

  //Clear the questions text
  for (let i = 0; i < questionsArray.length; i++) {
    const questionId = 'question' + (i + 1);
    const questionElement = document.getElementById(questionId);

    if (questionElement) {
      questionElement.textContent = "";
    } else {
      console.error("Question element not found: " + questionId);
    }
  }
}
