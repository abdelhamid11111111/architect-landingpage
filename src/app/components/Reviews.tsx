"use client";

import type { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { reviews } from "../lib/data";

const Reviews: FC = () => {
  const shouldReduceMotion = useReducedMotion();
  // Duplicate the list so the marquee can loop seamlessly.
  const loopedReviews = [...reviews, ...reviews];

  return (
    <section className="relative bg-ink py-28 sm:py-36 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 sm:px-10 mb-14">
        <span className="font-mono text-xs tracking-widest2 uppercase text-timber-light">
          Témoignages
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-alabaster mt-4 max-w-xl">
          La parole à ceux qui habitent nos projets.
        </h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 42,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loopedReviews.map((review, i) => (
            <blockquote
              key={`${review.id}-${i}`}
              className="w-[22rem] sm:w-[26rem] shrink-0 rounded-2xl border border-alabaster/10 bg-alabaster/5 p-8 flex flex-col justify-between"
            >
              <p className="font-display text-xl sm:text-2xl text-alabaster leading-snug mb-8">
                « {review.quote} »
              </p>
              <footer>
                <p className="text-sm text-alabaster">{review.name}</p>
                <p className="text-xs text-alabaster/50 mt-1">
                  {review.role} — {review.project}
                </p>
              </footer>
            </blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
