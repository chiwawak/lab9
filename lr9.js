let userName = "User";
let userTotalScore = 0;
let compTotalScore = 0;
let currentAttempt = 0;
const maxAttempts = 3;

const cardsDeck = [
    { name: "6", value: 6, img: "img6.png" },
    { name: "7", value: 7, img: "img7.png" },
    { name: "8", value: 8, img: "img8.png" },
    { name: "9", value: 9, img: "img9.png" },
    { name: "10", value: 10, img: "img10.png" },
    { name: "Валет", value: 2, img: "jack.png" },
    { name: "Дама", value: 3, img: "queen.png" },
    { name: "Король", value: 4, img: "king.png" },
    { name: "Туз", value: 11, img: "ace.png" }
];

function getRandomCard() {
    return cardsDeck[Math.floor(Math.random() * cardsDeck.length)];
}

function showWinnerBanner(text, bgColor) {
    const resultMessageEl = document.getElementById("result-message");

    resultMessageEl.textContent = text;

    resultMessageEl.style.display = "block";
    resultMessageEl.style.padding = "15px 30px";
    resultMessageEl.style.marginTop = "20px";
    resultMessageEl.style.borderRadius = "10px";
    resultMessageEl.style.backgroundColor = bgColor;
    resultMessageEl.style.color = "#ffffff";
    resultMessageEl.style.fontSize = "24px";
    resultMessageEl.style.fontWeight = "bold";
    resultMessageEl.style.textAlign = "center";
    resultMessageEl.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
}

function handleGenerateClick() {
    if (currentAttempt >= maxAttempts) {
        return;
    }

    const userScoreEl = document.getElementById("user-score");
    const userCardImg = document.getElementById("user-card-img");
    const compScoreEl = document.getElementById("comp-score");
    const compCardImg = document.getElementById("comp-card-img");
    const attemptCounterEl = document.getElementById("attempt-counter");
    const generateBtn = document.getElementById("generate-btn");

    currentAttempt++;
    attemptCounterEl.textContent = `Спроба ${currentAttempt} з ${maxAttempts}`;

    const userCard = getRandomCard();
    const compCard = getRandomCard();

    userTotalScore += userCard.value;
    compTotalScore += compCard.value;

    userScoreEl.textContent = userTotalScore;
    compScoreEl.textContent = compTotalScore;

    userCardImg.src = userCard.img;
    userCardImg.alt = `${userCard.name} (${userCard.value} очок)`;

    compCardImg.src = compCard.img;
    compCardImg.alt = `${compCard.name} (${compCard.value} очок)`;

    if (currentAttempt === maxAttempts) {
        generateBtn.disabled = true;
        generateBtn.style.opacity = "0.5";
        generateBtn.style.cursor = "not-allowed";

        if (userTotalScore > compTotalScore) {
            showWinnerBanner(`Переміг ${userName}! (${userTotalScore} : ${compTotalScore})`, "#00a800");
        } else if (compTotalScore > userTotalScore) {
            showWinnerBanner(`Переміг Computer! (${compTotalScore} : ${userTotalScore})`, "#d40000");
        } else {
            showWinnerBanner(`Нічия! (${userTotalScore} : ${compTotalScore})`, "#ffa500");
        }
    }
}

function initGame() {
    const userNameEl = document.getElementById("user-name");
    const generateBtn = document.getElementById("generate-btn");

    const inputName = prompt("Введіть ваше ім'я:", "User");

    userName = inputName && inputName.trim() ? inputName.trim() : "User";

    userNameEl.textContent = userName;

    generateBtn.addEventListener("click", handleGenerateClick);
}

document.addEventListener("DOMContentLoaded", initGame);