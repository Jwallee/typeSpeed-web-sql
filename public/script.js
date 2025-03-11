// DOM elements
const quoteDisplay = document.getElementById("quote");
const inputText = document.getElementById("input-text");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart");

// Batch of quotes to choose from (MAKE THIS SEPPARATE FILE?)
let quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Hello! Here is my test sentence.",
    "I like to type a lot, do you like to type a lot?",
    "Typing speed takes practice, practice, practice."
];

// Clock and Quote
let startTime, timerInterval;
let currentQuote = "";

// Load a new quote on page load
function loadQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)]; // Random quote selection
    quoteDisplay.innerText = currentQuote;
    inputText.value = ""; // Clear text area
    inputText.focus();
    resultDisplay.innerText = "";
    timerDisplay.innerText = "Time: 0s";
    startTime = null;
    clearInterval(timerInterval);
}

// Start timer when typing begins
inputText.addEventListener("input", startTimer);

function startTimer() {
    if (!startTime) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// Update Timer per second
function updateTimer() {
    let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    timerDisplay.innerText = `Time: ${elapsedTime}s`;
}

// Listen for user typing and check progress
inputText.addEventListener("input", checkTyping);

function checkTyping() {
    let userInput = inputText.value;
    
    // Compare user input with actual quote
    if ((userInput.length) === (currentQuote.length)) {
        clearInterval(timerInterval); // Stop the timer
        calculateResults();
    }
}

// Updating best WPM in database if new record set
async function updateBestWPM(newWPM) {
    if (!currentUser) return;

    let response = await fetch("http://localhost:5001/update-wpm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUser, newWPM })
    });

    let data = await response.json();

    if (data.best_wpm !== undefined) {
        localStorage.setItem("bestWPM", data.best_wpm);
        welcomeMsg.innerText = `Welcome, ${currentUser}! Best WPM: ${data.best_wpm}`;
    }
}

// Calculating WPM
async function calculateResults() {
    let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    let wordCount = currentQuote.split(" ").length;
    let wpm = Math.round((wordCount / elapsedTime) * 60);

    resultDisplay.innerHTML = `WPM: ${wpm}`;

    // Grabbing saved best WPM score
    let response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUser, password: "dummy" }) // Dummy password just to get best WPM
    });

    let data = await response.json();
    let bestWPM = data.best_wpm || 0;

    if (wpm > bestWPM) {
        updateBestWPM(wpm);
    }
}


// Restart the test when restart clicked
restartBtn.addEventListener("click", loadQuote);

// Load the first quote when the page loads
loadQuote();