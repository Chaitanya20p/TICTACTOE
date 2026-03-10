export type Player = 'X' | 'O' | null;
export type GameResult = 'X' | 'O' | 'Draw' | null;
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export const WIN_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function checkWinner(board: string[]): GameResult {
  for (const combo of WIN_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as GameResult;
    }
  }

  if (board.every(cell => cell !== "")) {
    return 'Draw';
  }

  return null;
}

function minimax(board: string[], depth: number, isMaximizing: boolean): number {
  const result = checkWinner(board);
  if (result === 'O') return 10 - depth;
  if (result === 'X') return depth - 10;
  if (result === 'Draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        const score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        const score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export function getBestMove(board: string[], difficulty: Difficulty = 'Hard'): number {
  const availableMoves = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter((val) => val !== null) as number[];

  if (availableMoves.length === 0) return -1;

  if (difficulty === 'Easy') {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  if (difficulty === 'Medium') {
    // 40% chance of making a random move instead of optimal
    if (Math.random() < 0.4) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  }

  let bestScore = -Infinity;
  let move = -1;
  
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      const score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}
