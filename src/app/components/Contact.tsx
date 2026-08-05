import { useState } from 'react';
import { PiMapPinLight, PiPhoneLight, PiEnvelopeLight } from 'react-icons/pi';
import { useTextReveal } from '../hooks/useTextReveal';

export default function Contact() {
  const titleRef = useTextReveal<HTMLHeadingElement>({ type: 'lines' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-offwhite section-lux overflow-hidden">
      <div className="pointer-events-none absolute -bottom-1/3 right-0 w-[50vw] h-[50vw] rounded-full bg-bronze/10 blur-[160px]" />
      <div className="pointer-events-none absolute top-20 left-10 w-56 h-56 border border-ink/10 rotate-12 hidden lg:block" />

      <div className="container-lux relative z-10">
        <div className="mb-10 sm:mb-16 max-w-2xl">
          <p className="eyebrow mb-4 sm:mb-5">Contact</p>
          <h2
            ref={titleRef}
            className="font-display text-ink text-3xl xs:text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
          >
            Racontons ensemble votre prochain projet
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10">
          <div className="lg:col-span-5 flex flex-col gap-8 sm:gap-10">
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="flex items-start gap-4">
                <PiMapPinLight className="text-2xl text-bronze shrink-0 mt-1" />
                <div>
                  <p className="font-sans text-ink/40 text-xs tracking-[0.2em] uppercase mb-1">Atelier</p>
                  <p className="font-sans text-sm sm:text-base text-ink">14 rue des Beaux-Arts, 75006 Paris</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PiPhoneLight className="text-2xl text-bronze shrink-0 mt-1" />
                <div>
                  <p className="font-sans text-ink/40 text-xs tracking-[0.2em] uppercase mb-1">Téléphone</p>
                  <a
                    href="tel:+33142860715"
                    className="inline-flex min-h-11 items-center font-sans text-sm sm:text-base text-ink hover:text-bronze transition-colors"
                  >
                    +33 1 42 86 07 15
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PiEnvelopeLight className="text-2xl text-bronze shrink-0 mt-1" />
                <div>
                  <p className="font-sans text-ink/40 text-xs tracking-[0.2em] uppercase mb-1">Courriel</p>
                  <a
                    href="mailto:contact@atelier-verrier.fr"
                    className="inline-flex min-h-11 items-center break-all font-sans text-sm sm:text-base text-ink hover:text-bronze transition-colors"
                  >
                    contact@atelier-verrier.fr
                  </a>
                </div>
              </div>
              
            </div>

            <div className="relative aspect-[4/3] sm:aspect-square w-full max-w-sm overflow-hidden">
              <iframe
                title="Localisation de l'atelier à Paris"
                src="https://www.google.com/maps?q=Rue+des+Beaux-Arts,+Paris&output=embed"
                className="w-full h-full grayscale-[40%] contrast-[1.1]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-ink/10 shadow-[0_1px_3px_rgba(24,24,24,0.06)] p-5 xs:p-6 sm:p-10 flex flex-col gap-5 sm:gap-6"
            >
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <label className="flex flex-col gap-2">
                  <span className="font-sans text-xs tracking-[0.15em] uppercase text-ink/50">Nom</span>
                  <input
                    required
                    type="text"
                    className="bg-transparent border-b border-ink/20 py-3 min-h-11 text-ink font-serif text-lg placeholder:font-sans placeholder:text-base focus:outline-none focus:border-bronze transition-colors"
                    placeholder="Votre nom"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-sans text-xs tracking-[0.15em] uppercase text-ink/50">Courriel</span>
                  <input
                    required
                    type="email"
                    className="bg-transparent border-b border-ink/20 py-3 min-h-11 text-ink font-serif text-lg placeholder:font-sans placeholder:text-base focus:outline-none focus:border-bronze transition-colors"
                    placeholder="vous@exemple.fr"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-ink/50">Nature du projet</span>
                <input
                  type="text"
                  className="bg-transparent border-b border-ink/20 py-3 min-h-11 text-ink font-serif text-lg placeholder:font-sans placeholder:text-base focus:outline-none focus:border-bronze transition-colors"
                  placeholder="Construction, rénovation, intérieur…"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-ink/50">Message</span>
                <textarea
                  rows={4}
                  className="bg-transparent border-b border-ink/20 py-3 min-h-11 text-ink font-serif text-lg placeholder:font-sans placeholder:text-base focus:outline-none focus:border-bronze transition-colors resize-none"
                  placeholder="Décrivez-nous votre projet…"
                />
              </label>

              <button type="submit" className="btn-lux text-ink w-full sm:w-auto sm:self-start mt-2">
                {sent ? 'Message envoyé' : 'Envoyer la demande'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
