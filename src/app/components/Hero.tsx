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
    <section id="hero" className="relative bg-offwhite pt-40 pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
      <div className="container-lux">
        {/* utility row */}
        <div className="hero-meta flex items-start justify-between mb-16 lg:mb-24">
          <p className="eyebrow">Cabinet d&apos;architecture — Paris, depuis 2006</p>
          <a
            href="#projects"
            className="group flex items-center gap-2 text-ink/70 hover:text-bronze transition-colors duration-300"
          >
            <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase hidden sm:inline">
              Découvrir nos projets
            </span>
            <FiArrowUpRight className="text-xl transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* headline + side module */}
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-10 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-8">
            <h1 className="font-display text-ink leading-[0.92] text-[13vw] sm:text-[9vw] lg:text-[5.6vw]">
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

          <div className="hero-side lg:col-span-4 flex flex-col gap-6">
            <a
              href="#contact"
              className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-ink underline underline-offset-4 decoration-bronze decoration-1 w-fit hover:text-bronze transition-colors duration-300"
            >
              Démarrer un projet
            </a>
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 shrink-0 overflow-hidden">
                <img
                  src="https://picsum.photos/seed/atelier-thumb/200/200"
                  alt="Aperçu d'un projet Atelier Verrier"
                  className="w-full h-full object-cover contrast-[1.05] saturate-[0.95]"
                />
                <a
                  href="#projects"
                  aria-label="Voir tous les projets"
                  className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-ink flex items-center justify-center"
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
          <div className="hero-caption flex items-center justify-between mb-4 font-sans text-[0.68rem] tracking-[0.2em] uppercase text-ink/45">
            <span>Villa Solstice</span>
            <span>2024</span>
            <span>Résidentiel</span>
          </div>

          <div className="hero-frame relative aspect-[16/9] w-full overflow-hidden">
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

          <div className="hero-footer flex items-center justify-between mt-4 font-sans text-[0.7rem] tracking-[0.2em] uppercase text-ink/50">
            <a href="#projects" className="hover:text-bronze transition-colors duration-300">
              Projet suivant
            </a>
            <a href="#projects" className="hover:text-bronze transition-colors duration-300">
              Voir le projet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}