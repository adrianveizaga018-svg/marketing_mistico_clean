import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { offerData } from '../data/mockData';

const Offer = () => {
  return (
    <section id="oferta" className="py-16 md:py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#c9a961]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#c9a961]/10 border border-[#c9a961]/20 px-5 py-2.5 rounded-full mb-6">
            <Sparkles size={16} className="text-[#c9a961]" />
            <span className="text-[#c9a961] text-xs uppercase tracking-widest font-black">{offerData.badge}</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            {offerData.title}
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto font-medium">
            {offerData.subtitle}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12">
          {offerData.packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${pkg.highlight ? 'md:scale-105' : ''}`}
            >
              <div className={`relative bg-white/[0.02] border ${pkg.highlight ? 'border-[#c9a961]/40' : 'border-white/10'} rounded-3xl p-8 transition-all duration-500 hover:border-[#c9a961]/60 shadow-xl overflow-hidden h-full flex flex-col`}>
                {/* Highlight Badge */}
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c9a961] to-[#d4af37] px-6 py-2 rounded-full">
                    <span className="text-black text-xs font-black uppercase tracking-widest">Más Popular</span>
                  </div>
                )}

                {/* Decorative glow */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 ${pkg.highlight ? 'bg-[#c9a961]/10' : 'bg-white/5'} rounded-full blur-3xl`}></div>
                
                {/* Package Name */}
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight relative z-10">
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl font-black text-[#c9a961]">{pkg.price}</span>
                </div>

                {/* Description */}
                <p className="text-white/50 text-sm mb-8">
                  {pkg.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#c9a961]/20 flex items-center justify-center mt-0.5">
                        <Check size={14} className="text-[#c9a961]" strokeWidth={3} />
                      </div>
                      <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="https://calendar.app.google/7Kjy2fZJmhGaNFef6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center ${pkg.highlight ? 'bg-gradient-to-r from-[#c9a961] to-[#d4af37] text-black' : 'bg-white/10 text-white border border-white/20'} font-black text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg`}
                >
                  {offerData.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#c9a961]/5 border border-[#c9a961]/20 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#c9a961]/20 flex items-center justify-center">
                <Check className="text-[#c9a961]" size={24} strokeWidth={3} />
              </div>
            </div>
            <h4 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">Garantía de Satisfacción</h4>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {offerData.guarantee}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Offer;
