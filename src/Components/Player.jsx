import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleClick() {
    setIsEditing((editing) => !editing);
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }
  let playerNameElement = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameElement = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleNameChange}
      ></input>
    );
  }

  return (
    <li>
      <span className="player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button on onClick={handleClick}>
        {isEditing ? "save" : "edit"}
      </button>
    </li>
  );
}
