import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { heroData } from '../data/mockData';
import metaPixel from '../lib/metaPixel';

const Hero = () => {
  const handleSchedule = () => {
    metaPixel.trackSchedule();
  };
  const [displayText, setDisplayText] = useState('');
  const fullText = heroData.title;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // 100ms typing speed

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative flex items-center overflow-hidden min-h-screen bg-black">
      {/* Video Background - Optimized WebM version */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-y-0 right-0 w-full md:w-[95%] h-full object-cover z-0 pointer-events-none will-change-transform filter brightness-110 contrast-105"
        style={{ objectPosition: '70% center' }}
      >
        <source src="/video_header.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay - integrations video with background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-[1]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,transparent_10%,black_100%)] z-[1] opacity-60"></div>
      
      {/* Watermark cover / Refined integration */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[30%] bg-gradient-to-t from-black via-black/80 to-transparent filter blur-[20px]"></div>
        <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-black via-black/50 to-transparent"></div>
      </div>

      {/* Cinematic lighting effects */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[60%] h-[60%] bg-[#7c3aed]/10 rounded-full filter blur-[120px] animate-ambient"></div>
        <div className="absolute top-1/2 right-[20%] w-[40%] h-[40%] bg-[#00f2ff]/10 rounded-full filter blur-[150px] animate-ambient" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-[35%] h-[35%] bg-[#c9a961]/15 rounded-full filter blur-[100px] animate-ambient" style={{ animationDelay: '-10s' }}></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:pl-20 lg:pl-32 relative z-10 pt-28 pb-12">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full mb-8 animate-fade-in shadow-[0_0_20px_rgba(201,169,97,0.1)]">
            <Sparkles size={16} className="text-[#c9a961] animate-pulse" />
            <span className="text-white/80 text-[10px] uppercase tracking-[0.2em] font-black">Agencia Premium de Marketing Digital</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-8 tracking-tighter min-h-[1.1em]">
            <span className="text-white drop-shadow-2xl">
              {displayText}
              <span className="animate-pulse ml-1 text-[#c9a961]">|</span>
            </span>
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto] drop-shadow-[0_0_15px_rgba(201,169,97,0.3)]">
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
            <a 
              href={heroData.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSchedule}
              className="group bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto] text-black font-black text-sm uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(201,169,97,0.3)] hover:shadow-[0_0_50px_rgba(201,169,97,0.5)] flex items-center justify-center gap-3 no-underline"
            >
              {heroData.ctaPrimary}
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
            </a>
            <button 
              onClick={() => scrollToSection('videos')}
              className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Play size={18} className="text-[#c9a961]" />
              {heroData.ctaSecondary}
            </button>
          </div>

          {/* Stats Card */}
          <div className="flex flex-wrap items-center gap-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 px-8 py-6 rounded-3xl w-fit shadow-2xl relative overflow-hidden group hover:border-[#c9a961]/30 transition-all duration-500 animate-float">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#c9a961]/10 rounded-full blur-3xl group-hover:bg-[#c9a961]/20 transition-all duration-500"></div>
            
            <div className="text-center relative z-10">
              <div className="text-3xl md:text-4xl font-black text-[#c9a961] tracking-tight">+150</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 mt-1 font-bold">Proyectos</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div className="text-center relative z-10">
              <div className="text-3xl md:text-4xl font-black text-[#c9a961] tracking-tight">98%</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 mt-1 font-bold">Satisfacción</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div className="text-center relative z-10">
              <div className="text-3xl md:text-4xl font-black text-[#c9a961] tracking-tight">5X</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 mt-1 font-bold">ROI Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
