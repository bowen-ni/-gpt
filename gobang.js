const canvas = document.getElementById('chess');
const context = canvas.getContext('2d');

const scaleFactor = 1.5;
const cellSize = 30 * scaleFactor;
const lineWidth = 1;
const pieceRadius = 13 * scaleFactor;
const history = [];

const startGameButton = document.getElementById('startGame');
const restartGameButton = document.getElementById('restartGame');

const resultModal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const closeModal = document.getElementById('closeModal');

function showWinner(winner) {
    resultText.textContent = winner === 1 ? '黑子获胜！' : '白子获胜！';
    resultModal.style.display = 'block';
}

closeModal.onclick = function () {
    resultModal.style.display = 'none';
};

const chessboard = [];
let me = true;
let gameStarted = false;

for (let i = 0; i < 15; i++) {
    chessboard[i] = [];
    for (let j = 0; j < 15; j++) {
        chessboard[i][j] = 0;
    }
}

canvas.onclick = function (e) {
    if (!gameStarted) return;

    const x = e.offsetX;
    const y = e.offsetY;
    const i = Math.floor(x / cellSize);
    const j = Math.floor(y / cellSize);

    if (chessboard[i][j] === 0) {
        drawChess(i, j, me);
        chessboard[i][j] = me ? 1 : 2;
        history.push(JSON.parse(JSON.stringify(chessboard)));

        drawChess(i, j, me);
        chessboard[i][j] = me ? 1 : 2;
        if (checkWin(i, j, chessboard[i][j])) {
            gameStarted = false;
            showWinner(chessboard[i][j]);
        } else {
            me = !me;
        }
    }
};

function undo() {
    if (history.length === 0) {
        alert('无法悔棋！');
        return;
    }

    chessboard = history.pop();
    drawChessBoard();
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            if (chessboard[i][j] !== 0) {
                drawChess(i, j, chessboard[i][j] === 1);
            }
        }
    }
    me = !me;
}


function checkWin(i, j, currentPlayer) {
    const directions = [
        [[0, 1], [0, -1]],
        [[1, 0], [-1, 0]],
        [[1, 1], [-1, -1]],
        [[-1, 1], [1, -1]]
    ];

    for (const direction of directions) {
        let count = 1;

        for (const [dx, dy] of direction) {
            let x = i + dx;
            let y = j + dy;

            while (x >= 0 && x < 15 && y >= 0 && y < 15 && chessboard[x][y] === currentPlayer) {
                count++;
                x += dx;
                y += dy;
            }
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}

function drawChess(i, j, me) {
    context.beginPath();
    context.arc(cellSize / 2 + i * cellSize, cellSize / 2 + j * cellSize, pieceRadius, 0, 2 * Math.PI);
    context.closePath();

    const gradient = context.createRadialGradient(
        cellSize / 2 + i * cellSize + 2,
        cellSize / 2 + j * cellSize - 2,
        pieceRadius,
        cellSize / 2 + i * cellSize + 2,
        cellSize / 2 + j * cellSize - 2,
        0
    );
    if (me) {
        gradient.addColorStop(0, '#0A0A0A');
        gradient.addColorStop(1, '#636766');
    } else {
        gradient.addColorStop(0, '#D1D1D1');
        gradient.addColorStop(1, '#F9F9F9');
    }
    context.fillStyle = gradient;
    context.fill();
}

function drawChessBoard() {
    context.fillStyle = '#DEB887'; // Burly Wood
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 15; i++) {
        context.strokeStyle = '#000000'; // 黑色网格线
        context.beginPath();
        context.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
        context.lineTo(cellSize / 2 + i * cellSize, canvas.height - cellSize / 2);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
        context.lineTo(canvas.width - cellSize / 2, cellSize / 2 + i * cellSize);
        context.closePath();
        context.stroke();
    }
}

startGameButton.onclick = function () {
    gameStarted = true;
};
restartGameButton.onclick = function () {
    gameStarted = false;
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            chessboard[i][j] = 0;
        }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawChessBoard();
};

drawChessBoard();
