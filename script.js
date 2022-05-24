const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");

const startOver = document.querySelector(".resultParas");
const newNodes = document.querySelector(".newNodes");

let previousGuesses = [];
let numGuesses = 0;

let randomNumber = parseInt(Math.random() * 100 + 1);
let maxGuesses = 10;

// 1. Adding Eventlistener at click

submit.addEventListener("click", function (e) {

  // This is for prevent the reload beacuse its a form.

  e.preventDefault();

  const guess = parseInt(userInput.value); // containing the input value in guess variable.

  validateGuess(guess);
});

function validateGuess(guess) {

  previousGuesses.push(guess);

  // Game over if condition satisfies

  if (previousGuesses.length === maxGuesses) {  
    displayGuesses(guess);
    displayMsg(`Game Over! Number was ${randomNumber}`);
    endGame();
  }
  else {
    displayGuesses(guess);
    checkGuess(guess);
  }
}

function displayGuesses(guess) {

  // pushing the guessed value in array sothat we remember the previous guess value

  guessSlot.innerHTML += `${guess} `;

  // Making input as empty so that every time we can enter new number

  userInput.value = "";
  numGuesses++;

  let remainingGuesses = maxGuesses - numGuesses;

  // Checking remaning no. of guesses

  if (remainingGuesses < 0) {
    remainingGuesses = 0;
  }

  // It will provide the remaing no. of guesess

  remaining.innerHTML = remainingGuesses;
}

// Codition checking 

function checkGuess(guess) {

  if (guess === randomNumber) {
    displayMsg("You guessed correctly!");
    endGame();
  } 
  else if (guess < randomNumber) {
    displayMsg("Too low! Try a higher number");
  } 
  else {
    displayMsg("Too High! Try a smaller number");
  }
}

// Popup message to show about the number.

function displayMsg(message) {
  newNodes.innerHTML = `<h1>${message}</h1>`;
}

// Creating node

const pEl = document.createElement("p");

// Endgame function

function endGame() {
  userInput.value = "";
  pEl.classList.add("button");
  pEl.style.cursor = "pointer";
  pEl.innerHTML = `<h1 onclick="newGame()" id="newGame">Start New Game</h1>`;

  startOver.append(pEl);

  // unabling to take input and submit.

  userInput.disabled = true;
  submit.disabled = true;

  // Automatic reloading with new game after Some time

  setTimeout(newGame, 5000);
}

// Reloading function

function newGame() {
  location.reload();
}
