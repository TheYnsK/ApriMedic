import { Link, useLocation } from 'react-router-dom';
import { Brain, Layers, Wind, TestTube, BarChart3, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react'; // State eklendi
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobil menü durumu

  const links = [
    { name: 'GAN Model', path: '/gan', icon: Brain },
    { name: 'VAE', path: '/vae', icon: Layers },
    { name: 'Diffusion', path: '/diffusion', icon: Wind },
    { name: 'Teknik Analiz', path: '/technical', icon: BarChart3 },
    { name: 'CANLI DEMO', path: '/demo', icon: TestTube, isSpecial: true },
  ];

  return (
    <nav className="sticky top-4 z-50 mx-4">
      <div className="glass-panel rounded-2xl px-6 py-4 relative max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-12 h-12 transition-transform group-hover:scale-110 duration-300">
                <div className="absolute inset-0 bg-medic-primary/40 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                <Logo className="w-full h-full relative z-10 drop-shadow-lg" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
                Apri<span className="text-medic-primary">Medic</span>
            </span>
            </Link>

            {/* MASAÜSTÜ MENÜ (Telefonda gizli) */}
            <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;

                return (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                    link.isSpecial 
                        ? 'bg-medic-primary hover:bg-medic-primary/80 text-black font-bold shadow-lg shadow-medic-primary/25 ml-4' 
                        : isActive 
                        ? 'text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    {isActive && !link.isSpecial && (
                    <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    )}
                    <Icon size={18} />
                    <span>{link.name}</span>
                </Link>
                );
            })}
            </div>

            {/* MOBİL MENÜ BUTONU (Sadece telefonda görünür) */}
            <button
                className="md:hidden p-2 text-white bg-white/10 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* MOBİL MENÜ LİSTESİ */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden overflow-hidden mt-4 border-t border-white/10 pt-4"
                >
                    <div className="flex flex-col gap-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)} // Tıklayınca menüyü kapat
                                    className={`px-4 py-3 rounded-xl flex items-center gap-3 ${
                                        link.isSpecial 
                                        ? 'bg-medic-primary text-black font-bold mt-2' 
                                        : isActive 
                                            ? 'bg-white/10 text-white' 
                                            : 'text-slate-400'
                                    }`}
                                >
                                    <Icon size={20} />
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;