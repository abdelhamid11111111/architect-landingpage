import { useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { PiStarFill, PiQuotesFill } from 'react-icons/pi';
import { testimonials } from '../data/content';
import { useTextReveal } from '../hooks/useTextReveal';

export default function Testimonials() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });
  const controls = useAnimationControls();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const loop = [...testimonials, ...testimonials];

  const start = () => {
    controls.start({
      x: '-50%',
      transition: { duration: 32, ease: 'linear', repeat: Infinity },
    });
  };

  const pause = () => controls.stop();

  return (
    <section className="relative bg-sand/25 py-28 lg:py-36 overflow-hidden">
      <div className="container-lux mb-14">
        <p className="eyebrow mb-5">Témoignages</p>
        <h2 ref={titleRef} className="font-display text-4xl sm:text-5xl leading-[1.05] max-w-xl">
          La confiance de nos clients, notre plus belle signature
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={pause}
        onMouseLeave={start}
        ref={(el) => {
          trackRef.current = el;
          if (el) start();
        }}
      >
        <motion.div animate={controls} className="flex gap-6 w-max px-6" initial={{ x: '0%' }}>
          {loop.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="w-[340px] sm:w-[400px] shrink-0 bg-offwhite p-8 flex flex-col justify-between"
            >
              <PiQuotesFill className="text-3xl text-bronze mb-6" />
              <p className="font-serif text-xl leading-relaxed text-ink mb-8">"{t.quote}"</p>

              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-sans text-sm text-ink">{t.name}</p>
                  <p className="font-sans text-xs text-ink/50">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <PiStarFill key={idx} className="text-bronze text-sm" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
