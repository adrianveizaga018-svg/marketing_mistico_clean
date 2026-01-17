import React from 'react';
import { Award } from 'lucide-react';
import { autorityData } from '../data/mockData';
import AnimatedCounter from './AnimatedCounter';

const Authority = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background radial glow - Now animated */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none animate-ambient"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {autorityData.stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group"
            >
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-[#c9a961] to-[#d4af37] mb-3 tracking-tighter transition-transform duration-500 group-hover:scale-110">
                <AnimatedCounter value={stat.number} duration={2.5} />
              </div>
              <div className="text-white/40 text-xs md:text-sm uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Authority Statement */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden group hover:border-[#c9a961]/30 transition-all duration-700 shadow-2xl animate-float">
            {/* Decorative inner glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#c9a961]/10 rounded-full blur-[80px] group-hover:bg-[#c9a961]/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-10">
                <div className="bg-gradient-to-br from-[#c9a961] to-[#d4af37] p-[2px] rounded-2xl shadow-[0_0_20px_rgba(201,169,97,0.3)]">
                  <div className="bg-black rounded-2xl p-4">
                    <Award className="text-[#c9a961]" size={36} />
                  </div>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-center text-white mb-6 tracking-tight">
                {autorityData.badge}
              </h3>

              <p className="text-lg md:text-xl text-white/60 text-center leading-relaxed font-medium">
                {autorityData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;
