import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../data/mockData';
import metaPixel from '../lib/metaPixel';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    const isOpening = openIndex !== index;
    if (isOpening) {
      metaPixel.trackFAQInteraction(faqData[index].question);
    }
    setOpenIndex(isOpening ? index : null);
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a961]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight">
            Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">Frecuentes</span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium">
            Resolvemos tus dudas antes de empezar
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden
                         hover:border-[#c9a961]/40 transition-all duration-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#c9a961] transition-colors pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-[#c9a961]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 pt-2">
                      <p className="text-white/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-4">¿Tienes más preguntas?</p>
          <a 
            href="https://wa.me/59175938402?text=Hola,%20tengo%20algunas%20preguntas%20sobre%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => metaPixel.trackWhatsAppClick()}
            className="inline-block bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#c9a961]/40
                       text-white px-8 py-3 rounded-full font-bold transition-all duration-300"
          >
            Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
