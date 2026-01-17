import React from 'react';
import { motion } from 'framer-motion';

const PromoBanner = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[#c9a961]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Golden Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] rounded-[2rem] opacity-30 group-hover:opacity-60 blur-md transition-opacity duration-500"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden border border-[#c9a961]/30 shadow-2xl">
              <img 
                src="/promo_web.jpg" 
                alt="Impulsa tu negocio con Páginas Web y Tiendas Online" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
              
              {/* Overlay Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>

            {/* Floating Tag */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#c9a961] text-black font-black text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-[0_0_20px_rgba(201,169,97,0.4)] animate-float">
              Solución Destacada
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
