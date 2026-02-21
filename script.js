const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let mode = localStorage.getItem("mode") || "player";

let scoreX = 0;
let scoreO = 0;

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

statusText.textContent = "Giliran Pemain X";
updateScore();

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (mode === "ai" && gameActive && currentPlayer === "O") {
        setTimeout(aiMove, 400);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    checkWinner();
}

function aiMove() {
    let emptyCells = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(val => val !== null);

    if (emptyCells.length === 0) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");
}

function checkWinner() {
    let winner = null;

    winConditions.forEach(condition => {
        const [a,b,c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
        }
    });

    if (winner) {

        // Semua mode dapat poin
        if (winner === "X") {
            scoreX++;
        } else {
            scoreO++;
        }

        updateScore();

        setTimeout(() => {
            resetGame();
        }, 800);

        return;
    }

    if (!board.includes("")) {
        setTimeout(() => {
            resetGame();
        }, 800);
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Giliran Pemain " + currentPlayer;
}

function updateScore() {
    scoreOText.style.display = "block";

    if (mode === "ai") {
        scoreXText.textContent = "Player (X): " + scoreX;
        scoreOText.textContent = "AI (O): " + scoreO;
    } else {
        scoreXText.textContent = "Player X: " + scoreX;
        scoreOText.textContent = "Player O: " + scoreO;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Giliran Pemain X";

    cells.forEach(cell => cell.textContent = "");
}

function backToMenu() {
    window.location.href = "index.html";
}