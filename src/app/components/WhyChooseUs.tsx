import { PiRulerLight, PiBuildingsLight, PiUsersThreeLight, PiSealCheckLight } from 'react-icons/pi';
import { stats } from '../data/content';
import { useCounter } from '../hooks/useCounter';
import { useTextReveal } from '../hooks/useTextReveal';
import type { Stat } from '../types';

const icons = [PiRulerLight, PiBuildingsLight, PiUsersThreeLight, PiSealCheckLight];

function StatItem({ stat, Icon }: { stat: Stat; Icon: (typeof icons)[number] }) {
  const { ref, value } = useCounter<HTMLDivElement>(stat.value);

  return (
    <div ref={ref} className="flex flex-col items-start gap-3 sm:gap-4 py-6 sm:py-8 border-t border-ink/10">
      <Icon className="text-2xl sm:text-3xl text-bronze" />
      <p className="font-display text-4xl xs:text-5xl lg:text-6xl text-ink">
        {value}
        {stat.suffix}
      </p>
      <p className="font-sans text-xs sm:text-sm tracking-[0.1em] uppercase text-ink/50">
        {stat.label}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });

  return (
    <section className="relative bg-offwhite section-lux">
      <div className="container-lux grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4 sm:mb-5">Pourquoi Atelier Verrier</p>
          <h2
            ref={titleRef}
            className="font-display text-3xl xs:text-4xl sm:text-5xl leading-[1.05] mb-4 sm:mb-6"
          >
            Une exigence portée depuis près de deux décennies
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink/55 leading-relaxed max-w-md">
            Notre atelier réunit architectes, designers d'intérieur et ingénieurs autour
            d'une même conviction&nbsp;: la rigueur technique ne doit jamais s'opposer à
            la sensibilité du geste architectural.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 xs:grid-cols-2 gap-x-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.id} stat={stat} Icon={icons[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
