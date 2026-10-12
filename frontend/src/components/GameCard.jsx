import React from 'react';
import { Star, Monitor, Play } from 'lucide-react';

export default function GameCard({ game }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
      {/* Imagem / Capa do Jogo */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-800">
        <img 
          src={game.imageUrl || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop"} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80"></div>
        
        {/* Badge de Score */}
        <div className="absolute top-3 right-3 bg-[#0B0F19]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-500/30 flex items-center space-x-1 shadow-lg">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white">{game.rating || '9.5'}</span>
        </div>

        {/* Badge de Gênero */}
        <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
          {game.genre || 'Ação / RPG'}
        </span>
      </div>

      {/* Informações do Jogo */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            {game.description || 'Mergulhe em uma experiência imersiva de nova geração com gráficos hiper-realistas e jogabilidade dinâmica.'}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span>PC / Consoles</span>
          </div>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all text-xs font-medium border border-cyan-500/30">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Detalhes</span>
          </button>
        </div>
      </div>
    </div>
  );
}