import { useEffect } from "react";

export default function AiGameBoard({ handleSquare, board }) {
  useEffect(() => {
    // Check if the last turn was made by "X"
    const lastTurn = board.flat().filter(Boolean).length; // Count of filled squares
    if (lastTurn % 2 === 1) {
      // If odd, then "X" just played, so it's "O"'s turn
      // Gather all available squares
      const availableSquares = [];

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (!board[row][col]) {
            availableSquares.push({ row, col });
          }
        }
      }

      // If there are available squares, pick one at random
      if (availableSquares.length > 0) {
        const randomSquare =
          availableSquares[Math.floor(Math.random() * availableSquares.length)];
        // Trigger the square selection via the handleSquare function
        handleSquare(randomSquare.row, randomSquare.col);
      }
    }
  }, [board, handleSquare]);

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
