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
      // baseline state: everything dim/waiting, badges neutral
      // (blur is intentionally left out - animating filter blur on 4 stacked
      // elements during a pinned/scrubbed scroll is expensive and was causing
      // the reveal to visually lag or never finish on normal scroll speed)
      gsap.set(revealGroups.flat(), {
        opacity: 0.35,
        willChange: 'opacity',
        force3D: true,
      });
      // #e3e2df is `ink/10` (#181818 @ 10%) pre-blended over the `offwhite`
      // (#faf8f5) page background - i.e. the exact rendered color of the track
      // line. It has to be OPAQUE: the track line runs behind the badges, so a
      // translucent fill would stack 10% on 10% and render visibly darker than
      // the line it's supposed to match. Opaque also makes the bronze line pass
      // cleanly *underneath* each circle instead of bleeding through it.
      gsap.set(badges, { backgroundColor: '#e3e2df', color: '#181818' });
      gsap.set(lineRef.current, { scaleX: 0 });

      const mm = gsap.matchMedia();

      // desktop: pinned section, scroll-scrubbed sequential reveal.
      // NOTE: the section is locked to h-screen with its content vertically
      // centered (see markup below) so the whole grid - including the last row
      // of titles/paragraphs - is inside the viewport for the entire pin.
      // Without that, anything past the fold stays invisible until the pin
      // releases, which reads as "the paragraphs never show up".
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

        // duration MUST be 1 (the full timeline). Without it GSAP's default of
        // 0.5 makes the line finish crossing at the halfway point, so it races
        // ahead and badges 03/04 flip long after it has already passed them.
        // At duration 1 the line reaches badge `i` exactly at progress i/total,
        // which is that badge's own position on the timeline.
        tl.to(lineRef.current, { scaleX: 1, ease: 'none', duration: 1 }, 0);

        // badges sit on top of the line in DOM order, so the bronze line is
        // already visible sliding underneath each circle. `flipDelay` holds
        // the badge's own color flip back a beat after the line reaches it,
        // so you see the line arrive under the circle first, then the circle
        // itself switches to a solid bronze fill + white text.
        const flipDelay = 0.05;
        const flipDuration = 0.15;

        revealGroups.forEach((group, i) => {
          const at = i / total;
          tl.to(
            group,
            { opacity: 1, duration: 1 / total, ease: 'power2.out', force3D: true },
            at
          ).to(
            badges[i],
            { backgroundColor: '#a9825a', color: '#faf8f5', duration: flipDuration, ease: 'power2.out' },
            at + flipDelay
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // mobile/tablet: simple non-pinned stagger fade-in
      mm.add('(max-width: 1023px)', () => {
        gsap.set(revealGroups.flat(), { opacity: 1 });
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
      className="relative bg-offwhite py-16 sm:py-24 overflow-hidden lg:py-0 lg:h-screen lg:flex lg:items-center"
    >
      <div className="container-lux w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 lg:mb-12">
          <div>
            <p className="eyebrow mb-4 sm:mb-5">Nos expertises</p>
            <h2
              ref={titleRef}
              className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-xl"
            >
              Quatre disciplines, une seule exigence
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-ink/55 max-w-sm leading-relaxed">
            De la conception à la livraison, chaque savoir-faire de l&apos;atelier sert une même
            ambition&nbsp;: des lieux justes, durables et habités avec évidence.
          </p>
        </div>

        <div ref={trackRef} className="relative">
          {/* row 1: oversized number marks.
              Desktop-only: stacked on a phone this rendered all four numbers
              as one column far above their matching titles in row 3. Below lg
              the number is instead rendered inline inside each card. */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10">
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
            {/* z-10 keeps the badges above both line layers so the bronze line
                travels underneath each circle rather than over it */}
            <div className="relative z-10 grid grid-cols-4 gap-x-10">
              {services.map((service, i) => (
                <div key={service.id} className="flex">
                  <span className="service-badge w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs bg-[#e3e2df] text-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* row 3: titles + descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 sm:gap-y-10 mt-0 lg:mt-0">
            {services.map((service, i) => {
              const Icon = icons[service.icon];
              return (
                <div
                  key={service.id}
                  data-index={i}
                  className="service-card border-t border-ink/10 pt-5 lg:border-0 lg:pt-0"
                >
                  {/* mobile/tablet: number + icon sit with their own title */}
                  <div className="flex items-center justify-between gap-4 mb-2 lg:hidden">
                    <span className="font-display text-[2.5rem] xs:text-[3rem] leading-none text-ink/15 select-none">
                      {service.number}
                    </span>
                    <Icon className="text-2xl text-bronze/70" />
                  </div>
                  <h3 className="font-display text-xl xs:text-2xl mb-2 sm:mb-3 text-ink">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-ink/70">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}