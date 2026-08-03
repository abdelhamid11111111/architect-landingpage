import type { NavLink, Service, Project, Stat, ProcessStep, FAQItem, Testimonial } from '../types';

export const navLinks: NavLink[] = [
  { label: 'Studio', href: '#hero' },
  { label: 'Expertises', href: '#services' },
  { label: 'Réalisations', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const services: Service[] = [
  {
    id: 's1',
    number: '01',
    title: 'Conception architecturale',
    description: "De l'esquisse au permis de construire, nous dessinons des volumes qui dialoguent avec leur site.",
    icon: 'concept',
  },
  {
    id: 's2',
    number: '02',
    title: 'Architecture d\'intérieur',
    description: 'Matières nobles, lumière maîtrisée et proportions justes pour des intérieurs intemporels.',
    icon: 'interior',
  },
  {
    id: 's3',
    number: '03',
    title: 'Réhabilitation',
    description: 'Nous révélons le potentiel du bâti existant en respectant son caractère et son histoire.',
    icon: 'renovation',
  },
  {
    id: 's4',
    number: '04',
    title: 'Direction de chantier',
    description: 'Un suivi rigoureux, de la première pierre à la remise des clés, sans compromis sur l\'exigence.',
    icon: 'supervision',
  },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Villa Solstice',
    location: 'Cap Ferrat',
    year: '2024',
    category: 'Résidence privée',
    image: 'https://picsum.photos/seed/villa-solstice/1400/1000',
  },
  {
    id: 'p2',
    title: 'Maison de Verre',
    location: 'Chamonix',
    year: '2023',
    category: 'Résidence privée',
    image: 'https://picsum.photos/seed/maison-verre/1400/1000',
  },
  {
    id: 'p3',
    title: 'Le Monolithe',
    location: 'Bordeaux',
    year: '2023',
    category: 'Siège social',
    image: 'https://picsum.photos/seed/monolithe/1400/1000',
  },
  {
    id: 'p4',
    title: 'Pavillon Ombre',
    location: 'Aix-en-Provence',
    year: '2022',
    category: 'Résidence privée',
    image: 'https://picsum.photos/seed/pavillon-ombre/1400/1000',
  },
  {
    id: 'p5',
    title: 'Atelier Lumière',
    location: 'Lyon',
    year: '2022',
    category: 'Espace culturel',
    image: 'https://picsum.photos/seed/atelier-lumiere/1400/1000',
  },
];

export const stats: Stat[] = [
  { id: 'st1', value: 18, suffix: '+', label: "Années d'expérience" },
  { id: 'st2', value: 126, suffix: '', label: 'Projets réalisés' },
  { id: 'st3', value: 24, suffix: '', label: 'Architectes & designers' },
  { id: 'st4', value: 98, suffix: '%', label: 'Clients satisfaits' },
];

export const processSteps: ProcessStep[] = [
  {
    id: 'pr1',
    index: '01',
    title: 'Écoute & analyse',
    description: 'Nous étudions votre site, vos usages et vos ambitions pour poser les fondations du projet.',
  },
  {
    id: 'pr2',
    index: '02',
    title: 'Esquisse conceptuelle',
    description: 'Une première narration architecturale prend forme, entre volumes, lumière et matérialité.',
  },
  {
    id: 'pr3',
    index: '03',
    title: 'Développement technique',
    description: 'Plans, coupes et détails d\'exécution sont affinés jusqu\'à la précision millimétrique.',
  },
  {
    id: 'pr4',
    index: '04',
    title: 'Réalisation',
    description: 'Nous accompagnons chaque étape du chantier pour garantir la fidélité absolue au projet dessiné.',
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 'f1',
    question: 'Quelles sont les étapes d\'une collaboration avec Atelier Verrier ?',
    answer:
      'Chaque projet débute par une rencontre sur site, suivie d\'une phase d\'esquisse, puis d\'un développement technique complet avant le lancement du chantier, que nous supervisons jusqu\'à la livraison.',
  },
  {
    id: 'f2',
    question: 'Intervenez-vous sur des projets de rénovation ?',
    answer:
      'Oui, la réhabilitation constitue une part importante de notre pratique. Nous portons une attention particulière à la structure existante et à son héritage architectural.',
  },
  {
    id: 'f3',
    question: 'Quel est le délai moyen d\'un projet, de l\'esquisse à la livraison ?',
    answer:
      'Selon l\'ampleur du projet, comptez entre douze et vingt-quatre mois. Chaque calendrier est établi sur mesure lors de notre premier échange.',
  },
  {
    id: 'f4',
    question: 'Travaillez-vous en dehors de la France ?',
    answer:
      'Notre atelier intervient à l\'international sur une sélection de projets, notamment en Suisse, en Italie et au Royaume-Uni.',
  },
  {
    id: 'f5',
    question: 'Comment sont établis vos honoraires ?',
    answer:
      'Nos honoraires sont calculés selon la nature, la complexité et l\'envergure du projet. Un devis détaillé est transmis après notre première visite.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Claire Dubreuil',
    role: 'Villa Solstice, Cap Ferrat',
    quote:
      'Une écoute rare et un sens du détail absolu. Chaque pièce de notre maison raconte une histoire pensée avec précision.',
    rating: 5,
    image: 'https://picsum.photos/seed/claire-d/200/200',
  },
  {
    id: 't2',
    name: 'Antoine Ferrand',
    role: 'Le Monolithe, Bordeaux',
    quote:
      'L\'équipe a su transformer un simple cahier des charges en une signature architecturale forte et intemporelle.',
    rating: 5,
    image: 'https://picsum.photos/seed/antoine-f/200/200',
  },
  {
    id: 't3',
    name: 'Margaux Silvestri',
    role: 'Maison de Verre, Chamonix',
    quote:
      'Un professionnalisme exemplaire du premier croquis à la remise des clés. Le résultat dépasse toutes nos attentes.',
    rating: 5,
    image: 'https://picsum.photos/seed/margaux-s/200/200',
  },
  {
    id: 't4',
    name: 'Julien Roquefort',
    role: 'Pavillon Ombre, Aix-en-Provence',
    quote:
      'Une approche architecturale sensible, presque sculpturale, qui respecte pleinement l\'esprit du lieu.',
    rating: 5,
    image: 'https://picsum.photos/seed/julien-r/200/200',
  },
];
