import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxTransition() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to('.px-layer-back', {
        yPercent: -18,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.px-layer-mid', {
        yPercent: -34,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('.px-layer-front', {
        yPercent: -55,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.fromTo(
        '.px-text',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%', end: 'center center', scrub: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[130vh] overflow-hidden bg-charcoal">
      <div className="px-layer-back absolute inset-0">
        <img
          src="https://picsum.photos/seed/parallax-back/1800/1400"
          alt=""
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />

      <div className="px-layer-mid absolute top-[20%] left-[8%] w-[45%] max-w-md aspect-[4/5]">
        <div className="w-full h-full border border-sand/25" />
      </div>
      <div className="px-layer-mid absolute bottom-[14%] right-[10%] w-[30%] max-w-xs aspect-square">
        <div className="w-full h-full border border-bronze/40 rotate-6" />
      </div>

      <div className="px-layer-front absolute inset-0 flex items-center justify-center px-6">
        <p className="px-text font-display italic text-offwhite text-center text-[9vw] sm:text-[6vw] lg:text-[4.2vw] leading-tight max-w-4xl">
          La lumière révèle la forme, la forme révèle l'usage.
        </p>
      </div>
    </section>
  );
}
