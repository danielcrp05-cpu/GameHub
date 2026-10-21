import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Gamepad2, LogOut, PlusCircle } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-500/10 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 group">
        <Gamepad2 className="w-8 h-8 text-cyan-400 transition-transform group-hover:scale-110" />
        <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent neon-glow">
          GAMEHUB
        </span>
      </Link>

      {/* Barra de Busca Centralizada */}
      <div className="hidden md:flex items-center relative w-1/3">
        <Search className="absolute left-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar jogos, categorias... (Ctrl + K)"
          className="w-full bg-[#161B22]/80 border border-slate-700/60 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 transition-all"
        />
      </div>

      {/* Navegação & Ações */}
      <nav className="flex items-center space-x-6">
        <Link to="/" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Início</Link>
        <Link to="/games" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Catálogo</Link>
        
        {user && (
          <Link to="/games/new" className="flex items-center space-x-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
            <PlusCircle className="w-4 h-4" />
            <span>Adicionar Jogo</span>
          </Link>
        )}

        <div className="flex items-center space-x-4 border-l border-slate-700/60 pl-6">
          <button className="relative text-slate-300 hover:text-cyan-400 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          </button>

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  {user.username ? user.username[0].toUpperCase() : 'U'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0B0F19]"></span>
              </div>
              <button 
                onClick={onLogout}
                className="text-slate-400 hover:text-red-400 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link to="/login" className="text-sm px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all">Entrar</Link>
              <Link to="/register" className="text-sm px-4 py-2 rounded-lg neon-btn text-white font-medium">Cadastrar</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}