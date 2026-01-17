import React from 'react';
import { motion } from 'framer-motion';
import { testimonialsData } from '../data/mockData';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c9a961]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Lo Que Dicen Nuestros{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#c9a961] to-[#d4af37]">
              Clientes
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium">
            Resultados reales de marcas que confiaron en nosotros
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 h-full
                            hover:border-[#c9a961]/40 transition-all duration-500 shadow-2xl
                            hover:shadow-[0_0_30px_rgba(201,169,97,0.15)] relative overflow-hidden">
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-[#c9a961]" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Quote */}
                  <p className="text-white/80 italic leading-relaxed mb-8 text-base">
                    "{testimonial.content}"
                  </p>

                  {/* Divider */}
                  <div className="w-16 h-[2px] bg-gradient-to-r from-[#c9a961] to-transparent mx-auto mb-6"></div>

                  {/* Author Info */}
                  <div className="text-center">
                    <h4 className="text-white font-bold text-lg mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#c9a961] text-sm font-semibold mb-0.5">
                      {testimonial.role}
                    </p>
                    <p className="text-white/40 text-xs uppercase tracking-wider">
                      {testimonial.company}
                    </p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 mt-5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-[#c9a961]"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
