"use client";

import { useEffect, useState } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { navLinks } from "../lib/data";

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4"
    >
      <nav
        className={`w-full max-w-8xl flex items-center justify-between rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-alabaster/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(33,31,27,0.08)] px-6 py-3"
            : "bg-transparent px-2 py-4"
        }`}
      >
        <a
          href="#top"
          className="font-display text-xl tracking-[0.15em] text-ink"
          aria-label="LITHOS Architectes, retour en haut de page"
        >
          LITHOS
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="blueprint-line text-sm text-ink/80 hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full border border-ink/15 px-5 py-2 text-sm text-ink hover:bg-ink hover:text-alabaster transition-colors duration-300"
        >
          Prendre rendez-vous
        </a>

        <button
          type="button"
          className="md:hidden text-ink text-sm tracking-widest"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "FERMER" : "MENU"}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-4 right-4 rounded-3xl bg-alabaster shadow-xl p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-ink text-base"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full border border-ink/15 px-5 py-2 text-sm text-ink"
          >
            Prendre rendez-vous
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
