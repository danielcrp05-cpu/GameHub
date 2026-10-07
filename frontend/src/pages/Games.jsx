import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import GameForm from "../components/GameForm";
import api from "../services/api";

function Games() {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [error, setError] = useState("");

  const loadGames = async () => {
    try {
      const response = await api.get("/games");
      setGames(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao carregar jogos.");
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleSubmit = async (game) => {
    try {
      if (editingGame) {
        await api.put(`/games/${editingGame._id}`, game);
        setEditingGame(null);
      } else {
        await api.post("/games", game);
      }

      await loadGames();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao salvar jogo.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja excluir este jogo?")) return;

    try {
      await api.delete(`/games/${id}`);
      await loadGames();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir jogo.");
    }
  };

  return (
    <main>
      <h1>Minha biblioteca</h1>
      {error && <p>{error}</p>}

      <GameForm
        game={editingGame}
        onSubmit={handleSubmit}
        onCancel={() => setEditingGame(null)}
      />

      <section>
        {games.map((game) => (
          <GameCard
            key={game._id}
            game={game}
            onEdit={setEditingGame}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Games;
