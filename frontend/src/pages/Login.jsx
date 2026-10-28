
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);
      onLogin(response.data);
      navigate("/games");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="login-logo">🎮</span>
          <h1>
            Game<span>Hub</span>
          </h1>
          <p>Sua biblioteca gamer começa aqui.</p>
        </div>

        <div className="login-content">
          <h2>Bem-vindo de volta!</h2>
          <p>Entre para acessar sua coleção de jogos.</p>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <label htmlFor="login-password">Senha</label>
            <input
              id="login-password"
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar na minha conta"}
            </button>
          </form>

          <p className="login-register">
            Ainda não tem uma conta?{" "}
            <Link to="/register">Criar conta</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;