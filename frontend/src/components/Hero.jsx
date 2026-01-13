import React from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { heroData } from '../data/mockData';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative flex items-center overflow-hidden mt-20" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video_header.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay - creates depth and improves readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-transparent to-[#0f1419]/30 z-[1]"></div>
      
      {/* Watermark cover - covers corners where watermarks usually appear */}
      <div className="absolute bottom-0 right-0 w-48 h-24 bg-gradient-to-tl from-[#0f1419] via-[#0f1419]/80 to-transparent z-[2]"></div>
      <div className="absolute top-0 right-0 w-48 h-24 bg-gradient-to-bl from-[#0f1419] via-[#0f1419]/60 to-transparent z-[2]"></div>

      {/* Subtle glow effects */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#7c3aed]/20 rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#c9a961]/15 rounded-full filter blur-[120px]"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 py-12">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-full mb-8 animate-fade-in">
            <Sparkles size={16} className="text-[#c9a961]" />
            <span className="text-white/90 text-sm font-medium tracking-wide">Agencia Premium de Marketing Digital</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            <span className="text-white drop-shadow-lg" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              {heroData.title}
            </span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] via-[#e8d5a3] to-[#c9a961] drop-shadow-lg">
              con Estrategia
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-4 max-w-xl" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}>
            {heroData.subtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
            {heroData.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={() => scrollToSection('contacto')}
              className="group bg-gradient-to-r from-[#c9a961] to-[#d4af37] hover:from-[#d4af37] hover:to-[#e8c547] text-[#0f1419] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#c9a961]/40 flex items-center justify-center gap-2"
            >
              {heroData.ctaPrimary}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Play size={18} className="text-[#c9a961]" />
              {heroData.ctaSecondary}
            </button>
          </div>

          {/* Stats Card */}
          <div className="flex flex-wrap items-center gap-8 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-5 rounded-2xl w-fit">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c9a961]">+150</div>
              <div className="text-sm text-white/60 mt-1">Proyectos</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c9a961]">98%</div>
              <div className="text-sm text-white/60 mt-1">Satisfacción</div>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c9a961]">5X</div>
              <div className="text-sm text-white/60 mt-1">ROI Promedio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-7 h-11 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-[#c9a961] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
