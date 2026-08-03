import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: "#F7F4EE",
        stone: {
          light: "#EDE7DC",
          DEFAULT: "#8B8578",
          dark: "#5C574C",
        },
        ink: "#211F1B",
        slate: {
          DEFAULT: "#4A5259",
          light: "#6E7780",
        },
        timber: {
          DEFAULT: "#A9784F",
          light: "#C79A6E",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
