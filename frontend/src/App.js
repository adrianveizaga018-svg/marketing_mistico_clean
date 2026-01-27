import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/sonner";

// Lazy load route components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const LeadsDashboard = lazy(() => import("./pages/LeadsDashboard"));

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
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/gestion-leads" element={<LeadsDashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
