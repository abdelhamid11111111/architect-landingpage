"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const Projects: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!wrapperRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );

      // Base stacked state: each card offset slightly, like fanned drawings.
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i * 3,
          rotate: i % 2 === 0 ? -3 - i * 0.6 : 3 + i * 0.6,
          scale: 1 - i * 0.03,
          zIndex: cards.length - i,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${cards.length * 700}`,
          scrub: 0.6,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        tl.to(
          card,
          {
            yPercent: -120,
            rotate: i % 2 === 0 ? -18 : 18,
            x: i % 2 === 0 ? -160 : 160,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          i
        ).to(
          cards[i + 1],
          {
            scale: 1,
            rotate: 0,
            yPercent: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          i
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projets" className="relative bg-stone-light">
      <div className="max-w-8xl mx-auto px-6 sm:px-10 pt-28 pb-10">
        <span className="font-mono text-xs tracking-widest2 uppercase text-timber">
          Réalisations
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4 max-w-xl">
          Un portfolio pensé comme une collection.
        </h2>
      </div>

      <div ref={wrapperRef} className="relative">
        <div
          ref={stickyRef}
          className="h-screen w-full flex items-center justify-center overflow-hidden px-6"
        >
          <div className="relative w-full max-w-2xl aspect-[4/5]">
            {projects.map((project, i) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-ink/10 bg-ink"
              >
                <img
                  src={project.image}
                  alt={`${project.name}, ${project.location}`}
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-xs text-alabaster/60 mb-2">
                      {project.category} — {project.year}
                    </p>
                    <h3 className="font-display text-3xl text-alabaster">
                      {project.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-alabaster/60 whitespace-nowrap">
                    {project.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
