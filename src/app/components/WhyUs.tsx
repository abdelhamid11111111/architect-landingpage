"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const ETHOS_TEXT =
  "Nous croyons que l'architecture doit servir la vie qui l'habite, non l'inverse. Chaque ligne que nous dessinons cherche la juste mesure entre la matière, la lumière et le silence.";

const WhyUs: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Numeric counters
      stats.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const counter = { value: 0 };

        gsap.to(counter, {
          value: stat.value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${stat.suffix}`;
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Typewriter-style ethos reveal
      if (paragraphRef.current) {
        const chars = ETHOS_TEXT.split("");
        paragraphRef.current.innerHTML = chars
          .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        const charEls = paragraphRef.current.querySelectorAll(".char");

        gsap.set(charEls, { opacity: 0.08 });

        gsap.to(charEls, {
          opacity: 1,
          duration: 0.01,
          stagger: 0.012,
          ease: "none",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative bg-ink text-alabaster py-28 sm:py-36 px-6 sm:px-10"
    >
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="font-mono text-xs tracking-widest2 uppercase text-timber-light">
            Pourquoi Lithos
          </span>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 mb-8 max-w-lg">
            Une conviction, portée depuis dix-huit ans.
          </h2>
          <p
            ref={paragraphRef}
            className="text-lg sm:text-xl leading-relaxed text-alabaster/90 max-w-xl"
          >
            {ETHOS_TEXT}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 content-start">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className="border-t border-alabaster/15 pt-6"
            >
              <span
                ref={(el) => {
                  counterRefs.current[i] = el;
                }}
                className="font-display text-5xl sm:text-6xl text-timber-light block"
              >
                0
              </span>
              <p className="mt-3 text-sm text-alabaster/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
