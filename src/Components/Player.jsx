import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing(() => !isEditing);
  }

  let playerName = <span className="player-name">{name}</span>;

  if (isEditing) {
    playerName = <input></input>;
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button on onClick={handleClick}>
        edit
      </button>
    </li>
  );
}
