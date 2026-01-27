import React from 'react';
import { motion } from 'framer-motion';
import { processData } from '../data/mockData';
import { Search, Lightbulb, Rocket, BarChart3, TrendingUp } from 'lucide-react';

const iconMap = {
  "01": Search,      // Diagnóstico
  "02": Lightbulb,   // Estrategia
  "03": Rocket,      // Ejecución
  "04": BarChart3,   // Optimización
  "05": TrendingUp   // Escalamiento
};

const Process = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a961]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            {processData.title}
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium">
            {processData.subtitle}
          </p>
        </motion.div>

        {/* Timeline - Desktop Horizontal */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          {/* Connecting Line */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9a961]/20 via-[#c9a961]/40 to-[#c9a961]/20"></div>
            <div className="flex justify-between relative">
              {processData.steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a961] to-[#d4af37] 
                                flex items-center justify-center shadow-[0_0_30px_rgba(201,169,97,0.4)]">
                    {React.createElement(iconMap[step.number], {
                      className: "w-8 h-8 text-black",
                      strokeWidth: 2.5
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Steps Cards */}
          <div className="grid grid-cols-5 gap-6">
            {processData.steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 h-full
                              hover:border-[#c9a961]/40 transition-all duration-300
                              hover:shadow-[0_0_30px_rgba(201,169,97,0.15)]">
                  <div className="text-[#c9a961]/30 text-4xl font-black mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#c9a961] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline - Mobile/Tablet Vertical */}
        <div className="lg:hidden max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c9a961]/20 via-[#c9a961]/40 to-[#c9a961]/20"></div>

            <div className="space-y-8">
              {processData.steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-24"
                >
                  {/* Icon Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a961] to-[#d4af37]
                              flex items-center justify-center shadow-[0_0_30px_rgba(201,169,97,0.4)]"
                  >
                    {React.createElement(iconMap[step.number], {
                      className: "w-8 h-8 text-black",
                      strokeWidth: 2.5
                    })}
                  </motion.div>

                  {/* Content Card */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6
                                hover:border-[#c9a961]/40 transition-all duration-300">
                    <div className="text-[#c9a961]/30 text-2xl md:text-3xl font-black mb-2">
                      {step.number}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white mb-2 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
