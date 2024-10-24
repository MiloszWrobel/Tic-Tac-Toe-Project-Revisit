import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ currentActivePlayer, handleSquare }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(row, col) {
    const newGameBoard = gameBoard.map((rowArray) => [...rowArray]);

    newGameBoard[row][col] = currentActivePlayer;

    setGameBoard(newGameBoard);

    handleSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
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
