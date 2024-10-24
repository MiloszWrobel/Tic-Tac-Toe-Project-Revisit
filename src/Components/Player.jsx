import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleNameChange(event) {
    const newName = event.target.value;
    if (newName.length <= 15) {
      setPlayerName(newName);
    }
  }

  let playerNameElement = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameElement = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleNameChange}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "save" : "edit"}</button>
    </li>
  );
}
