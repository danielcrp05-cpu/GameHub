import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gamepad2,
  LibraryBig,
  CircleCheck,
  Clock3,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import api from "../services/api";

function getGenres(game) {
  if (Array.isArray(game.genre)) return game.genre.filter(Boolean);
  return game.genre ? [game.genre] : [];
}

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api
      .get("/games")
      .then((response) => {
        if (active) setGames(Array.isArray(response.data) ? response.data : []);
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Não foi possível carregar sua biblioteca. Confira se a API está funcionando."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    const normalized = games.map((game) => String(game.status || "").toLowerCase());
    return {
      total: games.length,
      playing: normalized.filter((status) => status.includes("jogando") || status.includes("em andamento")).length,
      completed: normalized.filter((status) => status.includes("zerado") || status.includes("conclu") || status.includes("finalizado")).length,
      wishlist: normalized.filter((status) => status.includes("quero") || status.includes("jogar depois")).length,
    };
  }, [games]);

  const featuredGames = games.slice(0, 6);

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-image" aria-hidden="true" />
        <div className="dashboard-hero-content">
          <span className="dashboard-eyebrow"><Sparkles size={15} /> SEU UNIVERSO GAMER</span>
          <h1>Seu próximo mundo<br />está <span>esperando.</span></h1>
          <p>Organize sua coleção, acompanhe sua jornada e descubra qual aventura vem a seguir.</p>
          <div className="dashboard-hero-actions">
            <Link className="dashboard-button dashboard-button-primary" to="/explorar">
             Explorar catálogo <ArrowRight size={17} />
            </Link>
            <Link className="dashboard-button dashboard-button-ghost" to="/games#formulario-jogo">
              <Gamepad2 size={17} /> Adicionar jogo
            </Link>
          </div>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-kicker">VISÃO GERAL</span>
            <h2>Sua jornada em números</h2>
          </div>
          <Link to="/games" className="dashboard-text-link">Ver biblioteca <ArrowRight size={15} /></Link>
        </div>

        <div className="dashboard-stats-grid">
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon"><LibraryBig size={20} /></span>
            <div><span className="dashboard-stat-label">Na biblioteca</span><strong>{loading ? "—" : stats.total}</strong><small>jogos cadastrados</small></div>
          </article>
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon is-blue"><Gamepad2 size={20} /></span>
            <div><span className="dashboard-stat-label">Em andamento</span><strong>{loading ? "—" : stats.playing}</strong><small>aventuras ativas</small></div>
          </article>
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon is-green"><CircleCheck size={20} /></span>
            <div><span className="dashboard-stat-label">Concluídos</span><strong>{loading ? "—" : stats.completed}</strong><small>jornadas finalizadas</small></div>
          </article>
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon is-purple"><Clock3 size={20} /></span>
            <div><span className="dashboard-stat-label">Quero jogar</span><strong>{loading ? "—" : stats.wishlist}</strong><small>na sua lista</small></div>
          </article>
        </div>

        <div className="dashboard-section-heading dashboard-featured-heading">
          <div>
            <span className="dashboard-section-kicker">COLEÇÃO PESSOAL</span>
            <h2>Adicionados recentemente</h2>
            <p>Seus jogos cadastrados, reunidos em um só lugar.</p>
          </div>
          <Link to="/games" className="dashboard-text-link">Ver todos os jogos <ArrowRight size={15} /></Link>
        </div>

        {error && <div className="dashboard-notice" role="alert"><AlertCircle size={18} /> {error}</div>}
        {loading ? (
          <div className="dashboard-empty-state">Carregando sua biblioteca...</div>
        ) : featuredGames.length ? (
          <div className="dashboard-game-grid">
            {featuredGames.map((game) => {
              const image = game.image || game.imageUrl;
              const genres = getGenres(game);
              return (
                <Link className="dashboard-game-card" to="/games#biblioteca" key={game._id || game.id}>
                  <div className="dashboard-game-art">
                    {image ? <img src={image} alt={`Capa de ${game.title}`} loading="lazy" /> : <div className="dashboard-game-no-art"><Gamepad2 size={34} /><span>Sem capa cadastrada</span></div>}
                    <span className="dashboard-game-status">{game.status || "Na biblioteca"}</span>
                  </div>
                  <div className="dashboard-game-info">
                    <h3>{game.title || "Jogo sem título"}</h3>
                    <p>{genres.slice(0, 2).join(" · ") || game.platform || "Gênero não informado"}</p>
                    {game.rating !== undefined && game.rating !== null && game.rating !== "" && <span className="dashboard-game-rating">★ {game.rating}/10</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="dashboard-empty-state">
            <Gamepad2 size={34} />
            <h3>Sua próxima aventura começa aqui</h3>
            <p>Você ainda não cadastrou jogos. Adicione o primeiro para começar a montar sua coleção.</p>
            <Link className="dashboard-button dashboard-button-primary" to="/games#formulario-jogo">Adicionar primeiro jogo <ArrowRight size={16} /></Link>
          </div>
        )}
      </section>
      <footer className="dashboard-footer"><span><i /> GameHub pronto para a próxima partida</span><span>© 2026 GameHub</span></footer>
    </main>
  );
}

export default Home;