"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTransitionProps {
  image: string;
  alt: string;
  eyebrow: string;
  quote: string;
}

const ParallaxTransition: FC<ParallaxTransitionProps> = ({
  image,
  alt,
  eyebrow,
  quote,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] w-full overflow-hidden bg-ink"
    >
      <div ref={imageRef} className="absolute inset-0 -top-[12%] h-[124%]">
        <img src={image} alt={alt} className="h-full w-full object-cover opacity-60" />
      </div>
      <div className="absolute inset-0 bg-ink/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <span className="font-mono text-xs tracking-widest2 uppercase text-alabaster/60 mb-5">
          {eyebrow}
        </span>
        <p
          ref={textRef}
          className="font-display text-2xl sm:text-4xl text-alabaster max-w-3xl leading-snug"
        >
          {quote}
        </p>
      </div>
    </section>
  );
};

export default ParallaxTransition;
