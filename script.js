const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let mode = localStorage.getItem("mode") || "player";

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

statusText.textContent = "Giliran Pemain " + currentPlayer;

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (mode === "ai" && gameActive && currentPlayer === "O") {
        setTimeout(aiMove, 500);
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
        statusText.textContent = "Pemain " + winner + " Menang!";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "Seri!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Giliran Pemain " + currentPlayer;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Giliran Pemain " + currentPlayer;

    cells.forEach(cell => cell.textContent = "");
}

function backToMenu() {
    window.location.href = "menu.html";
}