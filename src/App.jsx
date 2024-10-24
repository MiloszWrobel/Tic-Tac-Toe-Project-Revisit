// App.js
import React, { useState } from "react";
import Menu from "./Components/Menu";
import TwoPlayer from "./Components/TwoPlayer";

function App() {
  const [gameMode, setGameMode] = useState("");

  return (
    <>
      {gameMode !== "2player" ? <Menu onSelectMode={setGameMode} /> : null}
      {gameMode === "2player" ? <TwoPlayer /> : null}
    </>
  );
}

export default App;
