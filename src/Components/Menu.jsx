export default function Menu({ onSelectMode }) {
  return (
    <div>
      <button onClick={() => onSelectMode("2player")} className="common-button">
        2 Player
      </button>
      <button onClick={() => onSelectMode("ai")} className="common-button">
        Face the AI
      </button>
    </div>
  );
}
