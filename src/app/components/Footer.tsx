import { PiInstagramLogoLight, PiLinkedinLogoLight, PiPinterestLogoLight } from 'react-icons/pi';
import { navLinks } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative bg-ink pt-14 sm:pt-20 pb-8">
      <div className="container-lux">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-10 sm:mb-16">
          <div>
            <p className="font-display text-xl xs:text-2xl text-offwhite mb-3 sm:mb-4">
              Atelier <span className="italic text-bronze">Verrier</span>
            </p>
            <p className="font-sans text-sm text-offwhite/40 leading-relaxed max-w-[220px]">
              Cabinet d'architecture et de design d'intérieur basé à Paris, depuis 2006.
            </p>
          </div>

          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-offwhite/40 mb-5">Navigation</p>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center font-sans text-sm text-offwhite/70 hover:text-bronze transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-offwhite/40 mb-5">Contact</p>
            <ul className="flex flex-col gap-1 font-sans text-sm text-offwhite/70">
              <li className="py-1">14 rue des Beaux-Arts, 75006 Paris</li>
              <li>
                <a
                  href="tel:+33142860715"
                  className="inline-flex min-h-11 items-center hover:text-bronze transition-colors"
                >
                  +33 1 42 86 07 15
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@atelier-verrier.fr"
                  className="inline-flex min-h-11 items-center break-all hover:text-bronze transition-colors"
                >
                  contact@atelier-verrier.fr
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-offwhite/40 mb-5">Suivez-nous</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-11 h-11 rounded-full border border-offwhite/20 flex items-center justify-center hover:border-bronze hover:text-bronze transition-colors text-offwhite/70">
                <PiInstagramLogoLight className="text-lg" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-11 h-11 rounded-full border border-offwhite/20 flex items-center justify-center hover:border-bronze hover:text-bronze transition-colors text-offwhite/70">
                <PiLinkedinLogoLight className="text-lg" />
              </a>
              <a href="#" aria-label="Pinterest" className="w-11 h-11 rounded-full border border-offwhite/20 flex items-center justify-center hover:border-bronze hover:text-bronze transition-colors text-offwhite/70">
                <PiPinterestLogoLight className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mb-8" style={{ background: 'rgba(250,248,245,0.12)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-offwhite/35">© 2026 Atelier Verrier. Tous droits réservés.</p>
          <p className="font-sans text-xs text-offwhite/35">Mentions légales — Politique de confidentialité</p>
        </div>
      </div>
    </footer>
  );
}
