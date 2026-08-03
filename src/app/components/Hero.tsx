import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { FiArrowDown } from 'react-icons/fi';

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const keywordRef = useRef<HTMLSpanElement | null>(null);
  const panelRef = useRef<HTMLSpanElement | null>(null);

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
    // "DIA" cinematic reveal — the keyword is hidden behind a bronze panel
    // that sweeps away like a shutter, unveiling the word beneath.
    const tl = gsap.timeline({ delay: 0.4 });

    tl.set(keywordRef.current, { opacity: 1 })
      .fromTo(
        panelRef.current,
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'right', duration: 1.4, ease: 'power4.inOut' }
      )
      .from(
        keywordRef.current,
        { yPercent: 30, opacity: 0, duration: 1.1, ease: 'power3.out' },
        '-=1.1'
      )
      .from(
        '.hero-line',
        { yPercent: 110, opacity: 0, stagger: 0.12, duration: 1, ease: 'power4.out' },
        '-=0.9'
      )
      .from('.hero-sub', { opacity: 0, y: 20, duration: 0.9, ease: 'power2.out' }, '-=0.5')
      .from('.hero-cta', { opacity: 0, y: 16, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=0.6')
      .from('.hero-frame', { opacity: 0, scale: 1.08, duration: 1.6, ease: 'power3.out' }, '-=1.6');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-ink pt-32 pb-16"
    >
      {/* soft lighting glow */}
      <div className="pointer-events-none absolute -top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-bronze/20 blur-[140px]" />

      {/* floating geometric elements with mouse parallax */}
      <motion.div
        style={{ x: shapeOneX, y: shapeOneY }}
        className="hidden lg:block absolute top-[18%] right-[10%] w-40 h-40 border border-sand/30 rounded-full"
      />
      <motion.div
        style={{ x: shapeTwoX, y: shapeTwoY }}
        className="hidden lg:block absolute bottom-[16%] left-[8%] w-24 h-24 border border-bronze/40"
      />
      <motion.div
        style={{ x: shapeOneX, y: shapeTwoY }}
        className="hidden lg:block absolute top-[38%] left-[14%] w-3 h-3 bg-bronze rounded-full"
      />

      <div className="container-lux relative z-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 text-sand/90">Cabinet d'architecture — Paris, depuis 2006</p>

          <h1 className="font-display text-offwhite leading-[0.95] text-[13vw] sm:text-[9vw] lg:text-[6.2vw]">
            <span className="overflow-hidden block">
              <span className="hero-line block">Dessiner des</span>
            </span>
            <span className="overflow-hidden block">
              <span className="hero-line block">
                espaces de{' '}
                <span className="relative inline-block align-baseline">
                  <span ref={keywordRef} className="italic text-bronze opacity-0">
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
          <div className="hero-frame relative aspect-[3/4] w-full max-w-sm ml-auto overflow-hidden">
            <img
              src="https://picsum.photos/seed/atelier-hero/900/1200"
              alt="Villa contemporaine signée Atelier Verrier"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 glass px-4 py-3">
              <p className="text-offwhite text-xs tracking-[0.2em] uppercase">Villa Solstice — 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-lux relative z-10 mt-16 flex items-center justify-between">
        <div className="hairline w-full max-w-[220px] hidden sm:block" style={{ background: 'rgba(250,248,245,0.2)' }} />
        <motion.a
          href="#services"
          className="flex items-center gap-3 text-offwhite/60 text-[0.7rem] tracking-[0.2em] uppercase"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Découvrir <FiArrowDown />
        </motion.a>
      </div>
    </section>
  );
}
