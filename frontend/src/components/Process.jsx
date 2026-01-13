import React from 'react';
import { processData } from '../data/mockData';

const Process = () => {
  return (
    <section id="proceso" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Alquimia Estratégica</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium">
            {processData.subtitle}
          </p>
        </div>

        {/* Process Timeline */}
        <div className="max-w-5xl mx-auto">
          {processData.steps.map((step, index) => (
            <div 
              key={index}
              className="relative flex flex-col md:flex-row gap-12 mb-20 last:mb-0 group"
            >
              {/* Number Container */}
              <div className="flex-shrink-0 flex justify-center md:block">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                    <span className="text-3xl font-black text-[#c9a961]">{step.number}</span>
                  </div>
                  
                  {/* Connecting Line - Subtle Gradient */}
                  {index < processData.steps.length - 1 && (
                    <div className="hidden md:block absolute top-[5.5rem] left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#c9a961]/40 to-transparent"></div>
                  )}
                </div>
              </div>

              {/* Content Card - Premium Glass */}
              <div className="flex-1 bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-10 border border-white/10 group-hover:border-[#c9a961]/30 transition-all duration-500 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight group-hover:text-[#c9a961] transition-colors">{step.title}</h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement - Upgraded */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-white/[0.02] to-transparent border border-white/10 rounded-[3rem] p-10 max-w-4xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#c9a961]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <p className="text-lg md:text-2xl text-white/60 leading-relaxed font-bold relative z-10">
              <span className="text-[#c9a961]">No somos una agencia tradicional.</span> Somos tu departamento de marketing externo que entiende tu negocio y trabaja por resultados, no por horas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
