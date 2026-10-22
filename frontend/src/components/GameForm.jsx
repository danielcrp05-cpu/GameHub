
import React, { useEffect, useState } from "react";
import api from "../services/api";

const initialState = {
  title: "",
  description: "",
  genre: "",
  platform: "PC",
  releaseYear: "",
  rating: 0,
  status: "Quero jogar",
  image: "",
  rawgId: null,
  rawgSlug: "",
};

function GameForm({ game, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      ...initialState,
      ...(game || {}),
      releaseYear: game?.releaseYear ?? "",
      rawgId: game?.rawgId ?? null,
      rawgSlug: game?.rawgSlug ?? "",
    });

    setSearch("");
    setResults([]);
    setSearchError("");
  }, [game]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSearch = async () => {
    const query = search.trim();

    if (query.length < 2) {
      setSearchError("Digite pelo menos 2 caracteres.");
      setResults([]);
      return;
    }

    setSearching(true);
    setSearchError("");
    setResults([]);

    try {
      const response = await api.get("/games/search", {
        params: { query },
      });

      setResults(response.data.results || []);

      if (!response.data.results?.length) {
        setSearchError("Nenhum jogo encontrado. Tente outro nome.");
      }
    } catch (error) {
      setSearchError(
        error.response?.data?.message ||
          "Não foi possível pesquisar jogos. Tente novamente."
      );
    } finally {
      setSearching(false);
    }
  };

  const handleSelectGame = (selected) => {
    setForm((current) => ({
      ...current,
      title: selected.title || "",
      description: selected.description || current.description,
      genre: selected.genre || current.genre,
      releaseYear: selected.releaseYear || "",
      image: selected.image || "",
      rawgId: selected.rawgId,
      rawgSlug: selected.rawgSlug || "",
    }));

    setResults([]);
    setSearch(selected.title);
    setSearchError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        genre: form.genre.trim(),
        description: form.description.trim(),
        releaseYear:
          form.releaseYear === "" ? undefined : Number(form.releaseYear),
        rating: Number(form.rating),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="game-form-panel">
      <h2>{game ? "Editar jogo" : "Adicionar jogo"}</h2>

      <div className="rawg-search">
        <label htmlFor="rawg-search-input">Buscar jogo na RAWG</label>

        <div className="rawg-search-row">
          <input
            id="rawg-search-input"
            type="search"
            placeholder="Ex.: Elden Ring, God of War..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSearch();
              }
            }}
          />

          <button
            type="button"
            onClick={handleSearch}
            disabled={searching}
            className="neon-btn"
          >
            {searching ? "Pesquisando..." : "Pesquisar"}
          </button>
        </div>

        {searchError && <p className="rawg-search-message">{searchError}</p>}

        {results.length > 0 && (
          <div className="rawg-results">
            {results.map((result) => (
              <button
                type="button"
                className="rawg-result"
                key={result.rawgId}
                onClick={() => handleSelectGame(result)}
              >
                {result.image ? (
                  <img src={result.image} alt={`Capa de ${result.title}`} />
                ) : (
                  <div className="rawg-no-image">Sem capa</div>
                )}

                <span className="rawg-result-info">
                  <strong>{result.title}</strong>
                  <small>
                    {result.releaseYear || "Ano não informado"}
                  </small>
                  <small>{result.genre || "Gênero não informado"}</small>
                </span>

                <span className="rawg-select-label">Selecionar</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {form.rawgId && (
        <p className="rawg-selected-message">
          Jogo da RAWG selecionado. Confira os dados e salve abaixo.
        </p>
      )}

      {form.image && (
        <div className="game-form-preview">
          <img src={form.image} alt="Prévia da capa selecionada" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="game-form">
        <label htmlFor="game-title">Título</label>
        <input
          id="game-title"
          name="title"
          placeholder="Título do jogo"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="game-genre">Gênero</label>
        <input
          id="game-genre"
          name="genre"
          placeholder="Ex.: RPG, Ação, Aventura"
          value={form.genre}
          onChange={handleChange}
          required
        />

        <label htmlFor="game-platform">Plataforma</label>
        <select
          id="game-platform"
          name="platform"
          value={form.platform}
          onChange={handleChange}
        >
          <option>PC</option>
          <option>PlayStation</option>
          <option>Xbox</option>
          <option>Nintendo Switch</option>
          <option>Mobile</option>
          <option>Outro</option>
        </select>

        <label htmlFor="game-release-year">Ano de lançamento</label>
        <input
          id="game-release-year"
          name="releaseYear"
          type="number"
          min="1950"
          max={new Date().getFullYear()}
          placeholder="Ano de lançamento"
          value={form.releaseYear}
          onChange={handleChange}
        />

        <label htmlFor="game-rating">Minha nota (0 a 10)</label>
        <input
          id="game-rating"
          name="rating"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
        />

        <label htmlFor="game-status">Status</label>
        <select
          id="game-status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Quero jogar</option>
          <option>Jogando</option>
          <option>Finalizado</option>
          <option>Abandonado</option>
        </select>

        <label htmlFor="game-image">URL da capa (opcional)</label>
        <input
          id="game-image"
          name="image"
          type="url"
          placeholder="https://..."
          value={form.image}
          onChange={(event) => {
            handleChange(event);
            setForm((current) => ({
              ...current,
              rawgId: null,
              rawgSlug: "",
            }));
          }}
        />

        <label htmlFor="game-description">Descrição</label>
        <textarea
          id="game-description"
          name="description"
          placeholder="Descrição do jogo"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />

        <div className="game-form-actions">
          <button type="submit" className="neon-btn" disabled={saving}>
            {saving
              ? "Salvando..."
              : game
                ? "Salvar alterações"
                : "Cadastrar jogo"}
          </button>

          {game && (
            <button type="button" onClick={onCancel} className="secondary-btn">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default GameForm;