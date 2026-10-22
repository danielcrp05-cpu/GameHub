import React, { useState } from "react";

function GameCard({ game, onEdit, onDelete }) {
  const [imageFailed, setImageFailed] = useState(false);

  const genres = Array.isArray(game.genre)
    ? game.genre
    : game.genre
      ? [game.genre]
      : [];

  const platforms = Array.isArray(game.platform)
    ? game.platform
    : game.platform
      ? [game.platform]
      : [];

  const image = game.image || game.imageUrl || "";
  const hasImage = Boolean(image) && !imageFailed;

  return (
    <article className="game-card">
      <div className="game-cover">
        {hasImage ? (
          <img
            src={image}
            alt={`Capa de ${game.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="game-cover-placeholder">
            <span aria-hidden="true">🎮</span>
            <span>{image ? "Não foi possível carregar a capa" : "Sem capa cadastrada"}</span>
          </div>
        )}

        <div className="cover-gradient" />

        {game.rating !== undefined && game.rating !== null && game.rating !== "" && (
          <span className="game-score">
            ★ {game.rating}/10
          </span>
        )}

        {genres.length > 0 && (
          <div className="game-genre-tags">
            {genres.slice(0, 2).map((genre) => (
              <span className="game-genre-tag" key={genre}>
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="game-info">
        <div className="game-title-row">
          <h3 title={game.title}>{game.title}</h3>
          {game.releaseYear && (
            <span className="game-year">{game.releaseYear}</span>
          )}
        </div>

        <p className="game-description">
          {game.description || "Nenhuma descrição cadastrada."}
        </p>

        <div className="game-meta">
          <span className="game-platform">
            <span aria-hidden="true">▣</span>
            {platforms.length
              ? platforms.join(" / ")
              : "Plataforma não informada"}
          </span>

          {game.status && (
            <span className="game-status">{game.status}</span>
          )}
        </div>

        <div className="game-card-actions">
          <button
            type="button"
            className="button-secondary card-action"
            onClick={() => onEdit?.(game)}
          >
            Editar
          </button>

          <button
            type="button"
            className="button-danger card-action"
            onClick={() => onDelete?.(game._id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}

export default GameCard;