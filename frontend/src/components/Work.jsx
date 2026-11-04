import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { workSection, projects } from '../data/landing';
import SectionHeader from './SectionHeader';
import SwipeHint from './SwipeHint';

const ProjectCard = ({ project }) => (
  <a
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`group flex flex-col bg-white/[0.03] border border-white/10 hover:border-[#c9a961]/40 rounded-3xl overflow-hidden transition-colors h-full ${
      project.featured ? 'lg:col-span-2' : ''
    }`}
  >
    <div className={`overflow-hidden bg-white/5 ${project.featured ? 'aspect-[16/10] lg:aspect-[16/7]' : 'aspect-[16/10]'}`}>
      <img
        src={project.image}
        alt={`Trabajo para ${project.client}`}
        width="800"
        height="500"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <p className="text-[#c9a961] text-[11px] uppercase tracking-[0.16em] font-black mb-1.5">{project.type}</p>
      <h3 className="text-white text-lg font-black leading-snug mb-2">{project.client}</h3>
      <p className="text-white/65 text-sm leading-relaxed mb-4">{project.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-white font-bold text-sm group-hover:text-[#c9a961] transition-colors">
        {project.linkLabel} <ArrowUpRight size={16} />
      </span>
    </div>
  </a>
);

const Work = () => (
  <section id="trabajos" className="py-12 md:py-20 bg-black scroll-mt-16">
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader {...workSection} />
      <div className="snap-row md:grid-cols-2 lg:grid-cols-3 md:gap-5 max-w-6xl mx-auto">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <SwipeHint text="Desliza para ver más trabajos" />
      <div className="text-center mt-6 md:mt-10">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 border border-white/25 text-white hover:bg-white/10 font-semibold text-sm px-7 py-3.5 rounded-full transition-colors"
        >
          Ver todo el portafolio <ArrowRight size={16} className="text-[#c9a961]" />
        </Link>
      </div>
    </div>
  </section>
);

export default Work;
