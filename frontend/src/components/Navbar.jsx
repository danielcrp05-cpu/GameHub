import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Gamepad2, LogOut, Plus, LibraryBig, House, KeyRound} from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const displayName = user?.name || user?.username || user?.email || "Jogador";
  const initial = String(displayName).trim().charAt(0).toUpperCase() || "J";

  return (
    <header className="gamehub-navbar">
      <Link to="/" className="gamehub-brand" aria-label="GameHub - Início">
        <span className="gamehub-brand-icon">
          <Gamepad2 size={23} /></span>
        <span>GAME<span>HUB</span></span>
      </Link>

      <nav className="gamehub-nav" aria-label="Navegação principal">
        <NavLink to="/" end className={({ isActive }) => `gamehub-nav-link${isActive ? " active" : ""}`}>
        <House size={16}/>Início
        </NavLink>
        <NavLink to="/games" className={({ isActive }) => `gamehub-nav-link${isActive ? " active" : ""}`}>
        <LibraryBig size={16}/>Minha biblioteca
        </NavLink>
      </nav>

      <div className="gamehub-nav-actions">
        <Link to="/games#formulario-jogo" className="gamehub-add-button">
          <Plus size={17}/>
          <span>Adicionar jogo</span>
        </Link>
        <div className="gamehub-user" title={displayName}>
          <span className="gamehub-user-avatar">{initial}</span>
          <span className="gamehub-user-name">{displayName}</span>
        </div>
        <NavLink
          to="/change-password"
          className={({ isActive }) =>
            `gamehub-nav-link${isActive ? " active" : ""}`
          }
          title="Alterar senha"
        >
          <KeyRound size={16} />
          <span>Alterar senha</span>
        </NavLink>
        <button type="button" className="gamehub-logout" onClick={onLogout} title="Sair" aria-label="Sair">
          <LogOut size={18}/>
        </button>
      </div>
    </header>
  );
}