/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F3EE',
        sand: '#D8C8B4',
        bronze: {
          DEFAULT: '#A9825A',
          light: '#C4A277',
          dark: '#8A6A47',
        },
        charcoal: '#1B1B1B',
        offwhite: '#FAF8F5',
        ink: '#181818',
      },
      fontFamily: {
        display: ['var(--font-display)', '"Bodoni Moda"', 'serif'],
        serif: ['var(--font-serif)', '"Cormorant Garamond"', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};