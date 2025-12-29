import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Demo from './pages/Demo';
import GANPage from './pages/GANPage';
import VAEPage from './pages/VAEPage';
import DiffusionPage from './pages/DiffusionPage';
import TechnicalPage from './pages/TechnicalPage'; // YENİ IMPORT
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gan" element={<GANPage />} />
        <Route path="/vae" element={<VAEPage />} />
        <Route path="/diffusion" element={<DiffusionPage />} />
        <Route path="/technical" element={<TechnicalPage />} /> {/* YENİ ROTA */}
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-medic-dark to-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-medic-primary/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-medic-secondary/20 rounded-full blur-[128px] pointer-events-none" />

        <Navbar />
        <main className="container mx-auto px-4 py-8 relative z-10">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;