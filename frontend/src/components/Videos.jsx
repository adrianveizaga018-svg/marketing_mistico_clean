import React, { useState, useRef, useLayoutEffect } from 'react';
import { Play, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { videosData } from '../data/mockData';

const VideoCard = ({ video, setSelectedVideo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="w-[320px] md:w-[650px] flex-shrink-0 px-4 md:px-8 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (video.externalUrl) {
          window.open(video.externalUrl, '_blank');
        } else {
          setSelectedVideo(video);
        }
      }}
    >
      <motion.div
        className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden hover:border-[#c9a961]/50 cursor-pointer shadow-3xl transition-all duration-700 h-[380px] md:h-[450px]"
        whileHover={{
            rotateY: 10,
            rotateX: -5,
            z: 100,
            scale: 1.05
        }}
        style={{ perspective: 2000 }}
      >
        <div className="absolute inset-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          />
          {!video.externalUrl && (
              <video
                ref={videoRef}
                src={video.videoPreview || video.videoUrl}
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
          )}
          {/* Overlay - Intensified gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-100 group-hover:opacity-60 transition-all duration-700"></div>

          {/* Action Icon - Repositioned to bottom-right */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
            <motion.div
              className="bg-[#c9a961] p-4 md:p-6 rounded-full shadow-[0_0_50px_rgba(201,169,97,0.5)] md:shadow-[0_0_80px_rgba(201,169,97,0.7)]"
              animate={{ 
                scale: isHovered ? 1 : 0.8,
                y: isHovered ? 0 : 10 
              }}
            >
              {video.externalUrl ? <ArrowRight className="text-black" size={24} className="md:w-8 md:h-8" /> : <Play className="text-black" size={24} className="md:w-8 md:h-8" fill="currentColor" />}
            </motion.div>
          </div>

          <div className="absolute top-6 left-6 md:top-10 md:left-10">
            <span className="bg-black/60 backdrop-blur-2xl text-[#c9a961] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border border-[#c9a961]/30 shadow-2xl">
              {video.category}
            </span>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10 transition-transform duration-500 group-hover:translate-y-[-10px] md:group-hover:translate-y-[-15px]">
          <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-5 tracking-tighter group-hover:text-[#c9a961] transition-colors leading-[1] md:leading-[0.95] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            {video.title}
          </h3>
          <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-white/20">
            <div className="flex flex-col">
                <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-black text-[#c9a961] drop-shadow-md">Resultado Místico</span>
                <div className="text-lg md:text-2xl font-black text-white/90 tracking-tighter mt-1 drop-shadow-lg">{video.results}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [xRange, setXRange] = useState([0, 0]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  // Calculate project index in real-time
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const calculated = Math.min(Math.floor(latest * videosData.length) + 1, videosData.length);
    if (calculated !== currentIndex) setCurrentIndex(calculated);
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useLayoutEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        const offsetWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // The translation should be exactly enough to see the last card + some extra space
        setXRange([0, -(offsetWidth - viewportWidth + 50)]);
      }
    };

    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  const x = useTransform(smoothProgress, [0, 1], [xRange[0], xRange[1]]);

  return (
    <section id="videos" ref={sectionRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Cinematic Lighting Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#c9a961]/10 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#c9a961]/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-6 mb-8 md:mb-12 relative z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
                <span className="text-[#c9a961] text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black mb-4 block">Legado de Impacto</span>
                <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-4 md:mb-6">
                  Casos de <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Éxito</span>
                </h2>
                <div className="flex items-center justify-center gap-4">
                    <div className="h-[1px] w-8 md:w-12 bg-[#c9a961]/30"></div>
                    <p className="text-white/30 font-medium uppercase tracking-[0.3em] text-[8px] md:text-[9px]">Explora la excelencia</p>
                    <div className="h-[1px] w-8 md:w-12 bg-[#c9a961]/30"></div>
                </div>
            </motion.div>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="relative flex items-center">
            <motion.div ref={trackRef} style={{ x }} className="flex">
                {/* Visual Start Spacer */}
                <div className="w-[5vw] md:w-[10vw] flex-shrink-0" />
                {videosData.map((video) => (
                    <VideoCard key={video.id} video={video} setSelectedVideo={setSelectedVideo} />
                ))}
                {/* Visual End Spacer */}
                <div className="w-[10vw] md:w-[30vw] flex-shrink-0" />
            </motion.div>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-8 z-30">
            <span className="text-[10px] font-black text-[#c9a961] tracking-widest min-w-[20px]">
                0{currentIndex}
            </span>
            <div className="w-24 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                    style={{ scaleX: smoothProgress }}
                    className="absolute inset-0 bg-[#c9a961] origin-left shadow-[0_0_15px_#c9a961]"
                />
            </div>
            <span className="text-[10px] font-black text-white/40 tracking-widest">0{videosData.length}</span>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-3xl"
            onClick={() => setSelectedVideo(null)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-[#c9a961] transition-all z-[110]" onClick={() => setSelectedVideo(null)}>
              <X size={54} strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className={`w-full ${selectedVideo.aspect === 'vertical' ? 'max-w-[480px]' : 'max-w-7xl'} relative`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative ${selectedVideo.aspect === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'} rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_200px_rgba(201,169,97,0.2)] bg-black`}>
                <iframe
                  src={`${selectedVideo.videoUrl}${selectedVideo.videoUrl.includes('?') ? '&' : '?'}autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-8 md:mt-12 text-center md:text-left px-4 animate-fade-in">
                  <span className="text-[#c9a961] text-[10px] md:text-xs uppercase tracking-[0.5em] font-black mb-2 md:mb-4 block">{selectedVideo.category}</span>
                  <h3 className="text-2xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter">{selectedVideo.title}</h3>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
                      <p className="text-white/60 text-lg md:text-xl font-medium italic max-w-2xl leading-relaxed">"{selectedVideo.description}"</p>
                      <div className="px-8 py-6 md:px-10 md:py-8 bg-[#c9a961]/10 border border-[#c9a961]/30 rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-xl group">
                          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-[#c9a961] block mb-2 opacity-60">Resultados Verificados</span>
                          <span className="text-xl md:text-3xl font-black text-white group-hover:text-[#c9a961] transition-colors">{selectedVideo.results}</span>
                      </div>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Videos;
