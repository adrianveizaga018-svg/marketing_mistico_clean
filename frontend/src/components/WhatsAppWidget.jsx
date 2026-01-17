import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, Sparkles, TrendingUp, Layout, Zap } from 'lucide-react';
import { footerData } from '../data/mockData';
import metaPixel from '../lib/metaPixel';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = footerData.whatsapp.replace(/\s/g, '');
  
  const contactOptions = [
    {
      id: 'ads',
      title: 'Pauta Publicitaria',
      subtitle: 'Escala tus ventas con Meta Ads',
      icon: <TrendingUp className="w-5 h-5" />,
      message: 'Hola! Me interesa potenciar mi marca con Pauta Publicitaria Mística. 📈',
      color: 'from-[#c9a961] to-[#d4af37]'
    },
    {
      id: 'web',
      title: 'Desarrollo Web',
      subtitle: 'Sitios que convierten y cautivan',
      icon: <Layout className="w-5 h-5" />,
      message: 'Hola! Quiero información sobre sus servicios de Desarrollo Web Premium. 💻',
      color: 'from-[#c9a961] to-[#d4af37]'
    },
    {
      id: 'strategy',
      title: 'Estrategia Integral',
      subtitle: 'Toma el control de tu mercado',
      icon: <Zap className="w-5 h-5" />,
      message: 'Hola! Necesito una Estrategia 360° para dominar mi sector. ⚡',
      color: 'from-[#c9a961] to-[#d4af37]'
    }
  ];

  const handleOptionClick = (message) => {
    metaPixel.trackWhatsAppClick();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] mb-4 overflow-hidden"
          >
            {/* Widget Container */}
            <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1a1a1a] to-black p-6 border-b border-white/5 relative">
                <div className="absolute top-0 right-0 p-4">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a961] to-[#d4af37] flex items-center justify-center shadow-lg">
                      <Sparkles className="text-black" size={28} />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse"></span>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg tracking-tight">Conserje Místico</h3>
                    <p className="text-green-500 text-[10px] uppercase tracking-widest font-black flex items-center gap-1">
                      En línea ahora
                    </p>
                  </div>
                </div>
                
                <p className="mt-4 text-white/50 text-xs font-medium leading-relaxed">
                  Bienvenido a la experiencia mística. ¿En qué área podemos potenciar tu negocio hoy?
                </p>
              </div>

              {/* Options */}
              <div className="p-4 space-y-3">
                {contactOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleOptionClick(option.message)}
                    className="w-full group flex items-center gap-4 p-4 bg-white/[0.03] hover:bg-[#c9a961] border border-white/5 hover:border-[#c9a961] rounded-2xl transition-all duration-300 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-black/20 flex items-center justify-center text-[#c9a961] group-hover:text-black transition-colors">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white group-hover:text-black font-black text-sm uppercase tracking-tight">
                        {option.title}
                      </p>
                      <p className="text-white/40 group-hover:text-black/60 text-[10px] font-bold">
                        {option.subtitle}
                      </p>
                    </div>
                    <Send className="w-4 h-4 text-white/20 group-hover:text-black transition-colors" />
                  </motion.button>
                ))}
              </div>

              {/* Footer Widget */}
              <div className="p-4 bg-black/40 text-center">
                <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">
                  Respuesta media: &lt; 15 min
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group relative ${
          isOpen ? 'bg-white text-black rotate-90' : 'bg-[#25D366] text-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              className="relative"
            >
              <MessageCircle size={32} fill="currentColor" className="text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#25D366] rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute -top-12 right-0 bg-black/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest font-black opacity-0 group-hover:opacity-100 transition-all border border-[#c9a961]/30 shadow-xl whitespace-nowrap pointer-events-none">
            Conserje Disponible ✨
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;
