"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const Process: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const title = row.querySelector(".process-title");
        const desc = row.querySelector(".process-desc");
        const index = row.querySelector(".process-index");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          index,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        )
          .fromTo(
            title,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            "-=0.3"
          )
          .fromTo(
            desc,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-alabaster py-28 sm:py-36 px-6 sm:px-10"
    >
      <div className="max-w-8xl mx-auto">
        <span className="font-mono text-xs tracking-widest2 uppercase text-timber">
          Méthode
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4 mb-16 max-w-xl">
          Quatre temps, un seul fil conducteur.
        </h2>

        <div className="flex flex-col">
          {processSteps.map((step, i) => (
            <div
              key={step.index}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline border-t border-ink/10 py-10"
            >
              <span className="process-index sm:col-span-1 font-mono text-sm text-timber">
                {step.index}
              </span>
              <div className="sm:col-span-4 overflow-hidden">
                <h3 className="process-title font-display text-3xl sm:text-4xl text-ink">
                  {step.title}
                </h3>
              </div>
              <p className="process-desc sm:col-span-7 text-ink/65 leading-relaxed max-w-xl">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
