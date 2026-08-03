"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const Hero: FC = () => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const maskRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wordRef.current || !maskRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // "Dia" reveal: the mask slab sits over the word like a slide of stone,
      // then slides away while the word itself resolves from a blur.
      tl.set(wordRef.current, { opacity: 0, filter: "blur(14px)" })
        .set(maskRef.current, { scaleX: 1, transformOrigin: "left" })
        .to(maskRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 1.1,
          ease: "power4.inOut",
        })
        .to(
          wordRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.9"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex items-end overflow-hidden bg-ink"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2400&auto=format&fit=crop"
          alt="Résidence contemporaine en pierre et verre baignée de lumière"
          className="h-full w-full object-cover opacity-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
      </div>

      <div className="relative z-10 w-full max-w-8xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28 pt-40">
        <p className="font-mono text-xs tracking-widest2 text-alabaster/70 uppercase mb-6">
          Lithos Architectes — Paris
        </p>

        <h1 className="font-display font-light text-alabaster text-[13vw] sm:text-[8vw] lg:text-[6.4vw] leading-[0.95] tracking-tight max-w-6xl">
          Construire l'exception,
          <br />
          penser{" "}
          <span className="relative inline-block overflow-hidden align-baseline">
            <span ref={wordRef} className="italic text-timber-light">
              l'éternité
            </span>
            <span
              ref={maskRef}
              className="absolute inset-0 bg-alabaster"
              aria-hidden="true"
            />
          </span>
          .
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        >
          <p className="max-w-md text-alabaster/75 text-base leading-relaxed">
            Depuis notre atelier parisien, nous concevons des résidences, des
            intérieurs et des lieux culturels où la matière rencontre la
            lumière.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#projets"
              className="inline-flex items-center rounded-full bg-alabaster text-ink px-6 py-3 text-sm hover:bg-timber-light transition-colors duration-300"
            >
              Découvrir nos réalisations
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-alabaster/40 text-alabaster px-6 py-3 text-sm hover:bg-alabaster/10 transition-colors duration-300"
            >
              Prendre rendez-vous
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
