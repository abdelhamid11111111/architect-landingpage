import { Marcellus, Cormorant_Garamond, Inter } from 'next/font/google';

// Note: variable names are suffixed "-nf" to avoid colliding with
// Tailwind v4's own default theme tokens (--font-sans, --font-serif),
// which are referenced separately in the @theme block in globals.css.
// Marcellus only ships a single static weight/style (400, normal) - no bold,
// no italic, no variable axes. Any `italic` usage on font-display text will
// fall back to the browser's faux-slant synthesis.
export const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-display-nf',
  display: 'swap',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif-nf',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans-nf',
  display: 'swap',
});