'use client';

import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ParallaxTransition from './components/ParallaxTransition';
import Projects from './components/Projects';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  useLenis();

  return (
    <div className="relative bg-offwhite">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ParallaxTransition />
        <Projects />
        <WhyChooseUs />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
