'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Hero() {
  const imagePanelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from('.hero-meta', { opacity: 0, y: 8, duration: 0.7, stagger: 0.08, ease: 'power2.out' })
      .from(
        '.hero-line',
        {
          yPercent: 110,
          filter: 'blur(10px)',
          opacity: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power4.out',
        },
        '-=0.4'
      )
      .from(
        '.hero-side',
        { opacity: 0, y: 16, duration: 0.9, ease: 'power2.out' },
        '-=0.7'
      )
      .from('.hero-caption', { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .fromTo(
        imagePanelRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'bottom', duration: 1.3, ease: 'power4.inOut' },
        '-=0.4'
      )
      .from(
        '.hero-frame',
        { scale: 1.06, duration: 1.6, ease: 'power3.out' },
        '-=1.3'
      )
      .from(
        '.hero-footer',
        { opacity: 0, y: 8, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative bg-offwhite pt-8 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 overflow-hidden"
    >
      <div className="container-lux">
        {/* utility row */}
        <div className="hero-meta flex items-start justify-between gap-4 mb-4 sm:mb-4 lg:mb-i4">
          <p className="eyebrow max-w-[60%] sm:max-w-none">
            Cabinet d&apos;architecture 
          </p>
          <a
            href="#projects"
            aria-label="Découvrir nos projets"
            /* shrink-0 + min-h/min-w keep this a valid 44px target on mobile,
               where the label is hidden and only the icon remains */
            className="group flex shrink-0 min-h-11 min-w-11 items-center justify-end gap-2 text-ink/70 hover:text-bronze transition-colors duration-300"
          >
            <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase hidden sm:inline">
              Découvrir nos projets
            </span>
            <FiArrowUpRight className="text-lg sm:text-xl transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* headline + side module */}
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-8 sm:gap-y-10 items-end mb-10 sm:mb-14 lg:mb-20">
          <div className="lg:col-span-8">
            <h1 className="font-display text-ink leading-[0.92] text-[11vw] xs:text-[9.5vw] sm:text-[7.5vw] lg:text-[5.6vw]">
              <span className="overflow-hidden block">
                <span className="hero-line block">Dessiner des</span>
              </span>
              <span className="overflow-hidden block">
                <span className="hero-line block font-serif italic text-bronze">
                  espaces <span className="text-ink/25 not-italic">——</span> de lumière
                </span>
              </span>
            </h1>
          </div>

          <div className="hero-side lg:col-span-4 flex flex-col gap-4 sm:gap-6">
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center font-sans text-[0.7rem] tracking-[0.18em] sm:tracking-[0.25em] uppercase text-ink underline underline-offset-4 decoration-bronze decoration-1 w-fit hover:text-bronze transition-colors duration-300"
            >
              Démarrer un projet
            </a>
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 xs:w-20 xs:h-20 shrink-0 overflow-hidden">
                <img
                  src="https://picsum.photos/seed/atelier-thumb/200/200"
                  alt="Aperçu d'un projet Atelier Verrier"
                  className="w-full h-full object-cover contrast-[1.05] saturate-[0.95]"
                />
                <a
                  href="#projects"
                  aria-label="Voir tous les projets"
                  className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-ink flex items-center justify-center after:absolute after:-inset-2.5 after:content-['']"
                >
                  <FiArrowUpRight className="text-offwhite text-sm" />
                </a>
              </div>
              <p className="font-sans text-sm text-ink/60 leading-relaxed">
                Concevoir des lieux intemporels, à faible impact, où la lumière dessine
                chaque espace.
              </p>
            </div>
          </div>
        </div>

        {/* project frame */}
        <div>
          {/* three metadata columns previously overran a 320px line at
              0.68rem + 0.2em tracking, so both scale down on small screens */}
          <div className="hero-caption flex items-center justify-between gap-2 mb-3 sm:mb-4 font-sans text-[0.58rem] xs:text-[0.62rem] sm:text-[0.68rem] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-ink/45">
            <span>Villa Solstice</span>
            <span>2024</span>
            <span>Résidentiel</span>
          </div>

          {/* 16:9 leaves the hero image only ~150px tall on a phone; a taller
              4:3 crop reads as a proper hero until there's width to spare */}
          <div className="hero-frame relative aspect-[4/3] sm:aspect-video w-full overflow-hidden">
            <img
              src="https://behnisch.com/img/asset/YXNzZXRzLzE2NTZfUGVubi1WTEVTVC8xNjU2X1Blbm4tVkxFU1RfQmVobmlzY2gtQXJjaGl0ZWt0dXJidWVyb18xMTI2Mi0wMV9Mb1Jlcy5KUEc/1656_Penn-VLEST_Behnisch-Architekturbuero_11262-01_LoRes.JPG?w=2200&fm=&q=&key=996bbe527859119a158433d6ed9b818f"
              alt="Villa contemporaine signée Atelier Verrier"
              className="w-full h-full object-cover contrast-[1.05] saturate-[0.95]"
              loading="eager"
            />
            <span
              ref={imagePanelRef}
              className="absolute inset-0 bg-offwhite"
              style={{ transformOrigin: 'bottom' }}
            />
          </div>

          <div className="hero-footer flex items-center justify-between gap-3 mt-2 sm:mt-4 font-sans text-[0.62rem] sm:text-[0.7rem] tracking-[0.12em] sm:tracking-[0.2em] uppercase text-ink/50">
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center hover:text-bronze transition-colors duration-300"
            >
              Projet suivant
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center hover:text-bronze transition-colors duration-300"
            >
              Voir le projet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}