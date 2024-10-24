import React, { useState } from "react";
import Menu from "./Components/Menu";
import TwoPlayer from "./Components/TwoPlayer";

function App() {
  const [gameMode, setGameMode] = useState("");

  const handleReturnToMenu = () => {
    setGameMode("");
  };

  return (
    <>
      {gameMode !== "2player" ? <Menu onSelectMode={setGameMode} /> : null}
      {gameMode === "2player" ? (
        <TwoPlayer onReturnToMenu={handleReturnToMenu} />
      ) : null}
    </>
  );
}

export default App;
