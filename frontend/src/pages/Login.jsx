import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", form);
      onLogin(response.data);
      navigate("/games");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login.");
    }
  };

  return (
    <main>
      <h1>GameHub</h1>
      <h2>Entrar</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/register">Criar conta</Link>
    </main>
  );
}

export default Login;
