import { useState } from "react";

export default function Menu({ onSelectMode }) {
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);

  const handleAiButtonClick = () => {
    setShowDifficultyDropdown(!showDifficultyDropdown);
  };

  const handleDifficultySelect = (difficulty) => {
    onSelectMode("ai", difficulty);
    setShowDifficultyDropdown(false);
  };

  return (
    <div>
      <button onClick={() => onSelectMode("2player")} className="common-button">
        2 Player
      </button>

      <button onClick={handleAiButtonClick} className="common-button">
        Face the AI
      </button>

      {showDifficultyDropdown && (
        <div>
          <button
            onClick={() => handleDifficultySelect("easy")}
            className="common-button"
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultySelect("medium")}
            className="common-button"
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultySelect("hard")}
            className="common-button"
          >
            Hard
          </button>
        </div>
      )}
    </div>
  );
}
