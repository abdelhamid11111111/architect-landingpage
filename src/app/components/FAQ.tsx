"use client";

import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { faqItems } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

const FAQ: FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );

      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (id: string): void => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-light py-28 sm:py-36 px-6 sm:px-10"
    >
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-xs tracking-widest2 uppercase text-timber">
          Questions
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4 mb-14">
          Ce que l&apos;on nous demande souvent.
        </h2>

        <div className="flex flex-col">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="border-t border-ink/10 last:border-b"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl sm:text-2xl text-ink">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="shrink-0 text-timber"
                  >
                    <Plus size={22} strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-10 text-ink/65 leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
