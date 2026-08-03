"use client";

import { useEffect, useRef, useState } from "react";
import type { FC, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      [textRef.current, formRef.current, mapRef.current].forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-alabaster py-28 sm:py-36 px-6 sm:px-10"
    >
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div ref={textRef}>
            <span className="font-mono text-xs tracking-widest2 uppercase text-timber">
              Contact
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink mt-4 mb-6 max-w-lg">
              Parlons de votre prochain lieu.
            </h2>
            <p className="text-ink/65 leading-relaxed max-w-md mb-10">
              Un projet en tête, un terrain, une bâtisse à réinventer ?
              Écrivez-nous, nous répondons sous 48 heures.
            </p>

            <dl className="space-y-4 text-sm text-ink/75 mb-4">
              <div className="flex gap-3">
                <dt className="text-ink/40">Adresse</dt>
                <dd>14 rue de Varenne, 75007 Paris</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-ink/40">Téléphone</dt>
                <dd>+33 1 42 86 09 17</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-ink/40">Email</dt>
                <dd>studio@lithos-architectes.fr</dd>
              </div>
            </dl>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs text-ink/50 mb-2">
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Isabelle Fontenay"
                className="w-full bg-transparent border-b border-ink/20 pb-3 text-ink placeholder:text-ink/30 focus:border-timber outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs text-ink/50 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@exemple.fr"
                className="w-full bg-transparent border-b border-ink/20 pb-3 text-ink placeholder:text-ink/30 focus:border-timber outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs text-ink/50 mb-2">
                Votre projet
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                placeholder="Décrivez-nous votre projet en quelques lignes."
                className="w-full bg-transparent border-b border-ink/20 pb-3 text-ink placeholder:text-ink/30 focus:border-timber outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-ink text-alabaster px-7 py-3 text-sm hover:bg-timber transition-colors duration-300"
            >
              {submitted ? "Message envoyé" : "Envoyer le message"}
            </button>
          </form>
        </div>

        <div
          ref={mapRef}
          className="w-full aspect-square rounded-2xl overflow-hidden border border-ink/10 shadow-lg self-start"
        >
          <iframe
            title="Localisation de l'atelier Lithos Architectes à Paris"
            src="https://www.google.com/maps?q=14+rue+de+Varenne,+75007+Paris&output=embed"
            className="h-full w-full grayscale-[15%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
