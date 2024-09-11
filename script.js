const boardSize = 30;
const board = [];
let currentPlayer = 'black';
let gameOver = false;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

function initBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = null;
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.addEventListener('click', () => makeMove(i, j));
      cell.addEventListener('mouseenter', () => hoverCell(i, j));
      cell.addEventListener('mouseleave', () => leaveCell(i, j));
      boardElement.appendChild(cell);
      board[i][j] = cell;
    }
  }
}

function makeMove(row, col) {
  const qizi = board[row][col].firstElementChild;
  if (gameOver || !qizi.classList.contains(`hover-${currentPlayer}`)) {
    return;
  }

  qizi.classList.remove(`hover-${currentPlayer}`);
  qizi.classList.add(currentPlayer);

  if (checkWin(row, col)) {
    messageElement.textContent = `${currentPlayer === 'black' ? '黑棋' : '白棋'} 胜利!`;
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  messageElement.textContent = `${currentPlayer === 'black' ? '黑棋' : '白棋'}的回合`;
}

function hoverCell(row, col) {
  const qizi = board[row][col].firstElementChild;
  if (!qizi && !gameOver) {
    const qizi = document.createElement('div');
    qizi.className = 'cell';
    qizi.classList.add(`hover-${currentPlayer}`);
    board[row][col].appendChild(qizi);
  }
}

function leaveCell(row, col) {
  const qizi = board[row][col].firstElementChild;
  if (qizi && qizi.classList.contains(`hover-${currentPlayer}`)) {
    board[row][col].innerHTML = '';
  }
}

function checkWin(row, col) {
  return checkDirection(row, col, 1, 0) ||
    checkDirection(row, col, 0, 1) ||
    checkDirection(row, col, 1, 1) ||
    checkDirection(row, col, 1, -1);
}

function checkDirection(row, col, dx, dy) {
  let count = 1;
  count += countStones(row, col, dx, dy);
  count += countStones(row, col, -dx, -dy);
  return count >= 5;
}

function countStones(row, col, dx, dy) {
  let count = 0;
  let x = row + dx;
  let y = col + dy;
  while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y].firstElementChild && board[x][y].firstElementChild.classList.contains(currentPlayer)) {
    count++;
    x += dx;
    y += dy;
  }
  return count;
}

function resetGame() {
  boardElement.innerHTML = '';
  messageElement.textContent = '黑棋的回合';
  currentPlayer = 'black';
  gameOver = false;
  initBoard();
}

initBoard();
