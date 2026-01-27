import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { consequencesData } from '../data/mockData';
import AnimatedCounter from './AnimatedCounter';

const Consequences = () => {
  return (
    <section id="consecuencias" className="py-16 md:py-24 bg-gradient-to-b from-black via-[#1a0a0a] to-black relative overflow-hidden">
      {/* Background Elements - Red/Orange for urgency */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>

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
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-5 py-2.5 rounded-full mb-6">
            <AlertTriangle size={16} className="text-orange-400" />
            <span className="text-orange-400 text-xs uppercase tracking-widest font-black">{consequencesData.badge}</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            {consequencesData.title}
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-medium">
            {consequencesData.subtitle}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16">
          {consequencesData.stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white/[0.02] border border-orange-500/20 rounded-3xl p-8 text-center transition-all duration-500 hover:border-orange-500/40 shadow-xl">
                <div className="text-4xl md:text-5xl font-black text-orange-400 mb-3 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-white font-bold text-base md:text-lg mb-2">
                  {stat.label}
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Urgency vs Action Comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: Consequences of inaction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-red-900/5 border border-red-500/20 rounded-3xl p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="text-red-400" size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {consequencesData.urgency.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {consequencesData.urgency.points.map((point, idx) => (
                  <li key={idx} className="text-white/70 text-base md:text-lg leading-relaxed flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{point.split(' ')[0]}</span>
                    <span>{point.substring(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Benefits of taking action */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-[#c9a961]/5 border border-[#c9a961]/30 rounded-3xl p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#c9a961]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-[#c9a961]" size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {consequencesData.action.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {consequencesData.action.points.map((point, idx) => (
                  <li key={idx} className="text-white/80 text-base md:text-lg leading-relaxed flex items-start gap-3 font-medium">
                    <span className="text-xl flex-shrink-0">{point.split(' ')[0]}</span>
                    <span>{point.substring(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-lg md:text-xl mb-6 font-medium">
            La decisión es tuya. ¿Sigues esperando o empiezas a crecer hoy?
          </p>
          <a
            href="https://calendar.app.google/7Kjy2fZJmhGaNFef6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a961] via-[#fff5d1] to-[#c9a961] animate-shimmer bg-[length:200%_auto] text-black font-black text-sm uppercase tracking-[0.2em] px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(201,169,97,0.4)] hover:shadow-[0_0_50px_rgba(201,169,97,0.6)]"
          >
            Empieza Hoy - Agenda Gratis
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Sparkles = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" fill="currentColor" />
    <path d="M19 3L19.5 5L21.5 5.5L19.5 6L19 8L18.5 6L16.5 5.5L18.5 5L19 3Z" fill="currentColor" />
    <path d="M19 16L19.5 18L21.5 18.5L19.5 19L19 21L18.5 19L16.5 18.5L18.5 18L19 16Z" fill="currentColor" />
  </svg>
);

export default Consequences;
