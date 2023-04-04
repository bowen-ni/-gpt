const board = document.getElementById('board');
const message = document.getElementById('message');
const size = 15; // 棋盘大小，行列都为 15
const squares = [];
const lines = [];

let isBlack = true; // 是否黑子先手
let isGameOver = false; // 游戏是否结束
let winner = null; // 获胜者

// 创建棋盘
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        board.appendChild(square);
        squares.push(square);
    }
}

// 创建网格线
for (let i = 1; i < size; i++) {
    const horizontalLine = document.createElement('div');
    horizontalLine.classList.add('line', 'horizontal');
    horizontalLine.style.top = `${(100 / (size - 1)) * i}%`;
    board.appendChild(horizontalLine);
    lines.push(horizontalLine);

    const verticalLine = document.createElement('div');
    verticalLine.classList.add('line', 'vertical');
    verticalLine.style.left = `${(100 / (size - 1)) * i}%`;
    board.appendChild(verticalLine);
    lines.push(verticalLine);
}

// 设置棋子
squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (isGameOver || square.classList.length > 1) {
            return;
        }
        const color = isBlack ? 'black' : 'white';
        square.classList.add('circle', color);
        isBlack = !isBlack;
        checkWinner(index);
    })
})

// 检查是否有玩家获胜
function checkWinner(index) {
    const row = Math.floor(index / size);
    const col = index % size;
    const color = isBlack ? 'black' : 'white';

    // 检查横向连续
    let count = 1;
    let i = col - 1;
    while (i >= 0 && squares[row * size + i].classList.contains(color)) {
        count++;
        i--;
    }
    i = col + 1;
    while (i < size && squares[row * size + i].classList.contains(color)) {
        count++;
        i++;
    }
    if (count >= 5) {
        isGameOver = true;
        winner = color;
    }

    // 检查纵向连续
    count = 1;
    i = row - 1;
    while (i >= 0 && squares[i * size + col].classList.contains(color)) {
        count++;
        i--;
    }
    i = row + 1;
    while (i < size && squares[i * size + col].classList.contains(color)) {
        count++;
        i++;
    }
    if (count >= 5) {
        isGameOver = true;
        winner = color;
    }

    // 检查斜向连续
    count = 1;
    i = row - 1;
    let j = col - 1;
    while (i >= 0 && j >= 0 && squares[i * size + j].classList.contains(color)) {
        count++;
        i--;
        j--;
    }
    i = row + 1;
    j = col + 1;
    }