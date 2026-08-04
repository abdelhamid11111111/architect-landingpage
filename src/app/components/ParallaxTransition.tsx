'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi';
import { projects } from '../data/content';
import { useTextReveal } from '../hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

// backdrop is the wide establishing shot, featured is the tilted foreground
// chip - reusing real project data (instead of decorative placeholders) so
// this break reads as a preview of the Réalisations section right after it.
const backdrop = projects[0];
const featured = projects[1];

export default function ParallaxTransition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const chipRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'words', stagger: 0.025 });

  useEffect(() => {
    const section = sectionRef.current;
    const chip = chipRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // depth layers only translate on wider viewports - on touch/mobile the
      // scrub math fights with address-bar resize and just reads as jitter.
      mm.add('(min-width: 768px)', () => {
        const scrollOpts = { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true };
        gsap.to('.px-bg', { yPercent: -16, scale: 1.12, ease: 'none', scrollTrigger: scrollOpts });
        gsap.to('.px-grid', { yPercent: -8, ease: 'none', scrollTrigger: scrollOpts });
        gsap.to('.px-ghost', { yPercent: -4, ease: 'none', scrollTrigger: scrollOpts });
        gsap.to('.px-chip-track', { yPercent: -38, ease: 'none', scrollTrigger: scrollOpts });
        gsap.to('.px-text', { yPercent: -22, ease: 'none', scrollTrigger: scrollOpts });
      });

      gsap.fromTo(
        '.px-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power2.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: section, start: 'top 65%', end: 'top 25%', scrub: true },
        }
      );

      gsap.fromTo(
        '.px-chip',
        { opacity: 0, y: 50, rotate: -9 },
        {
          opacity: 1,
          y: 0,
          rotate: -5,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );

      gsap.from('.px-eyebrow', {
        opacity: 0,
        y: 10,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%' },
      });

      gsap.to('.px-cue-dot', {
        y: 14,
        opacity: 0,
        repeat: -1,
        duration: 1.3,
        ease: 'power2.in',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top' },
      });
    }, section);

    // fine-pointer only: the featured chip tilts gently toward the cursor,
    // layered on top of its own scroll-scrub translate above. GSAP composites
    // transform components per-property, so the two tweens don't fight.
    let quickX: ReturnType<typeof gsap.quickTo> | null = null;
    let quickY: ReturnType<typeof gsap.quickTo> | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (e.clientY - bounds.top) / bounds.height - 0.5;
      quickX?.(relX * -16);
      quickY?.(relY * 16);
    };

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (hasFinePointer && chip) {
      quickX = gsap.quickTo(chip, 'rotateY', { duration: 0.7, ease: 'power3.out' });
      quickY = gsap.quickTo(chip, 'rotateX', { duration: 0.7, ease: 'power3.out' });
      section.addEventListener('pointermove', handlePointerMove);
    }

    return () => {
      ctx.revert();
      section.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[145vh] overflow-hidden bg-charcoal"
    >
      {/* backdrop photography */}
      <div className="px-bg absolute inset-0 will-change-transform">
        <img
          src={backdrop.image}
          alt=""
          className="w-full h-full object-cover contrast-[1.05] saturate-[0.9] opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/45 to-charcoal/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      {/* drafting-table grid: faint hairlines + corner ticks for an
          architectural blueprint texture behind the copy */}
      <div className="px-grid absolute inset-0 opacity-[0.14]">
        <div className="absolute inset-x-0 top-1/3 h-px bg-offwhite/40" />
        <div className="absolute inset-x-0 top-2/3 h-px bg-offwhite/40" />
        <div className="absolute inset-y-0 left-1/3 w-px bg-offwhite/40" />
        <div className="absolute inset-y-0 left-2/3 w-px bg-offwhite/40" />
      </div>

      {/* oversized ghost wordmark, slowest layer, pure background texture */}
      <div className="px-ghost absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-display text-[26vw] leading-none text-transparent"
          style={{ WebkitTextStroke: '1px rgba(250,248,245,0.06)' }}
        >
          Atelier
        </span>
      </div>

      {/* foreground content */}
      <div className="px-text absolute inset-0 flex items-center">
        <div className="container-lux w-full">
          <div className="grid lg:grid-cols-12 gap-x-8 gap-y-14 items-center">
            <div className="lg:col-span-8">
              <p className="px-eyebrow eyebrow text-sand mb-6">Philosophie — Atelier Verrier</p>

              <h2
                ref={titleRef}
                className="font-display italic text-offwhite leading-[1.05] text-[9vw] sm:text-[6vw] lg:text-[3.6vw] max-w-3xl"
              >
                La lumière révèle la forme,{' '}
                <span className="text-bronze-light not-italic">la matière</span> raconte le
                temps.
              </h2>

              <div className="px-rule hairline-bronze w-40 mt-8 mb-6" />

              <p className="font-sans text-sm sm:text-base text-offwhite/60 leading-relaxed max-w-md">
                Chaque projet naît d&apos;un dialogue entre le site, la lumière naturelle et les
                usages de ceux qui l&apos;habitent — jamais d&apos;un style imposé.
              </p>
            </div>

            {/* floating featured-project chip, independent parallax + pointer tilt */}
            <div className="lg:col-span-4 hidden sm:block" style={{ perspective: '1000px' }}>
              <div className="px-chip-track">
                <div
                  ref={chipRef}
                  className="px-chip glass w-full max-w-[300px] ml-auto overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative aspect-[4/5]">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover contrast-[1.05] saturate-[0.95]"
                    />
                    <a
                      href="#projects"
                      aria-label={`Voir le projet ${featured.title}`}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ink/80 backdrop-blur flex items-center justify-center hover:bg-bronze transition-colors duration-300"
                    >
                      <FiArrowUpRight className="text-offwhite text-base" />
                    </a>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between font-sans text-[0.65rem] tracking-[0.15em] uppercase text-offwhite/70">
                    <span>{featured.title}</span>
                    <span className="text-offwhite/40">{featured.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-offwhite/40">
        <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase">Continuer</span>
        <FiArrowDown className="px-cue-dot text-base" />
      </div>
    </section>
  );
}
