'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../data/content';
import { useTextReveal } from '../hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

// how far a card shrinks once the next one covers it. it must stay below 1 and
// unrotated: the cards are all `inset-0` siblings of identical size, so a
// centered scale keeps the receding card fully inside the incoming card's
// bounds. any rotation pushes its corners back out and they show up as hard
// diagonal slivers above the photo and as a dark bar under the card.
const RECEDE_SCALE = 0.94;

export default function Projects() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;

    const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    const total = cards.length;
    if (total < 2) return;

    const ctx = gsap.context(() => {
      gsap.set(cards[0], { yPercent: 0, scale: 1, rotate: 0 });
      gsap.set(cards.slice(1), { yPercent: 100, scale: 1, rotate: 0 });
      gsap.set(cards, { transformOrigin: '50% 50%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sticky,
          start: 'top top',
          // fn form so a ResizeObserver-triggered refresh recomputes it
          // against the current viewport instead of a stale pinned range
          end: () => `+=${window.innerHeight * (total - 1)}`,
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        tl.to(
          cards[i],
          { scale: RECEDE_SCALE, duration: 1, ease: 'none' },
          i
        ).to(cards[i + 1], { yPercent: 0, duration: 1, ease: 'none' }, i);
      }
    }, sticky);

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(sticky);

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" className="relative bg-offwhite section-lux">
      <div className="container-lux mb-10 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <div>
            <p className="eyebrow mb-4 sm:mb-5">Réalisations</p>
            <h2
              ref={titleRef}
              className="font-display text-ink text-3xl xs:text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-xl"
            >
              Un récit architectural, projet après projet
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-ink/55 max-w-sm leading-relaxed">
            Faites défiler pour parcourir une sélection de nos réalisations les plus
            singulières, en France et à l&apos;international.
          </p>
        </div>
      </div>

      {/* 100svh (small viewport height) rather than 100vh: on mobile browsers
          100vh assumes the address bar is hidden, so the pinned card gets
          clipped while the bar is visible and jumps as it collapses. */}
      <div ref={stickyRef} className="relative h-svh w-full overflow-hidden">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="project-card absolute inset-0 flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8"
            style={{ willChange: 'transform' }}
          >
            <div className="flex flex-col w-full max-w-5xl h-[92%] sm:h-[85%] overflow-hidden shadow-[0_18px_50px_-24px_rgba(24,24,24,0.4)] bg-ink">
              {/* big pic */}
              <div className="relative flex-[0_0_64%] sm:flex-[0_0_66%] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover brightness-110 contrast-[1.05] saturate-[0.95]"
                  loading="eager"
                />

                <span className="absolute top-3 left-3 sm:top-5 sm:left-5 glass px-2.5 py-1 sm:px-3 sm:py-1.5 font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-offwhite/80">
                  {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>

                {/* <a
                  href="#projects"
                  aria-label={`Voir le projet ${project.title}`}
                  className="absolute top-5 right-5 glass w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-bronze/80 transition-colors duration-300"
                >
                  <FiArrowUpRight className="text-offwhite text-lg" />
                </a> */}
              </div>

              {/* title + small description + link — fully visible, no overlay */}
              <div className="flex-1 min-h-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-8 px-4 xs:px-6 sm:px-10 py-4 sm:py-0 border-t border-offwhite/10">
                <div className="min-w-0">
                  <p className="eyebrow mb-1 sm:mb-2 text-sand">{project.category}</p>
                  <h3 className="font-display text-offwhite text-xl xs:text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 truncate">
                    {project.title}
                  </h3>
                  <p className="font-sans text-offwhite/55 text-xs xs:text-sm leading-relaxed line-clamp-2 max-w-md">
                    {project.description}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-4 shrink-0">
                  <div className="text-right font-sans text-xs xs:text-sm">
                    <p className="text-offwhite/70">{project.location}</p>
                    <p className="text-offwhite/40">{project.year}</p>
                  </div>
                  <a
                    href="#projects"
                    className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap font-sans text-[0.65rem] sm:text-[0.7rem] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-offwhite underline underline-offset-4 decoration-bronze decoration-1 hover:text-bronze transition-colors duration-300"
                  >
                    Voir le projet
                    <FiArrowUpRight className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
