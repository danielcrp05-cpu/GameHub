import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  genre: "",
  platform: "PC",
  releaseYear: "",
  rating: 0,
  status: "Quero jogar",
  image: "",
};

function GameForm({ game, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setForm(game || initialState);
  }, [game]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
      <input name="genre" placeholder="Gênero" value={form.genre} onChange={handleChange} required />

      <select name="platform" value={form.platform} onChange={handleChange}>
        <option>PC</option>
        <option>PlayStation</option>
        <option>Xbox</option>
        <option>Nintendo Switch</option>
        <option>Mobile</option>
        <option>Outro</option>
      </select>

      <input name="releaseYear" type="number" placeholder="Ano de lançamento" value={form.releaseYear} onChange={handleChange} />
      <input name="rating" type="number" min="0" max="10" step="0.1" placeholder="Nota" value={form.rating} onChange={handleChange} />

      <select name="status" value={form.status} onChange={handleChange}>
        <option>Quero jogar</option>
        <option>Jogando</option>
        <option>Finalizado</option>
        <option>Abandonado</option>
      </select>

      <input name="image" placeholder="URL da capa" value={form.image} onChange={handleChange} />
      <textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />

      <button type="submit">{game ? "Salvar alterações" : "Cadastrar jogo"}</button>
      {game && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}

export default GameForm;
