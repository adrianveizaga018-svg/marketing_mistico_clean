import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { graphicsData } from '../data/mockData';
import PortfolioModal from './PortfolioModal';

const GraphicsCarousel = () => {
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
  const infiniteData = [...graphicsData, ...graphicsData, ...graphicsData, ...graphicsData];

  return (
    <section id="graficos" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 w-full overflow-hidden">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Diseño <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Publicitario</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium">
            Creatividades de alto impacto diseñadas para capturar la atención y convertir clics en clientes.
          </p>
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
                onClick={() => openModal(item.id)}
              >
                <div className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#c9a961]/40 shadow-2xl">
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden bg-white/5">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* Click Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#c9a961]/90 flex items-center justify-center">
                        <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#c9a961] bg-[#c9a961]/10 px-3 py-1 rounded-full border border-[#c9a961]/20">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-[#c9a961] transition-colors tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-[10px] font-bold mt-1 uppercase tracking-widest">{item.client}</p>
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
      />
    </section>
  );
};

export default GraphicsCarousel;
