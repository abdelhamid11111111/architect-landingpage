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
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = gsap.utils.toArray<HTMLElement>('.service-card');

    gsap.set(cards, { opacity: 0, xPercent: 12, filter: 'blur(6px)' });

    gsap.to(cards, {
      opacity: 1,
      xPercent: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <section id="services" className="relative bg-offwhite py-28 lg:py-36">
      <div className="container-lux">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="eyebrow mb-5">Nos expertises</p>
            <h2 ref={titleRef} className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-xl">
              Quatre disciplines, une seule exigence
            </h2>
          </div>
          <p className="font-sans text-ink/55 max-w-sm leading-relaxed">
            De la conception à la livraison, chaque savoir-faire de l'atelier sert une même
            ambition&nbsp;: des lieux justes, durables et habités avec évidence.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <div
                key={service.id}
                className="service-card group relative bg-offwhite p-8 lg:p-9 flex flex-col justify-between min-h-[340px] transition-colors duration-500 hover:bg-ink"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm text-bronze">{service.number}</span>
                  <Icon className="text-3xl text-ink/70 group-hover:text-bronze transition-colors duration-500" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl mb-3 text-ink group-hover:text-offwhite transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-ink/55 group-hover:text-offwhite/60 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>

                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-bronze transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
