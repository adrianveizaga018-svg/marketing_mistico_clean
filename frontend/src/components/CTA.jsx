import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { ctaData } from '../data/mockData';

const CTA = () => {
  const scrollToContact = () => {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#c9a961]/10 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Icon - Upgraded */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#c9a961] to-[#d4af37] p-[2px] mb-12 shadow-[0_0_50px_rgba(201,169,97,0.3)] animate-float">
            <div className="bg-black w-full h-full rounded-[2rem] flex items-center justify-center">
              <Zap className="text-[#c9a961]" size={40} fill="currentColor" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            {ctaData.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-3xl text-white/60 mb-16 leading-tight max-w-3xl mx-auto font-bold italic">
            "{ctaData.subtitle}"
          </p>

          {/* Features - Premium Pill Style */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {ctaData.features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full px-8 py-3 text-white/80 text-xs uppercase tracking-widest font-black"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Button - Maximum Impact */}
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={scrollToContact}
              className="group bg-[#c9a961] hover:bg-white text-black font-black text-sm md:text-base uppercase tracking-[0.2em] px-16 py-7 rounded-full transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(201,169,97,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] inline-flex items-center gap-4"
            >
              {ctaData.buttonText}
              <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" size={24} />
            </button>
            <p className="text-white/30 text-xs uppercase tracking-widest font-black">
              Resultados reales para marcas con visión de futuro
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a961] to-transparent"></div>
    </section>
  );
};

export default CTA;
