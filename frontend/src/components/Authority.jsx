import React from 'react';
import { Award } from 'lucide-react';
import { autorityData } from '../data/mockData';

const Authority = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1f2e] to-[#0f1419]">
      <div className="container mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {autorityData.stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center transform hover:scale-105 transition-transform"
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c9a961] to-[#d4af37] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Authority Statement */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#7c3aed]/10 to-[#c9a961]/10 border border-[#c9a961]/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, #c9a961 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#c9a961]/20 p-4 rounded-full">
                  <Award className="text-[#c9a961]" size={32} />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">
                {autorityData.badge}
              </h3>

              <p className="text-lg text-gray-300 text-center leading-relaxed">
                {autorityData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;
