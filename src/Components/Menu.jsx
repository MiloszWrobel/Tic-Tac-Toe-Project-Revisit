export default function Menu({ onSelectMode }) {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <button onClick={() => onSelectMode("2player")}>2 Player</button>
      <button onClick={() => onSelectMode("ai")}>Face the AI</button>
    </div>
  );
}
