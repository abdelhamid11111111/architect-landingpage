'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { FiArrowDown } from 'react-icons/fi';

function CornerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M1 9 L1 1 L9 1"
        stroke="currentColor"
        strokeWidth="1.25"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
        className="corner-mark-path"
      />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const keywordRef = useRef<HTMLSpanElement | null>(null);
  const panelRef = useRef<HTMLSpanElement | null>(null);
  const imagePanelRef = useRef<HTMLSpanElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });

  const shapeOneX = useTransform(springX, [-1, 1], [-26, 26]);
  const shapeOneY = useTransform(springY, [-1, 1], [-18, 18]);
  const shapeTwoX = useTransform(springX, [-1, 1], [18, -18]);
  const shapeTwoY = useTransform(springY, [-1, 1], [14, -14]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(x * 2);
      my.set(y * 2);
    };
    section.addEventListener('mousemove', handleMove);
    return () => section.removeEventListener('mousemove', handleMove);
  }, [mx, my]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // registration marks draw in first, like a sheet being set on a drafting table
    tl.to('.corner-mark-path', {
      strokeDashoffset: 0,
      duration: 1,
      stagger: 0.06,
      ease: 'power2.out',
    })
      .from(
        '.hero-meta',
        { opacity: 0, y: 8, duration: 0.6, ease: 'power2.out' },
        '-=0.6'
      )
      // "DIA" shutter reveal on the keyword
      .set(keywordRef.current, { opacity: 1 })
      .fromTo(
        panelRef.current,
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'right', duration: 1.4, ease: 'power4.inOut' },
        '-=0.3'
      )
      .from(
        keywordRef.current,
        { yPercent: 30, opacity: 0, duration: 1.1, ease: 'power3.out' },
        '-=1.1'
      )
      // headline lines: mask reveal with a focus-pull (blur -> sharp)
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
        '-=1.1'
      )
      .from(
        '.hero-sub',
        { opacity: 0, y: 20, filter: 'blur(6px)', duration: 0.9, ease: 'power2.out' },
        '-=0.5'
      )
      .from(
        '.hero-cta',
        { opacity: 0, y: 16, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        '-=0.6'
      )
      // image: same shutter language as the keyword, unifying the two moments
      .from('.hero-frame', { scale: 1.06, duration: 1.8, ease: 'power3.out' }, '-=1.6')
      .fromTo(
        imagePanelRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'bottom', duration: 1.3, ease: 'power4.inOut' },
        '-=1.5'
      )
      .to('.hero-coords', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-ink pt-32 pb-16 blueprint-grid"
    >
      {/* soft lighting glow */}
      <div className="pointer-events-none absolute -top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-bronze/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 -left-1/4 w-[40vw] h-[40vw] rounded-full bg-bronze/10 blur-[120px]" />

      {/* floating drafting-tool motifs with mouse parallax */}
      <motion.div
        style={{ x: shapeOneX, y: shapeOneY }}
        className="hidden lg:block absolute top-[16%] right-[10%] w-40 h-40 border border-dashed border-sand/25 rounded-full compass-rotate"
      />
      <motion.div
        style={{ x: shapeTwoX, y: shapeTwoY }}
        className="hidden lg:block absolute bottom-[16%] left-[8%] w-24 h-24 border border-bronze/40"
      />
      <motion.div
        style={{ x: shapeOneX, y: shapeTwoY }}
        className="hidden lg:block absolute top-[40%] left-[15%] text-bronze/50 text-2xl leading-none"
      >
        +
      </motion.div>

      <div className="container-lux relative z-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <p className="hero-meta eyebrow mb-6 text-sand/90">
            Cabinet d&apos;architecture — Paris, depuis 2006
          </p>

          <h1 className="font-display text-offwhite leading-[0.95] text-[13vw] sm:text-[9vw] lg:text-[6.2vw]">
            <span className="overflow-hidden block">
              <span className="hero-line block">Dessiner des</span>
            </span>
            <span className="overflow-hidden block">
              <span className="hero-line block">
                espaces de{' '}
                <span className="relative inline-block align-baseline">
                  <span
                    ref={keywordRef}
                    className="font-serif italic text-bronze opacity-0"
                  >
                    lumière
                  </span>
                  <span
                    ref={panelRef}
                    className="absolute inset-0 bg-bronze"
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-8 max-w-md font-sans text-offwhite/60 text-base leading-relaxed">
            Atelier Verrier conçoit des architectures sur mesure où matière, lumière et
            silence composent une expérience sensible du lieu.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="hero-cta btn-lux btn-lux-light">
              Voir nos réalisations
            </a>
            <a href="#contact" className="hero-cta btn-lux btn-lux-light">
              Démarrer un projet
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="relative w-full max-w-sm ml-auto">
            {/* rotated edge label, editorial-portfolio touch */}
            <span className="hidden sm:block absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 origin-center font-sans text-[0.65rem] tracking-[0.3em] uppercase text-sand/50 whitespace-nowrap">
              Atelier Verrier — Paris
            </span>

            <div className="hero-frame relative aspect-[3/4] w-full overflow-hidden">
              <img
                src="https://picsum.photos/seed/atelier-hero/900/1200"
                alt="Villa contemporaine signée Atelier Verrier"
                className="w-full h-full object-cover contrast-[1.05] saturate-[0.95]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <span
                ref={imagePanelRef}
                className="absolute inset-0 bg-ink"
                style={{ transformOrigin: 'top' }}
              />
              <div className="absolute bottom-5 left-5 right-5 glass px-4 py-3">
                <p className="text-offwhite text-xs tracking-[0.2em] uppercase">
                  Villa Solstice — 2024
                </p>
              </div>

              {/* registration marks, viewfinder-style */}
              <CornerMark className="absolute top-3 left-3 w-5 h-5 text-bronze-light" />
              <CornerMark className="absolute top-3 right-3 w-5 h-5 text-bronze-light rotate-90" />
              <CornerMark className="absolute bottom-3 right-3 w-5 h-5 text-bronze-light rotate-180" />
              <CornerMark className="absolute bottom-3 left-3 w-5 h-5 text-bronze-light -rotate-90" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-lux relative z-10 mt-16 flex items-center justify-between gap-6">
        <p className="hero-coords opacity-0 hidden sm:block font-sans text-[0.65rem] tracking-[0.2em] text-offwhite/35 uppercase">
          48.8566° N, 2.3522° E — Paris · N. 128
        </p>
        <div className="hairline w-full max-w-[160px] hidden sm:block" style={{ background: 'rgba(250,248,245,0.2)' }} />
        <motion.a
          href="#services"
          className="flex items-center gap-3 text-offwhite/60 text-[0.7rem] tracking-[0.2em] uppercase shrink-0"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Découvrir <FiArrowDown />
        </motion.a>
      </div>
    </section>
  );
}