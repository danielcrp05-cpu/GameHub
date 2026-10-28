import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("As novas senhas não coincidem.");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await api.put("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setSuccess("Senha alterada com sucesso!");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Não foi possível alterar a senha."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="login-logo">🔐</span>
          <h1>
            Game<span>Hub</span>
          </h1>
          <p>Segurança da sua conta</p>
        </div>

        <div className="login-content">
          <h2>Alterar senha</h2>
          <p>Atualize sua senha para proteger sua conta.</p>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p role="status" style={{ color: "#86efac" }}>
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="currentPassword">Senha atual</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              placeholder="Digite sua senha atual"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />

            <label htmlFor="newPassword">Nova senha</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              value={form.newPassword}
              onChange={handleChange}
              minLength={8}
              required
            />

            <label htmlFor="confirmPassword">
              Confirmar nova senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a nova senha"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar nova senha"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              background: "transparent",
              border: "none",
              color: "#c4b5fd",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Voltar para o início
          </button>
        </div>
      </section>
    </main>
  );
}

export default ChangePassword;