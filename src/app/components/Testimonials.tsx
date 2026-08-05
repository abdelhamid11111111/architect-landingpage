import { useTextReveal } from '../hooks/useTextReveal';

export default function Testimonials() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });

  return (
    <section className="relative bg-offwhite section-lux overflow-hidden">
      <div className="container-lux mb-10 sm:mb-16 lg:mb-24">
        <p className="eyebrow mb-4 sm:mb-5">Témoignages</p>
        <h2
          ref={titleRef}
          className="font-display text-3xl xs:text-4xl sm:text-5xl leading-[1.05] max-w-xl"
        >
          La confiance de nos clients, notre plus belle signature
        </h2>
      </div>

      <div className="container-lux">
        {/* Elfsight Google Reviews widget - live-synced, no API key needed.
            its own "What Our Customers Say" heading can be turned off in the
            Elfsight editor's Header tab to avoid duplicating the one above. */}
        <div className="elfsight-app-a7ad9288-efaf-4ee0-aadd-55938867e3f4" data-elfsight-app-lazy />
      </div>
    </section>
  );
}