import type { FC } from "react";
import { navLinks } from "../lib/data";

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-alabaster px-6 sm:px-10 pt-20 pb-8">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-alabaster/10">
          <div className="md:col-span-2">
            <span className="font-display text-2xl tracking-[0.15em]">
              LITHOS
            </span>
            <p className="mt-5 text-sm text-alabaster/55 max-w-xs leading-relaxed">
              Atelier d'architecture basé à Paris, dédié aux résidences,
              intérieurs et lieux culturels d'exception.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-alabaster/40 mb-5">
              Navigation
            </p>
            <ul className="space-y-3 text-sm text-alabaster/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-alabaster transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest2 uppercase text-alabaster/40 mb-5">
              Suivez-nous
            </p>
            <ul className="space-y-3 text-sm text-alabaster/70">
              <li>
                <a href="https://instagram.com" className="hover:text-alabaster transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="hover:text-alabaster transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" className="hover:text-alabaster transition-colors">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-alabaster/40">
          <p>© {year} Lithos Architectes. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-alabaster/70 transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-alabaster/70 transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
