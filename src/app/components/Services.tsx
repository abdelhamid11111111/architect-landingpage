'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PiCompassToolLight, PiArmchairLight, PiHammerLight, PiHardHatLight } from 'react-icons/pi';
import { services } from '../data/content';
import { useTextReveal } from '../hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

const icons = {
  concept: PiCompassToolLight,
  interior: PiArmchairLight,
  renovation: PiHammerLight,
  supervision: PiHardHatLight,
};

export default function Services() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const total = services.length;
    const badges = gsap.utils.toArray<HTMLElement>('.service-badge', track);
    const revealGroups = services.map((_, i) =>
      gsap.utils.toArray<HTMLElement>(`[data-index="${i}"]`, track)
    );

    const ctx = gsap.context(() => {
      // baseline state: everything dim/blurred/waiting, badges neutral
      gsap.set(revealGroups.flat(), { opacity: 0.15, filter: 'blur(6px)' });
      gsap.set(badges, { backgroundColor: 'rgba(24,24,24,0.12)', color: '#181818' });
      gsap.set(lineRef.current, { scaleX: 0 });

      const mm = gsap.matchMedia();

      // desktop: pinned section, scroll-scrubbed sequential reveal
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${total * 420}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(lineRef.current, { scaleX: 1, ease: 'none' }, 0);

        revealGroups.forEach((group, i) => {
          const at = i / total;
          tl.to(group, { opacity: 1, filter: 'blur(0px)', duration: 1 / total, ease: 'power2.out' }, at).to(
            badges[i],
            { backgroundColor: '#a9825a', color: '#faf8f5', duration: 1 / total, ease: 'power2.out' },
            at
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // mobile/tablet: simple non-pinned stagger fade-in
      mm.add('(max-width: 1023px)', () => {
        gsap.set(revealGroups.flat(), { opacity: 1, filter: 'blur(0px)' });
        gsap.set(badges, { backgroundColor: '#a9825a', color: '#faf8f5' });
        gsap.set(lineRef.current, { scaleX: 1 });

        gsap.set('.service-card', { opacity: 0, y: 24 });
        const st = ScrollTrigger.create({
          trigger: track,
          start: 'top 80%',
          onEnter: () =>
            gsap.to('.service-card', {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: 'power2.out',
            }),
        });

        return () => st.kill();
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-offwhite py-28 lg:py-36 overflow-hidden"
    >
      <div className="container-lux">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="eyebrow mb-5">Nos expertises</p>
            <h2
              ref={titleRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-xl"
            >
              Quatre disciplines, une seule exigence
            </h2>
          </div>
          <p className="font-sans text-ink/55 max-w-sm leading-relaxed">
            De la conception à la livraison, chaque savoir-faire de l&apos;atelier sert une même
            ambition&nbsp;: des lieux justes, durables et habités avec évidence.
          </p>
        </div>

        <div ref={trackRef} className="relative">
          {/* row 1: oversized number marks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10">
            {services.map((service, i) => {
              const Icon = icons[service.icon];
              return (
                <div
                  key={service.id}
                  data-index={i}
                  className="service-card relative h-28 lg:h-32 flex items-end"
                >
                  <span className="font-display text-[4rem] lg:text-[4.5rem] leading-none text-ink/10 select-none">
                    {service.number}
                  </span>
                  <Icon className="absolute bottom-2 right-2 text-2xl text-bronze/70" />
                </div>
              );
            })}
          </div>

          {/* row 2: connecting progress line with numbered badges */}
          <div className="relative mt-6 mb-10 hidden lg:block">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-ink/10 -translate-y-1/2" />
            <span
              ref={lineRef}
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-bronze -translate-y-1/2 origin-left"
            />
            <div className="relative grid grid-cols-4 gap-x-10">
              {services.map((service, i) => (
                <div key={service.id} className="flex">
                  <span className="service-badge w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* row 3: titles + descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mt-10 lg:mt-0">
            {services.map((service, i) => (
              <div key={service.id} data-index={i} className="service-card">
                <h3 className="font-serif text-2xl mb-3 text-ink">{service.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-ink/55">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}