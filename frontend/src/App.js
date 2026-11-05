import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/sonner";
import WhatsAppWidget from "./components/WhatsAppWidget";

// Lazy load route components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const LeadsDashboard = lazy(() => import("./pages/LeadsDashboard"));
const PillarPage = lazy(() => import("./pages/PillarPage"));
const Eventos = lazy(() => import("./pages/Eventos"));
const Auditoria = lazy(() => import("./pages/Auditoria"));
const Mantenimiento = lazy(() => import("./pages/Mantenimiento"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="w-12 h-12 border-4 border-[#c9a961]/20 border-t-[#c9a961] rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vende-mas" element={<PillarPage key="vende-mas" pillarId="vende-mas" />} />
            <Route path="/organiza" element={<PillarPage key="organiza" pillarId="organiza" />} />
            <Route path="/protege" element={<PillarPage key="protege" pillarId="protege" />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/mantenimiento" element={<Mantenimiento />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/gestion-leads" element={<LeadsDashboard />} />
          </Routes>
        </Suspense>
        {/* Botón flotante de WhatsApp: visible desde el primer segundo en todas las páginas */}
        <WhatsAppWidget />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
