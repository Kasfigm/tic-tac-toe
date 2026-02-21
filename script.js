const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

statusText.textContent = "Giliran Pemain " + currentPlayer;

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
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