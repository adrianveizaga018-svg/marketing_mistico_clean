import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PortfolioModal from './PortfolioModal';

const ProjectCarousel = ({ title, subtitle, data, id }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (projectId) => {
    setSelectedProject(projectId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (projectId) => {
    setSelectedProject(projectId);
  };

  // We duplicate data 4 times to ensure a seamless infinite loop
  const infiniteData = [...data, ...data, ...data, ...data];

  return (
    <section id={id} className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 w-full overflow-hidden">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: title }}>
          </h2>
          {subtitle && (
            <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Infinite Looping Container */}
        <div className="flex relative w-full overflow-hidden">
          <motion.div 
            className="flex gap-8"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
            whileHover={{ 
              animationPlayState: "paused" 
            }}
          >
            {infiniteData.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                whileHover={{ y: -10, scale: 1.02 }}
                className="flex-shrink-0 w-[300px] md:w-[350px] cursor-pointer"
                onClick={() => {
                  if (item.link) {
                     window.open(item.link, '_blank');
                  } else if (item.type === 'vimeo') {
                     // For vimeo, we open the player url in new tab or specific video url
                     window.open(item.video.split('?')[0], '_blank'); 
                  } else {
                     openModal(item.id)
                  }
                }}
              >
                <div className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#c9a961]/40 shadow-2xl h-[400px]">
                  {/* Image/Video Container */}
                  <div className="h-[280px] overflow-hidden bg-white/5 relative">
                    {item.type === 'vimeo' ? (
                      <div className="w-full h-full relative">
                         <iframe 
                            src={`${item.video}&background=1&mute=1&loop=1`} 
                            width="350"
                            height="280"
                            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none transform scale-150"
                            frameBorder="0" 
                            allow="autoplay; fullscreen; picture-in-picture" 
                            allowFullScreen
                            title={item.title}
                          ></iframe>
                          {/* Transparent overlay to prevent interaction with iframe but allow click on card */}
                          <div className="absolute inset-0 z-10"></div>
                      </div>
                    ) : item.type === 'video' ? (
                      <video 
                        src={item.video}
                        poster={item.thumbnail}
                        width="350"
                        height="280"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={item.image || item.thumbnail} 
                        alt={item.title}
                        width="350"
                        height="280"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="w-16 h-16 rounded-full bg-[#c9a961]/90 flex items-center justify-center">
                        {item.type === 'video' || item.type === 'vimeo' ? (
                           <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                             <path d="M8 5v14l11-7z"/>
                           </svg>
                        ) : item.link ? (
                           <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                           </svg>
                        ) : (
                          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#c9a961] bg-[#c9a961]/10 px-3 py-1 rounded-full border border-[#c9a961]/20">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#c9a961] transition-colors tracking-tight leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{item.client}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#c9a961] text-[10px] hover:underline mt-1 block" onClick={(e) => e.stopPropagation()}>
                        Visitar Sitio Web →
                      </a>
                    )}
                    {item.tech && <p className="text-white/30 text-[10px] mt-2">{item.tech}</p>}
                    {item.duration && <p className="text-white/30 text-[10px] mt-2">Duración: {item.duration}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={isModalOpen}
        projectId={selectedProject}
        onClose={closeModal}
        onNavigate={handleNavigate}
        // Pass the specific data array to the modal so it knows where to look for the project
        projectData={data} 
      />
    </section>
  );
};

export default ProjectCarousel;
