import { useEffect } from "react";
import { WINNING_COMBINATIONS } from "../winning-combinations";

export default function AiGameBoard({ handleSquare, board, difficulty }) {
  useEffect(() => {
    const lastTurn = board.flat().filter(Boolean).length;

    if (lastTurn % 2 === 1) {
      const aiMoveTimeout = setTimeout(() => {
        if (difficulty === "easy") {
          makeRandomMove();
        } else if (difficulty === "medium") {
          makeMediumMove();
        } else if (difficulty === "hard") {
          makeHardMove();
        }
      }, 500); // Delay for AI's move

      return () => clearTimeout(aiMoveTimeout);
    }
  }, [board, handleSquare, difficulty]);

  // EASY: Random move
  const makeRandomMove = () => {
    const availableSquares = getAvailableSquares(board);
    if (availableSquares.length > 0) {
      const randomSquare =
        availableSquares[Math.floor(Math.random() * availableSquares.length)];
      handleSquare(randomSquare.row, randomSquare.col);
    }
  };

  // MEDIUM: Random move, but block or win if possible
  const makeMediumMove = () => {
    const winningMove = findWinningMove("O"); // AI symbol
    const blockingMove = findWinningMove("X"); // Player symbol

    if (winningMove) {
      handleSquare(winningMove.row, winningMove.column); // Make winning move
    } else if (blockingMove) {
      handleSquare(blockingMove.row, blockingMove.column); // Block player
    } else {
      makeRandomMove(); // Otherwise, make a random move
    }
  };

  // HARD: Optimal move (e.g., Minimax)
  const makeHardMove = () => {
    const bestMove = findOptimalMove(); // Replace with real Minimax implementation
    handleSquare(bestMove.row, bestMove.col);
  };

  // Helper: Get available squares
  const getAvailableSquares = (board) => {
    const availableSquares = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (!board[row][col]) {
          availableSquares.push({ row, col });
        }
      }
    }
    return availableSquares;
  };

  // Helper: Find winning or blocking move
  const findWinningMove = (playerSymbol) => {
    for (let combination of WINNING_COMBINATIONS) {
      const squares = combination.map(({ row, column }) => board[row][column]); // Use 'column' here
      const emptyIndex = squares.indexOf(null);
      const filledSquares = squares.filter((s) => s === playerSymbol).length;

      if (filledSquares === 2 && emptyIndex !== -1) {
        return combination[emptyIndex]; // Return winning/blocking move
      }
    }
    return null;
  };

  // Dummy function for hard difficulty (replace with Minimax)
  const findOptimalMove = () => {
    // Dummy logic: random move for now
    return getAvailableSquares(board)[0];
  };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleSquare(rowIndex, colIndex)}
                  disabled={board[rowIndex][colIndex] ? true : false}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
