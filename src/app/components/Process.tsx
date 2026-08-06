import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../data/content';
import { useTextReveal } from '../hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.process-row').forEach((row) => {
        const title = row.querySelector('.process-title');
        const desc = row.querySelector('.process-desc');
        const index = row.querySelector('.process-index');
        const line = row.querySelector('.process-line');

        gsap.set([title, desc, index], { opacity: 0, y: 24 });
        gsap.set(line, { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 78%' },
        });

        tl.to(index, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          .to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
          .to(desc, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
          .to(line, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, '-=0.6');
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative bg-offwhite section-lux">
      <div className="container-lux">
        <p className="eyebrow mb-4 sm:mb-5">Notre process</p>
        <h2
          ref={titleRef}
          className="font-display text-ink text-3xl xs:text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-2xl mb-10 sm:mb-14 lg:mb-16"
        >
          Une méthode éprouvée, du croquis au chantier
        </h2>

        <div ref={listRef}>
          {processSteps.map((step) => (
            <div
              key={step.id}
              className="process-row group relative py-7 sm:py-10 grid md:grid-cols-12 gap-2 sm:gap-4 md:gap-6 items-start"
            >
              <span className="process-index font-display text-bronze text-base sm:text-lg md:col-span-1">
                {step.index}
              </span>
              <h3 className="process-title font-display text-ink text-2xl xs:text-3xl md:col-span-4">
                {step.title}
              </h3>
              <p className="process-desc font-sans text-sm sm:text-base text-ink/55 leading-relaxed md:col-span-6 md:col-start-7">
                {step.description}
              </p>
              <span className="absolute bottom-0 left-0 right-0 h-px bg-ink/10" />
              <span className="process-line absolute bottom-0 left-0 h-px w-full bg-bronze origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
