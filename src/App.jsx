import React, { useState } from "react";
import Menu from "./Components/Menu";
import TwoPlayer from "./Components/TwoPlayer";
import AiGame from "./Components/AiGame";

function App() {
  const [gameMode, setGameMode] = useState("");

  const handleReturnToMenu = () => {
    setGameMode("");
  };

  return (
    <>
      {gameMode === "" ? <Menu onSelectMode={setGameMode} /> : undefined}
      {gameMode === "2player" ? (
        <TwoPlayer onReturnToMenu={handleReturnToMenu} />
      ) : undefined}
      {gameMode === "ai" ? (
        <AiGame onReturnToMenu={handleReturnToMenu} />
      ) : undefined}
    </>
  );
}

export default App;
