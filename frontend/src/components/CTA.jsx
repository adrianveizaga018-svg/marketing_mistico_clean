import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { ctaData } from '../data/mockData';

const CTA = () => {
  const scrollToContact = () => {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#7c3aed] via-[#5B21B6] to-[#1a1f2e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#c9a961] rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7c3aed] rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#c9a961]/20 border-2 border-[#c9a961] mb-8 animate-pulse">
            <Zap className="text-[#c9a961]" size={40} />
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {ctaData.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
            {ctaData.subtitle}
          </p>

          {/* Features */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            {ctaData.features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-white font-semibold"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            onClick={scrollToContact}
            className="group bg-[#c9a961] hover:bg-[#d4af37] text-[#1a1f2e] font-bold text-xl px-12 py-6 rounded-full transition-all hover:scale-110 hover:shadow-2xl hover:shadow-[#c9a961]/50 inline-flex items-center gap-3"
          >
            {ctaData.buttonText}
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
          </button>

          <p className="text-gray-300 mt-8 text-sm">
            Sin compromisos. Sin letra pequeña. Solo resultados.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a961] to-transparent"></div>
    </section>
  );
};

export default CTA;
