import { Bodoni_Moda, Cormorant_Garamond, Inter } from 'next/font/google';

// Note: variable names are suffixed "-nf" to avoid colliding with
// Tailwind v4's own default theme tokens (--font-sans, --font-serif),
// which are referenced separately in the @theme block in globals.css.
export const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
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