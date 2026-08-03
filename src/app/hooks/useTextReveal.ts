import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface Options {
  type?: 'lines' | 'words' | 'chars';
  stagger?: number;
  trigger?: boolean;
  delay?: number;
}

/**
 * Splits the text inside the returned ref and animates it in with a
 * cinematic mask reveal, either immediately (on mount) or on scroll.
 */
export function useTextReveal<T extends HTMLElement>({
  type = 'lines',
  stagger = 0.08,
  trigger = true,
  delay = 0,
}: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const splitTypes: ('lines' | 'words' | 'chars')[] =
      type === 'lines' ? ['lines'] : type === 'words' ? ['lines', 'words'] : ['lines', 'chars'];

    const split = new SplitType(el, { types: splitTypes, lineClass: 'split-line' });

    const targets = type === 'lines' ? split.lines : type === 'words' ? split.words : split.chars;
    if (!targets) return;

    gsap.set(targets, { yPercent: 110, opacity: 0 });

    const anim = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power4.out',
      stagger,
      delay,
      scrollTrigger: trigger
        ? {
            trigger: el,
            start: 'top 85%',
          }
        : undefined,
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
      split.revert();
    };
  }, [type, stagger, trigger, delay]);

  return ref;
}
