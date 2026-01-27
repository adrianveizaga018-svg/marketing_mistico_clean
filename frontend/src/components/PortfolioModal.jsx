import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { graphicsData, portfolioDetails } from '../data/mockData';
import * as Icons from 'lucide-react';
import metaPixel from '../lib/metaPixel';

const PortfolioModal = ({ isOpen, projectId, onClose, onNavigate, projectData = [] }) => {
  // If no specific data passed, try to use graphicsData as fallback (for backward compatibility if needed)
  // or better, just use the passed data. 
  
  useEffect(() => {
    if (isOpen && projectId) {
      const project = projectData.find(p => p.id === projectId);
      if (project) {
        metaPixel.trackPortfolioView(project.title);
      }
    }
  }, [isOpen, projectId, projectData]);

  if (!isOpen || !projectId) return null;

  const project = projectData.find(p => p.id === projectId);
  const details = portfolioDetails[projectId] || { 
    // Fallback details if specific case study data is missing
    problem: "El cliente buscaba elevar su presencia digital y conectar con su audiencia objetivo de manera efectiva.",
    solution: "Desarrollamos una solución a medida enfocada en la calidad visual y la conversión, utilizando las últimas tendencias del mercado.",
    results: [
      { label: "Satisfacción", value: "100%", icon: "Star" },
      { label: "Entrega", value: "A Tiempo", icon: "Clock" },
      { label: "Calidad", value: "Premium", icon: "CheckCircle" }
    ]
  };

  if (!project) return null;

  const handlePrevious = () => {
    const currentIndex = projectData.findIndex(p => p.id === projectId);
    const prevIndex = currentIndex === 0 ? projectData.length - 1 : currentIndex - 1;
    onNavigate(projectData[prevIndex].id);
  };

  const handleNext = () => {
    const currentIndex = projectData.findIndex(p => p.id === projectId);
    const nextIndex = currentIndex === projectData.length - 1 ? 0 : currentIndex + 1;
    onNavigate(projectData[nextIndex].id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/20 rounded-3xl shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20
                     border border-white/20 flex items-center justify-center transition-all duration-300
                     hover:rotate-90"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full
                     bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center
                     transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full
                     bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center
                     transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Project Image */}
            <div className="mb-8">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={project.image || project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-[#c9a961]/10 border border-[#c9a961]/30 rounded-full
                               text-[#c9a961] text-sm font-black uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-white/40 text-sm font-semibold uppercase tracking-wider">
                  {project.client}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                {project.title}
              </h2>
            </div>

            {/* Problem, Solution, Results */}
            <div className="space-y-8">
              {/* Problem */}
              <div>
                <h3 className="text-2xl font-black text-[#c9a961] mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#c9a961]/20 flex items-center justify-center text-lg">
                    ⚠️
                  </span>
                  El Desafío
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {details.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="text-2xl font-black text-[#c9a961] mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#c9a961]/20 flex items-center justify-center text-lg">
                    💡
                  </span>
                  Nuestra Solución
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {details.solution}
                </p>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-2xl font-black text-[#c9a961] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#c9a961]/20 flex items-center justify-center text-lg">
                    📈
                  </span>
                  Resultados Medibles
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {details.results.map((result, index) => {
                    const IconComponent = Icons[result.icon];
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-6
                                 hover:border-[#c9a961]/40 transition-all duration-300
                                 hover:shadow-[0_0_30px_rgba(201,169,97,0.15)]"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {IconComponent && (
                            <div className="w-10 h-10 rounded-xl bg-[#c9a961]/10 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-[#c9a961]" />
                            </div>
                          )}
                          <div className="text-3xl font-black text-[#c9a961]">
                            {result.value}
                          </div>
                        </div>
                        <div className="text-white/60 text-sm font-semibold uppercase tracking-wider">
                          {result.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/60 mb-4 text-center">
                ¿Quieres resultados similares para tu negocio?
              </p>
              <div className="flex justify-center">
                <a
                  href="https://calendar.app.google/NKQGyQizTe4m4R8a6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => metaPixel.trackSchedule()}
                  className="inline-block bg-gradient-to-r from-[#c9a961] to-[#d4af37] text-black
                           px-8 py-4 rounded-full font-black text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(201,169,97,0.5)]
                           transition-all duration-300"
                >
                  AGENDA TU ASESORÍA GRATUITA
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PortfolioModal;
