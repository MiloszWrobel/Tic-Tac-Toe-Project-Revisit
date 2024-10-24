import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol="X" />
          <Player name="Player 2" symbol="O" />
        </ol>
        <GameBoard
          currentActivePlayer={activePlayer}
          handleSquare={handleSelectSquare}
        />
      </div>
    </main>
  );
}

export default App;
