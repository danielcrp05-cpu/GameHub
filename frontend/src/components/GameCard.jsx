function GameCard({ game, onEdit, onDelete }) {
  return (
    <article>
      {game.image && <img src={game.image} alt={`Capa de ${game.title}`} />}
      <h3>{game.title}</h3>
      <p>{game.genre}</p>
      <p>{game.platform}</p>
      <p>Status: {game.status}</p>
      <p>Nota: {game.rating}/10</p>

      <button onClick={() => onEdit(game)}>Editar</button>
      <button onClick={() => onDelete(game._id)}>Excluir</button>
    </article>
  );
}

export default GameCard;
