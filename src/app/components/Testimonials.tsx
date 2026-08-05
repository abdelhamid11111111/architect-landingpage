import { useTextReveal } from '../hooks/useTextReveal';

export default function Testimonials() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });

  return (
    <section className="relative bg-offwhite py-28 lg:py-36 overflow-hidden">
      <div className="container-lux mb-20 lg:mb-24">
        <p className="eyebrow mb-5">Témoignages</p>
        <h2 ref={titleRef} className="font-display text-4xl pb-10 sm:text-5xl leading-[1.05] max-w-xl">
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