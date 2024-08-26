const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'x';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWin()) {
        statusDiv.textContent = `${currentPlayer.toUpperCase()} wins!`;
        statusDiv.classList.add('winner');
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        statusDiv.textContent = 'It\'s a draw!';
        statusDiv.classList.add('draw');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    statusDiv.textContent = `${currentPlayer.toUpperCase()}'s turn`;
    statusDiv.classList.remove('winner', 'draw');
}

function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    gameActive = true;
    statusDiv.textContent = "X's turn";
    statusDiv.classList.remove('winner', 'draw');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
