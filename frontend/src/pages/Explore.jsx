import React, { useCallback, useEffect, useState } from "react";
import { AlertCircle, Compass, Gamepad2, Shuffle } from "lucide-react";
import api from "../services/api";

function ExploreCard({ game }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(game.image) && !imageFailed;
  const genres = game.genre ? game.genre.split(", ").slice(0, 2) : [];

  return (
    <article className="dashboard-game-card explore-card">
      <div className="dashboard-game-art">
        {hasImage ? (
          <img
            src={game.image}
            alt={`Capa de ${game.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="dashboard-game-no-art">
            <Gamepad2 size={34} />
            <span>Sem capa disponível</span>
          </div>
        )}
        {game.releaseYear && (
          <span className="dashboard-game-status">{game.releaseYear}</span>
        )}
      </div>
      <div className="dashboard-game-info">
        <h3 title={game.title}>{game.title}</h3>
        <p>{genres.join(" · ") || "Gênero não informado"}</p>
        {game.rating ? (
          <span className="dashboard-game-rating">★ {game.rating}/5</span>
        ) : null}
      </div>
    </article>
  );
}

function Explore() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadGames = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/games/explore");
      setGames(response.data?.results || []);
    } catch (err) {
      setGames([]);
      setError(
        err.response?.data?.message ||
          "Não foi possível carregar o catálogo. Confira se a API está funcionando."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  return (
    <main className="dashboard-page">
      <section className="dashboard-content explore-content">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-kicker">
              <Compass size={13} /> DESCOBERTAS
            </span>
            <h2>Explorar catálogo</h2>
            <p>
              Uma seleção aleatória de jogos para você descobrir. Em breve: os
              mais bem avaliados do GameHub.
            </p>
          </div>
          <button
            type="button"
            className="dashboard-button dashboard-button-primary"
            onClick={loadGames}
            disabled={loading}
          >
            <Shuffle size={16} /> {loading ? "Carregando..." : "Sortear outros"}
          </button>
        </div>

        {error && (
          <div className="dashboard-notice" role="alert">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {loading ? (
          <div className="dashboard-empty-state">Buscando jogos...</div>
        ) : games.length ? (
          <div className="dashboard-game-grid">
            {games.map((game) => (
              <ExploreCard key={game.rawgId} game={game} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="dashboard-empty-state">
              Nenhum jogo encontrado. Tente sortear novamente.
            </div>
          )
        )}

        <p className="rawg-attribution explore-attribution">
          Dados e imagens de jogos fornecidos por{" "}
          <a href="https://rawg.io/" target="_blank" rel="noreferrer">
            RAWG
          </a>
          .
        </p>
      </section>
    </main>
  );
}

export default Explore;