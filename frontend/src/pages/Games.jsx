import React, { useEffect, useMemo, useState } from "react";
import GameCard from "../components/GameCard";
import GameForm from "../components/GameForm";
import api from "../services/api";

function Games() {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadGames = async () => {
    try {
      setError("");
      const response = await api.get("/games");
      setGames(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Não foi possível carregar os jogos. Confira sua conexão com a API."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleSubmit = async (gameData) => {
    try {
      setError("");

      if (editingGame) {
        await api.put(`/games/${editingGame._id}`, gameData);
        setEditingGame(null);
      } else {
        await api.post("/games", gameData);
      }

      await loadGames();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Não foi possível salvar o jogo. Verifique os dados e tente novamente."
      );
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza de que deseja excluir este jogo?")) {
      return;
    }

    try {
      setError("");
      await api.delete(`/games/${id}`);

      if (editingGame?._id === id) {
        setEditingGame(null);
      }

      await loadGames();
    } catch (err) {
      setError(
        err.response?.data?.message || "Não foi possível excluir o jogo."
      );
    }
  };

  const filteredGames = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return games;

    return games.filter((game) => {
      const genres = Array.isArray(game.genre)
        ? game.genre
        : [game.genre || ""];

      const platforms = Array.isArray(game.platform)
        ? game.platform
        : [game.platform || ""];

      return [
        game.title,
        game.description,
        game.releaseYear,
        game.status,
        ...genres,
        ...platforms,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [games, search]);

  return (
    <main className="games-page">
      <header className="library-header">
        <div>
          <span className="section-kicker">SEU UNIVERSO GAMER</span>
          <h1>Minha biblioteca<span className="title-accent">.</span></h1>
          <p>Organize sua coleção, acompanhe seu progresso e prepare sua próxima aventura.</p>
          <p className="rawg-attribution">
            Dados e imagens de jogos fornecidos por{" "}
            <a href="https://rawg.io/" target="_blank" rel="noreferrer">
              RAWG
            </a>.
          </p>
        </div>

        <a className="button-primary add-game-link" href="#formulario-jogo">
          ＋ Adicionar jogo
        </a>
      </header>

      {error && (
        <div className="page-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")} aria-label="Fechar aviso">
            ×
          </button>
        </div>
      )}

      <section className="form-section" id="formulario-jogo">
        <GameForm
          key={editingGame?._id || "new-game"}
          game={editingGame}
          onSubmit={handleSubmit}
          onCancel={() => setEditingGame(null)}
        />
      </section>

      <section className="library-section" id="biblioteca">
        <div className="library-section-header">
          <div>
            <span className="section-kicker">COLEÇÃO PESSOAL</span>
            <h2>Seus jogos</h2>
          </div>

          <span className="game-count">
            {games.length} {games.length === 1 ? "jogo" : "jogos"}
          </span>
        </div>

        <div className="library-toolbar">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, gênero ou plataforma..."
              aria-label="Buscar jogos"
            />
          </label>
        </div>

        {loading ? (
          <div className="library-message">Carregando sua biblioteca...</div>
        ) : filteredGames.length > 0 ? (
          <div className="games-grid">
            {filteredGames.map((game) => (
              <GameCard
                key={game._id}
                game={game}
                onEdit={setEditingGame}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="library-empty">
            <span className="empty-game-icon" aria-hidden="true">🎮</span>
            <h3>{search ? "Nenhum jogo encontrado" : "Sua aventura começa aqui"}</h3>
            <p>
              {search
                ? "Tente buscar por outro nome, gênero ou plataforma."
                : "Adicione seu primeiro jogo pelo formulário acima e ele aparecerá aqui."}
            </p>
            {search && (
              <button
                type="button"
                className="button-secondary"
                onClick={() => setSearch("")}
              >
                Limpar busca
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Games;