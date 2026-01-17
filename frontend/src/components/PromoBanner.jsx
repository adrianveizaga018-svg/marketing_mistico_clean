import React from 'react';
import { motion } from 'framer-motion';

const PromoBanner = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-[#c9a961]/10 border border-[#c9a961]/20 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-[#c9a961] animate-pulse"></span>
              <span className="text-[#c9a961] text-xs uppercase tracking-widest font-black">Oferta Especial</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
              Impulsa tu Negocio con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto]">Presencia Web</span>
            </h2>
            
            <p className="text-lg text-white/60 mb-10 leading-relaxed font-medium">
              No dejes pasar más oportunidades. Creamos páginas web, tiendas online y landing pages optimizadas para convertir visitantes en clientes reales. Diseño premium, velocidad y estrategia en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://calendar.app.google/7Kjy2fZJmhGaNFef6" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#c9a961] hover:bg-white text-black font-black text-sm uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(201,169,97,0.3)] text-center shadow-lg"
              >
                Cotizar Ahora
              </a>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative group"
          >
            {/* Golden Abstract Shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#c9a961] to-transparent opacity-20 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Main Image Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-700 hover:scale-[1.02] hover:rotate-1">
              <div className="absolute inset-0 bg-[#c9a961]/10 mix-blend-overlay z-10 pointer-events-none"></div>
              <img 
                src="/promo_web.jpg" 
                alt="Desarrollo Web Premium" 
                className="w-full h-auto object-cover"
              />
              
              {/* Glass overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 z-20 pointer-events-none"></div>
            </div>

            {/* Floating Batch */}
            <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-xl border border-[#c9a961]/30 p-6 rounded-2xl shadow-xl animate-float z-30 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black text-[#c9a961]">100%</div>
                <div className="text-xs text-white/60 uppercase tracking-wider font-bold leading-tight">
                  Optimizado para<br/>Ventas
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
