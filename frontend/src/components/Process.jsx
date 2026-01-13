import React from 'react';
import { processData } from '../data/mockData';

const Process = () => {
  return (
    <section id="proceso" className="py-20 bg-[#1a1f2e]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {processData.title}
          </h2>
          <p className="text-xl text-gray-400">
            {processData.subtitle}
          </p>
        </div>

        {/* Process Timeline */}
        <div className="max-w-5xl mx-auto">
          {processData.steps.map((step, index) => (
            <div 
              key={index}
              className="relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0"
            >
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#c9a961] flex items-center justify-center transform hover:scale-110 transition-transform">
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < processData.steps.length - 1 && (
                    <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-[#c9a961] to-transparent"></div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-[#0f1419] rounded-xl p-8 border border-[#c9a961]/20 hover:border-[#c9a961]/40 transition-all hover:transform hover:scale-105">
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#c9a961]/10 border border-[#c9a961]/20 rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed">
              <span className="text-[#c9a961] font-bold">No somos una agencia tradicional.</span> Somos tu departamento de marketing externo que entiende tu negocio y trabaja por resultados, no por horas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
