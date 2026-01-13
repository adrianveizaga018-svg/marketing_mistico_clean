import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { videosData } from '../data/mockData';

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section id="videos" className="py-20 bg-[#0f1419]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] to-[#d4af37]">Trabajos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Campañas reales que generaron resultados medibles y escalables
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {videosData.map((video) => (
            <div 
              key={video.id}
              className="group relative bg-[#1a1f2e] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-[#1a1f2e]/50 to-transparent"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#c9a961]/90 group-hover:bg-[#c9a961] p-4 rounded-full transform group-hover:scale-110 transition-all">
                    <Play className="text-[#1a1f2e]" size={32} fill="#1a1f2e" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#7c3aed] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#c9a961] transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 mb-4">{video.description}</p>
                <div className="text-sm text-[#c9a961] font-semibold">
                  {video.results}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-[#c9a961] transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={32} />
            </button>
            
            <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-400">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Videos;
