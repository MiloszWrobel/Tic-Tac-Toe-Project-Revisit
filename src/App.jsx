import React, { useState } from "react";
import Menu from "./Components/Menu";
import TwoPlayer from "./Components/TwoPlayer";
import AiGame from "./Components/AiGame";

function App() {
  const [gameMode, setGameMode] = useState(""); // Track the game mode (2player or ai)
  const [difficulty, setDifficulty] = useState(""); // Track the difficulty level for AI

  // Handle selecting the game mode and (optional) difficulty
  const handleSelectMode = (mode, selectedDifficulty = null) => {
    setGameMode(mode);
    if (mode === "ai" && selectedDifficulty) {
      setDifficulty(selectedDifficulty); // Set difficulty only if AI mode is selected
    }
  };

  const handleReturnToMenu = () => {
    setGameMode("");
    setDifficulty(""); // Reset the difficulty when returning to the menu
  };

  return (
    <>
      {gameMode === "" && (
        <Menu onSelectMode={handleSelectMode} /> // Pass handleSelectMode to Menu
      )}

      {gameMode === "2player" && (
        <TwoPlayer onReturnToMenu={handleReturnToMenu} />
      )}

      {gameMode === "ai" && (
        <AiGame difficulty={difficulty} onReturnToMenu={handleReturnToMenu} />
      )}
    </>
  );
}

export default App;
