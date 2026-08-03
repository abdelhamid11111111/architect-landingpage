"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const Services: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );

      gsap.set(cards, { opacity: 0, x: 120 });

      gsap.to(cards, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-alabaster py-28 sm:py-36 px-6 sm:px-10"
    >
      <div className="max-w-8xl mx-auto">
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <h2 className="font-display text-4xl sm:text-5xl text-ink max-w-xl">
            Quatre disciplines,
            <br />
            une seule exigence.
          </h2>
          <p className="max-w-xs text-sm text-ink/60 leading-relaxed">
            Chaque projet appelle un savoir-faire différent. Nous les
            réunissons sous un même regard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative flex flex-col justify-between min-h-[22rem] rounded-2xl border border-ink/10 bg-stone-light/60 p-7 hover:bg-ink hover:border-ink transition-colors duration-500"
            >
              <span className="font-mono text-xs text-timber group-hover:text-timber-light">
                {service.index}
              </span>
              <div>
                <h3 className="font-display text-xl text-ink group-hover:text-alabaster transition-colors duration-500 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/65 group-hover:text-alabaster/70 transition-colors duration-500">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
