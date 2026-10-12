import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import GameCard from '../components/GameCard';

export default function Home({ games }) {
  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src= "https://images.financialexpressdigital.com/2025/10/gta-6-artwork.jpg?quality=100&w=1024"
            alt="Hero Background" 
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-start space-y-6">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LANÇAMENTO DA SEMANA • JOGUE AGORA</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
            Explore o ápice do <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent neon-glow">Gaming Moderno</span>
          </h1>

          <p className="text-slate-300 max-w-xl text-base">
            Descubra análises, adicione seus títulos favoritos ao catálogo dinâmico e conecte-se com a maior comunidade gamer da stack MERN.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <Link to="/games" className="px-6 py-3 rounded-xl neon-btn text-white font-semibold flex items-center space-x-2 shadow-lg">
              <span>Explorar Catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/games/new" className="px-6 py-3 rounded-xl glass-panel text-slate-200 font-semibold hover:border-cyan-400 transition-all">
              Cadastrar Jogo
            </Link>
          </div>
        </div>
      </section>

      {/* Grid de Jogos em Destaque */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Jogos em Destaque</h2>
            <p className="text-sm text-slate-400 mt-1">Os títulos mais populares avaliados pela comunidade</p>
          </div>
          <Link to="/games" className="text-sm font-medium text-cyan-400 hover:underline flex items-center space-x-1">
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {games && games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.slice(0, 4).map(game => (
              <GameCard key={game._id || game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-12 text-center text-slate-400">
            <p>Nenhum jogo cadastrado no momento. Seja o primeiro a adicionar!</p>
          </div>
        )}
      </section>

      {/* Footer Tecnológico */}
      <footer className="mt-24 border-t border-slate-800/80 pt-8 pb-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Server Status: <strong className="text-emerald-400 font-medium">Online (99.9%)</strong></span>
        </div>
        <p className="mt-4 md:mt-0">© 2026 GameHub Platform. Desenvolvido com Stack MERN.</p>
      </footer>
    </div>
  );
}