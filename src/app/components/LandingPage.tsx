"use client";

import type { FC } from "react";
import { useLenis } from "../hooks/useLenis";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import ParallaxTransition from "./ParallaxTransition";
import Projects from "./Projects";
import WhyUs from "./WhyUs";
import Process from "./Process";
import FAQ from "./FAQ";
import Reviews from "./Reviews";
import Contact from "./Contact";
import Footer from "./Footer";

const LandingPage: FC = () => {
  useLenis();

  return (
    <div className="bg-alabaster text-ink font-sans">
      <Navbar />
      <Hero />
      <Services />

      <ParallaxTransition
        image="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop"
        alt="Détail d'une façade en pierre et lumière rasante"
        eyebrow="Entre deux mondes"
        quote="La matière n'est jamais neutre. Elle porte la mémoire du lieu et annonce ce qui va s'y vivre."
      />

      <Projects />

      <ParallaxTransition
        image="https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=2000&auto=format&fit=crop"
        alt="Escalier intérieur baigné de lumière naturelle"
        eyebrow="Notre signature"
        quote="Dix-huit ans à chercher, dans chaque projet, le point exact où la structure devient sensible."
      />

      <WhyUs />
      <Process />
      <FAQ />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
