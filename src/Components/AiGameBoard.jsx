import { useEffect } from "react";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import Minimax from "./Minimax";

export default function AiGameBoard({ handleSquare, board, difficulty }) {
  const minimax = Minimax(board); // Pass board directly

  useEffect(() => {
    const lastTurn = board.flat().filter(Boolean).length;

    if (lastTurn % 2 === 1) {
      // Check if it's the AI's turn
      const aiMoveTimeout = setTimeout(() => {
        if (difficulty === "easy") {
          makeRandomMove();
        } else if (difficulty === "medium") {
          makeMediumMove();
        } else if (difficulty === "hard") {
          const bestMove = minimax.findOptimalMove(); // Get the best move from Minimax
          if (bestMove) {
            handleSquare(bestMove.row, bestMove.col); // Make the move on the board
          }
        }
      }, 500);

      return () => clearTimeout(aiMoveTimeout);
    }
  }, [board, handleSquare, difficulty, minimax]);

  const makeRandomMove = () => {
    const availableSquares = getAvailableSquares(board);
    if (availableSquares.length > 0) {
      const randomSquare =
        availableSquares[Math.floor(Math.random() * availableSquares.length)];
      handleSquare(randomSquare.row, randomSquare.col);
    }
  };

  const makeMediumMove = () => {
    const winningMove = findWinningMove("O");
    const blockingMove = findWinningMove("X");

    if (winningMove) {
      handleSquare(winningMove.row, winningMove.column);
    } else if (blockingMove) {
      handleSquare(blockingMove.row, blockingMove.column);
    } else {
      makeRandomMove();
    }
  };

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

  const findWinningMove = (playerSymbol) => {
    for (let combination of WINNING_COMBINATIONS) {
      const squares = combination.map(({ row, column }) => board[row][column]);
      const emptyIndex = squares.indexOf(null);
      const filledSquares = squares.filter((s) => s === playerSymbol).length;

      if (filledSquares === 2 && emptyIndex !== -1) {
        return combination[emptyIndex];
      }
    }
    return null;
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
