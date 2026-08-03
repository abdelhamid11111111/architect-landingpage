# Atelier Verrier — Site vitrine d'architecture

Landing page premium (style Awwwards) pour un cabinet d'architecture fictif, en français,
construite en React + TypeScript.

## Stack

- React 18 + TypeScript
- Tailwind CSS (design tokens personnalisés : ivoire, sable, bronze, charbon)
- GSAP + ScrollTrigger (reveals, parallax, stacking de cartes)
- Framer Motion (micro-interactions, accordéon, navbar, carrousel)
- Lenis (scroll fluide, synchronisé avec GSAP)
- SplitType (animations de texte par ligne)
- React Icons (Phosphor)

## Démarrage

```bash
npm install
npm run dev       # serveur de développement (http://localhost:5173)
npm run build     # build de production dans /dist
npm run preview   # prévisualiser le build de production
```

## Structure

```
src/
  components/     # Navbar, Hero, Services, ParallaxTransition, Projects,
                   # WhyChooseUs, Process, Testimonials, FAQ, Contact, Footer
  hooks/          # useLenis, useTextReveal (SplitType + GSAP), useCounter
  data/           # copy en français + données des sections (types stricts)
  types/          # interfaces TypeScript partagées
```

## Notes de design

- Palette : Ivoire `#F6F3EE`, Sable `#D8C8B4`, Bronze `#A9825A`, Charbon `#1B1B1B`,
  Blanc cassé `#FAF8F5`, Noir profond `#181818`.
- Typographies : Bodoni Moda (titres), Cormorant Garamond (accents éditoriaux),
  Inter (texte courant, UI).
- Le mot-clé du hero ("lumière") utilise un effet de révélation en volet bronze
  (« DIA reveal ») avant l'apparition du texte.
- Les images sont des placeholders (picsum.photos) — à remplacer par les visuels
  réels du cabinet avant mise en production.
- Toutes les animations respectent `prefers-reduced-motion`.

## À remplacer avant mise en production

- Images (`src/data/content.ts`) par les photographies réelles des projets.
- Coordonnées de contact et lien Google Maps.
- Liens des réseaux sociaux dans le footer.
