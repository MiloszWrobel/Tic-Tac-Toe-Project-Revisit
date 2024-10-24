export default function GameOver({ winner, onRestart, onReturnToMenu }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} won</p>}
      {!winner && <p>Draw!</p>}
      <p>
        <button onClick={onRestart}>Restart</button>
        <button onClick={onReturnToMenu}>Back to Menu</button>
      </p>
    </div>
  );
}
