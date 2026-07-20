import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'Coffee', path: '/coffee' },
    { name: 'Roasters', path: '/roasters' },
    { name: 'Space', path: '/space' },
    { name: 'Menu', path: '/menu' },
    { name: 'Journal', path: '/journal' },
    { name: 'Visit', path: '/visit' },
  ];

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out',
          scrolled ? 'bg-graphite/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col z-50">
            <Link to="/" className="font-display text-2xl tracking-tighter font-bold uppercase mask-text leading-none">
              Laboratorio Espresso
            </Link>
            <span className="font-mono text-[10px] text-warm-concrete mt-1 tracking-widest hidden md:inline-block">55.8624° N, 4.2578° W / GLASGOW</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center z-50">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "font-mono text-[12px] uppercase transition-opacity",
                  location.pathname.startsWith(link.path) ? "text-extraction-amber opacity-100" : "text-white opacity-60 hover:opacity-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-graphite z-40 flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col gap-8 items-center text-center">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    "font-display text-4xl uppercase tracking-widest",
                    location.pathname.startsWith(link.path) ? "text-extraction-amber" : "text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
