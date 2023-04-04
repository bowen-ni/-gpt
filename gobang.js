const board = document.getElementById("board");
let currentPlayer = "black";

function createBoard() {
    for (let i = 0; i < 225; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    if (!cell.classList.contains("black") && !cell.classList.contains("white")) {
        cell.classList.add(currentPlayer);
        currentPlayer = currentPlayer === "black" ? "white" : "black";
    }
}

createBoard();
