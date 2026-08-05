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
        scrolled
          ? 'glass py-3 sm:py-4 shadow-[0_1px_0_rgba(24,24,24,0.06)]'
          : 'py-4 sm:py-6 lg:py-7 bg-transparent'
      }`}
    >
      <nav className="container-lux flex items-center justify-between gap-4">
        <a href="#hero" className="font-display text-lg xs:text-xl tracking-wide text-ink">
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

        {/* 44x44 tap target on the button itself, with the bars in an inner
            24px box. Previously w-8 and p-3 were on the same element, and
            with border-box sizing the padding ate the width down to 8px, so
            only a stub of the icon rendered. */}
        <button
          className="md:hidden flex h-11 w-11 shrink-0 items-center justify-end"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          <span className="flex w-6 flex-col gap-1.5">
            {/* bar centres sit 7px apart (1px bar + 6px gap), so the outer
                bars travel exactly 7px to meet in the middle as an X */}
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
              className="h-px w-full bg-ink origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="h-px w-full bg-ink"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
              className="h-px w-full bg-ink origin-center"
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            /* absolute + top-full lifts the panel out of the header's normal
               flow so it floats over the hero instead of pushing it down.
               The header already carries z-50, so it stacks above the page. */
            className="md:hidden absolute top-full left-0 right-0 overflow-hidden bg-offwhite/95 backdrop-blur-xl border-t border-ink/10 shadow-[0_18px_40px_-24px_rgba(24,24,24,0.45)]"
          >
            <ul className="container-lux flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    /* flex + min-h-11 gives each row a full 44px touch target
                       without needing the large gap-6 that used to space them */
                    className="flex min-h-11 items-center font-serif text-xl xs:text-2xl text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}

              {/* the desktop CTA lives outside the nav list, so it is repeated
                  here to keep it reachable while the mobile menu is open */}
              <li className="mt-3 pt-4 border-t border-ink/10">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-lux text-ink w-full"
                >
                  Prendre rendez-vous
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
