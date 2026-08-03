import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiPlusLight } from 'react-icons/pi';
import { faqItems } from '../data/content';
import { useTextReveal } from '../hooks/useTextReveal';

export default function FAQ() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section className="relative bg-offwhite py-28 lg:py-36">
      <div className="container-lux grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-5">Questions fréquentes</p>
          <h2 ref={titleRef} className="font-display text-4xl sm:text-5xl leading-[1.05]">
            Tout ce qu'il faut savoir avant de commencer
          </h2>
        </div>

        <div className="lg:col-span-8">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border-b border-ink/10">
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                >
                  <span className="font-serif text-xl sm:text-2xl text-ink group-hover:text-bronze transition-colors duration-300">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center"
                  >
                    <PiPlusLight className="text-lg text-ink" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0, filter: 'blur(6px)' }}
                      animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                      exit={{ height: 0, opacity: 0, filter: 'blur(6px)' }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-ink/55 leading-relaxed pb-8 max-w-xl">{item.answer}</p>
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
}
