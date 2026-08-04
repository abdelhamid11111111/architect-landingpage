import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`relative top-0 left-0 right-0 z-50 transition-all duration-700 ease-lux ${
        scrolled ? 'glass py-4 shadow-[0_1px_0_rgba(24,24,24,0.06)]' : 'py-7 bg-transparent'
      }`}
    >
      <nav className="container-lux flex items-center justify-between">
        <a href="#hero" className="font-display text-xl tracking-wide text-ink">
          Atelier <span className="italic text-bronze">Verrier</span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => setHovered(link.href)}
              onMouseLeave={() => setHovered(null)}
            >
              <a
                href={link.href}
                className="font-sans text-[0.72rem] tracking-[0.2em] uppercase text-ink/80 hover:text-ink transition-colors duration-300"
              >
                {link.label}
              </a>
              <AnimatePresence>
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-bronze"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden md:inline-flex btn-lux text-ink">
          Prendre rendez-vous
        </a>

        <button
          className="md:hidden flex flex-col gap-1.5 w-8"
          onClick={() => setOpen((o) => !o)}
          aria-label="Ouvrir le menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            className="h-[1px] w-full bg-ink origin-center"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="h-[1px] w-full bg-ink"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            className="h-[1px] w-full bg-ink origin-center"
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden glass"
          >
            <ul className="container-lux flex flex-col gap-6 py-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
