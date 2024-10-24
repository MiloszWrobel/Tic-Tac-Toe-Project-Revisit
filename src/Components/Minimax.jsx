import { WINNING_COMBINATIONS } from "../winning-combinations";

// Minimax algorithm to find the optimal move for the AI
const Minimax = (board) => {
  // Function to check available squares
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

  // Function to determine if there is a winner
  const determineWinner = (currentBoard) => {
    for (let combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        currentBoard[a.row][a.column] &&
        currentBoard[a.row][a.column] === currentBoard[b.row][b.column] &&
        currentBoard[a.row][a.column] === currentBoard[c.row][c.column]
      ) {
        return currentBoard[a.row][a.column]; // Returns 'X' or 'O'
      }
    }
    return null; // No winner yet
  };

  // Minimax function to calculate the best score
  const minimax = (currentBoard, depth, isMaximizing) => {
    const winner = determineWinner(currentBoard);
    if (winner === "O") return 10 - depth; // AI wins
    if (winner === "X") return depth - 10; // Player wins
    if (getAvailableSquares(currentBoard).length === 0) return 0; // Draw

    if (isMaximizing) {
      let bestScore = -Infinity;
      const availableSquares = getAvailableSquares(currentBoard);

      for (let { row, col } of availableSquares) {
        currentBoard[row][col] = "O"; // AI's move
        const score = minimax(currentBoard, depth + 1, false);
        currentBoard[row][col] = null; // Undo move
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const availableSquares = getAvailableSquares(currentBoard);

      for (let { row, col } of availableSquares) {
        currentBoard[row][col] = "X"; // Player's move
        const score = minimax(currentBoard, depth + 1, true);
        currentBoard[row][col] = null; // Undo move
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };

  // Function to find the best move for the AI
  const findOptimalMove = () => {
    let bestScore = -Infinity;
    let bestMove = null;

    const availableSquares = getAvailableSquares(board);
    for (let { row, col } of availableSquares) {
      board[row][col] = "O"; // AI makes its move
      const score = minimax(board, 0, false); // Minimax returns score
      board[row][col] = null; // Undo the move

      if (score > bestScore) {
        bestScore = score; // Update best score
        bestMove = { row, col }; // Update best move
      }
    }
    return bestMove; // Return the optimal move for the AI
  };

  return { findOptimalMove };
};

export default Minimax;
