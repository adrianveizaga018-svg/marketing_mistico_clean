import React, { lazy } from 'react';
import Hero from '../components/Hero';
import PageLayout from '../components/PageLayout';
import LazySection from '../components/LazySection';
import { homeFaqIds } from '../data/sitio';

// Página principal corta: 7 secciones. El detalle vive en las páginas internas.
const Pillars = lazy(() => import('../components/Pillars'));
const EventsBand = lazy(() => import('../components/EventsBand'));
const Cases = lazy(() => import('../components/Cases'));
const Process = lazy(() => import('../components/Process'));
const FAQ = lazy(() => import('../components/FAQ'));
const ContactQuick = lazy(() => import('../components/ContactQuick'));

const Home = () => (
  <PageLayout
    title="Marketing Místico | Vende más, organiza y protege tu negocio · La Paz"
    description="Ingeniería de sistemas y marketing en La Paz, Bolivia: publicidad, páginas web, sistemas a medida, chatbots, auditoría, mantenimiento e invitaciones digitales. Escríbenos por WhatsApp."
  >
    <Hero />
    <LazySection component={Pillars} anchor="pilares" />
    <LazySection component={EventsBand} />
    <LazySection component={Cases} anchor="casos" />
    <LazySection component={Process} anchor="proceso" />
    <LazySection component={FAQ} anchor="preguntas" ids={homeFaqIds} />
    <LazySection component={ContactQuick} anchor="contacto" />
  </PageLayout>
);

export default Home;
