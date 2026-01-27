import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, BarChart, Shield, ArrowRight } from 'lucide-react';
import { solutionData } from '../data/mockData';

const iconMap = {
  Target,
  Zap,
  BarChart,
  Shield
};

const Solution = () => {
  return (
    <section id="solucion" className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a961]/10 blur-[150px] rounded-full pointer-events-none"></div>

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
            <span className="w-2 h-2 rounded-full bg-[#c9a961] animate-pulse"></span>
            <span className="text-[#c9a961] text-xs uppercase tracking-widest font-black">{solutionData.badge}</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto]">
              {solutionData.title}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-medium">
            {solutionData.subtitle}
          </p>
        </motion.div>

        {/* Transformation Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              {/* Before */}
              <div className="text-center md:text-right">
                <p className="text-sm uppercase tracking-widest text-red-400/60 font-black mb-2">Antes</p>
                <p className="text-white/40 text-sm md:text-base">{solutionData.transformation.before}</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-[#c9a961] flex items-center justify-center">
                  <ArrowRight className="text-black" size={24} strokeWidth={3} />
                </div>
              </div>

              {/* After */}
              <div className="text-center md:text-left">
                <p className="text-sm uppercase tracking-widest text-[#c9a961] font-black mb-2">Después</p>
                <p className="text-white/80 text-sm md:text-base font-semibold">{solutionData.transformation.after}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {solutionData.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:border-[#c9a961]/40 shadow-xl overflow-hidden h-full">
                  {/* Decorative glow */}
                  <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#c9a961]/5 rounded-full blur-3xl group-hover:bg-[#c9a961]/15 transition-all duration-500"></div>
                  
                  {/* Icon */}
                  <div className="inline-flex p-4 rounded-xl bg-[#c9a961]/10 border border-[#c9a961]/20 text-[#c9a961] mb-6 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent size={28} strokeWidth={2} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-[#c9a961] transition-colors tracking-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;
