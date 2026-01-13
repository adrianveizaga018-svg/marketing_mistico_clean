import React, { useState } from 'react';
import { Play, X, ArrowRight } from 'lucide-react';
import { videosData } from '../data/mockData';

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section id="videos" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Casos de <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Éxito</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto font-medium">
            Proyectos reales que demuestran el poder de nuestra estrategia y ejecución mística.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {videosData.map((video) => (
            <div 
              key={video.id}
              className="group relative bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-[#c9a961]/50 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-[#c9a961]/10"
              onClick={() => {
                if (video.externalUrl) {
                  window.open(video.externalUrl, '_blank');
                } else {
                  setSelectedVideo(video);
                }
              }}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay with radial gradient */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                
                {/* Action Icon - Dynamic based on type */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#c9a961] p-5 rounded-full shadow-[0_0_30px_rgba(201,169,97,0.5)] transform scale-90 group-hover:scale-100 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(201,169,97,0.8)]">
                    {video.externalUrl ? (
                      <ArrowRight className="text-black" size={32} />
                    ) : (
                      <Play className="text-black" size={32} fill="currentColor" />
                    )}
                  </div>
                </div>

                {/* Category Badge - Glass Style */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-black px-4 py-2 rounded-full border border-white/20">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-[#c9a961] transition-colors leading-tight">
                    {video.title}
                  </h3>
                  {video.externalUrl && <span className="text-[#c9a961] bg-[#c9a961]/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#c9a961]/20">Vivo</span>}
                </div>
                <p className="text-white/50 mb-6 text-base leading-relaxed font-medium">{video.description}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#c9a961]">Impacto</span>
                  <div className="text-base font-bold text-white tracking-tight">
                    {video.results}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[60]"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={40} />
            </button>
            
            <div 
              className={`w-full ${selectedVideo.aspect === 'vertical' ? 'max-w-[400px]' : 'max-w-5xl'} transform transition-all duration-500`} 
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative ${selectedVideo.aspect === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'} rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(201,169,97,0.2)] border border-white/10`}>
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-8 text-center animate-fade-in">
                <span className="text-[#c9a961] text-[10px] uppercase tracking-[0.3em] font-black mb-2 block">{selectedVideo.category}</span>
                <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{selectedVideo.title}</h3>
                <p className="text-white/50 text-lg font-medium italic">"{selectedVideo.description}"</p>
                <div className="mt-6 inline-flex items-center gap-4 bg-white/[0.05] px-6 py-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase tracking-widest font-black text-[#c9a961]">Resultado Clave:</span>
                  <span className="text-white font-bold tracking-tight">{selectedVideo.results}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Videos;
