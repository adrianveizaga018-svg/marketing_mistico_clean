import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MysticCursor from '../components/MysticCursor';
import LazySection from '../components/LazySection';

// Lazy load below-the-fold components
const Testimonials = lazy(() => import('../components/Testimonials'));
const Problems = lazy(() => import('../components/Problems'));
const Solution = lazy(() => import('../components/Solution'));
const Offer = lazy(() => import('../components/Offer'));
const Authority = lazy(() => import('../components/Authority'));
const Consequences = lazy(() => import('../components/Consequences'));
const FAQ = lazy(() => import('../components/FAQ'));
const CTA = lazy(() => import('../components/CTA'));
const ContactForm = lazy(() => import('../components/ContactForm'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
  return (
    <div className="bg-black relative min-h-screen lg:cursor-none">
      <MysticCursor />
      {/* Ambient Background Auras */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c9a961]/5 rounded-full blur-[120px] animate-ambient"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#c9a961]/3 rounded-full blur-[150px] animate-ambient" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-white/[0.02] rounded-full blur-[120px] animate-ambient" style={{ animationDelay: '-10s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Critical above-the-fold components - load immediately */}
        <Navbar />
        <Hero />

        {/* Below-the-fold components - lazy load */}
        <LazySection component={Testimonials} />
        <LazySection component={Problems} />
        <LazySection component={Solution} />
        <LazySection component={Offer} />
        <LazySection component={Authority} />
        <LazySection component={Consequences} />
        <LazySection component={FAQ} />
        <LazySection component={CTA} />
        <LazySection component={ContactForm} />
        <LazySection component={Footer} />
      </div>
    </div>
  );
};

export default Home;
