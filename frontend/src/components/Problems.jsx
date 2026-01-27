import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Users, Clock, AlertCircle } from 'lucide-react';
import { problemsData } from '../data/mockData';

const iconMap = {
  TrendingDown,
  Users,
  Clock,
  AlertCircle
};

const Problems = () => {
  return (
    <section id="problemas" className="py-16 md:py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            {problemsData.title}
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto font-medium">
            {problemsData.subtitle}
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {problemsData.problems.map((problem, index) => {
            const IconComponent = iconMap[problem.icon];
            
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white/[0.02] border border-red-900/20 rounded-3xl p-8 transition-all duration-500 hover:border-red-500/40 shadow-xl overflow-hidden h-full">
                  {/* Decorative glow */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-red-900/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-500"></div>
                  
                  {/* Icon */}
                  <div className="inline-flex p-4 rounded-xl bg-red-900/10 border border-red-500/20 text-red-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent size={28} strokeWidth={2} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-red-400 transition-colors tracking-tight">
                    {problem.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-lg md:text-xl font-medium">
            Si te identificas con alguno de estos problemas, <span className="text-[#c9a961]">tenemos la solución perfecta para ti</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problems;
