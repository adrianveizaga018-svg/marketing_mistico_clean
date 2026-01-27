import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { heroData } from '../data/mockData';
import metaPixel from '../lib/metaPixel';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = heroData.title;
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

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

  // Lazy load video after hero is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    const heroElement = document.getElementById('hero');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleSchedule = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative flex items-center overflow-hidden min-h-screen bg-black">
      {/* Video Background - Lazy loaded with poster */}
      <div className={`absolute inset-y-0 right-0 w-full md:w-[95%] h-full transition-opacity duration-1000 ${shouldLoadVideo ? 'opacity-100' : 'opacity-0'}`}>
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            width="1920"
            height="1080"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover pointer-events-none filter brightness-110 contrast-105"
            style={{ objectPosition: '70% center' }}
          >
            <source src="/video_header.webm" type="video/webm" />
            <source src="/video_header.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      
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
      <div className="container mx-auto px-4 sm:px-6 md:pl-20 lg:pl-32 relative z-10 pt-24 sm:pt-28 pb-12">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full mb-6 sm:mb-8 animate-fade-in shadow-[0_0_20px_rgba(201,169,97,0.1)]">
            <Sparkles size={14} className="sm:w-4 sm:h-4 text-[#c9a961] animate-pulse" />
            <span className="text-white/80 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-black">Agencia Premium de Marketing Digital</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-5 sm:mb-6 md:mb-8 tracking-tighter min-h-[1.1em]">
            <span className="text-white drop-shadow-2xl">
              {displayText}
              <span className="animate-pulse ml-1 text-[#c9a961]">|</span>
            </span>
            <span className="block mt-3 sm:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto] drop-shadow-[0_0_15px_rgba(201,169,97,0.3)]">
              con Estrategia
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-3 sm:mb-4 max-w-xl" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}>
            {heroData.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-lg">
            {heroData.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
            <a 
              href={heroData.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSchedule}
              className="group bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto] text-black font-black text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(201,169,97,0.3)] hover:shadow-[0_0_50px_rgba(201,169,97,0.5)] flex items-center justify-center gap-2 sm:gap-3 no-underline min-h-[52px]"
            >
              {heroData.ctaPrimary}
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
            </a>
            <button 
              onClick={() => scrollToSection('problemas')}
              className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-semibold text-sm px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Play size={16} className="sm:w-[18px] sm:h-[18px] text-[#c9a961]" />
              <span className="text-xs sm:text-sm">Ver Más</span>
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
