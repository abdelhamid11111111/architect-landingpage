import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../data/content';
import { useTextReveal } from '../hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = gsap.utils.toArray<HTMLElement>('.project-card');
    const rotations = [-4, 3, -3, 4, -2];

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === 0) return;

        gsap.set(card, { yPercent: 100, rotate: 0 });

        gsap.to(card, {
          yPercent: 0,
          rotate: rotations[i % rotations.length],
          ease: 'none',
          scrollTrigger: {
            trigger: stack,
            start: `top+=${(i - 1) * window.innerHeight * 0.85} top`,
            end: `top+=${i * window.innerHeight * 0.85} top`,
            scrub: true,
          },
        });

        // previous cards recede slightly as the next one arrives
        gsap.to(cards[i - 1], {
          scale: 0.94,
          filter: 'brightness(0.6)',
          ease: 'none',
          scrollTrigger: {
            trigger: stack,
            start: `top+=${(i - 1) * window.innerHeight * 0.85} top`,
            end: `top+=${i * window.innerHeight * 0.85} top`,
            scrub: true,
          },
        });
      });
    }, stack);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative bg-charcoal py-28 lg:py-36">
      <div className="container-lux mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="eyebrow mb-5">Réalisations</p>
            <h2
              ref={titleRef}
              className="font-display text-offwhite text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-xl"
            >
              Un récit architectural, projet après projet
            </h2>
          </div>
          <p className="font-sans text-offwhite/50 max-w-sm leading-relaxed">
            Faites défiler pour parcourir une sélection de nos réalisations les plus
            singulières, en France et à l'international.
          </p>
        </div>
      </div>

      <div
        ref={stackRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ marginBottom: `${(projects.length - 1) * 85}vh` }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card absolute inset-0 flex items-center justify-center px-6"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-full max-w-5xl aspect-[16/10] overflow-hidden shadow-2xl">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

              <div className="absolute top-6 right-6 glass w-12 h-12 rounded-full flex items-center justify-center">
                <FiArrowUpRight className="text-offwhite text-lg" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow mb-3 text-sand">{project.category}</p>
                  <h3 className="font-display text-offwhite text-3xl sm:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="font-sans text-offwhite/70 text-sm">{project.location}</p>
                  <p className="font-sans text-offwhite/40 text-sm">{project.year}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
