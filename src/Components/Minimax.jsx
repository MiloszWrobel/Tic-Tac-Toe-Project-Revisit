import { WINNING_COMBINATIONS } from "../winning-combinations";

const Minimax = (board) => {
  const getAvailableSquares = (currentBoard) => {
    const availableSquares = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (!currentBoard[row][col]) {
          availableSquares.push({ row, col });
        }
      }
    }
    return availableSquares;
  };

  const determineWinner = (currentBoard) => {
    for (let combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        currentBoard[a.row][a.column] &&
        currentBoard[a.row][a.column] === currentBoard[b.row][b.column] &&
        currentBoard[a.row][a.column] === currentBoard[c.row][c.column]
      ) {
        return currentBoard[a.row][a.column];
      }
    }
    return null;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const winner = determineWinner(currentBoard);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (getAvailableSquares(currentBoard).length === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      const availableSquares = getAvailableSquares(currentBoard);

      for (let { row, col } of availableSquares) {
        currentBoard[row][col] = "O";
        const score = minimax(currentBoard, depth + 1, false);
        currentBoard[row][col] = null;
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const availableSquares = getAvailableSquares(currentBoard);

      for (let { row, col } of availableSquares) {
        currentBoard[row][col] = "X";
        const score = minimax(currentBoard, depth + 1, true);
        currentBoard[row][col] = null;
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };

  const findOptimalMove = () => {
    let bestScore = -Infinity;
    let bestMove = null;

    const availableSquares = getAvailableSquares(board);
    for (let { row, col } of availableSquares) {
      board[row][col] = "O";
      const score = minimax(board, 0, false);
      board[row][col] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = { row, col };
      }
    }
    return bestMove;
  };

  return { findOptimalMove };
};

export default Minimax;
