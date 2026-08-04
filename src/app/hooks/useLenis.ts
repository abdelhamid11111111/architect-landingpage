import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scrolling and synchronizes it with GSAP's
 * ScrollTrigger + ticker so scroll-driven animations stay perfectly in sync.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Custom fonts (Bodoni Moda / Cormorant Garamond) load with display:'swap',
    // which reflows the page once they swap in. That invalidates any
    // ScrollTrigger start/end positions cached before the swap happened —
    // refresh once fonts are actually ready so pinned/scrubbed sections
    // (like Services) stay aligned with real scroll position.
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // belt-and-suspenders: also refresh after full page load (images etc.
    // can shift layout too), and once more shortly after in case anything
    // async settles a beat later.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const settleTimeout = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      window.removeEventListener('load', onLoad);
      clearTimeout(settleTimeout);
    };
  }, []);
}