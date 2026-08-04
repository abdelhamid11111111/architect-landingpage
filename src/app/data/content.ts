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
    description:
      "Une villa solaire posée sur la roche, où chaque baie vitrée cadre la Méditerranée.",
    image: 'https://www.luxclusivehomes.com/wp-content/uploads/2023/02/modern-home-on-the-coast.jpg',
  },
  {
    id: 'p2',
    title: 'Maison de Verre',
    location: 'Chamonix',
    year: '2023',
    category: 'Résidence privée',
    description:
      "Une extension de verre et d'acier qui dissout la frontière entre l'atelier et la forêt.",
    image: 'https://scontent.faga1-2.fna.fbcdn.net/v/t39.30808-6/310426538_468976248586607_9086447621812998419_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x685&ctp=s1280x685&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=LjSoUEYKrzIQ7kNvwEGeT-d&_nc_oc=AdpJa00iHLzx1kMFDS0WkFIpJWg8kx8wcCFGzRFFAGxpvb08yCuANoqVNjsdamqi58Y&_nc_zt=23&_nc_ht=scontent.faga1-2.fna&_nc_gid=ODU3SxlGXQKYD014PkgjYQ&_nc_ss=7b2a8&oh=00_AQGP1_D8DwT-QCID81ya52NN81EV65encSyoCACYtlDCoA&oe=6A78221E',
  },
  {
    id: 'p3',
    title: 'Le Monolithe',
    location: 'Bordeaux',
    year: '2023',
    category: 'Siège social',
    description: 'Un siège social sculpté dans le béton brut, habité par une lumière zénithale.',
    image: 'https://agastudio.ma/wp-content/uploads/2023/12/5.jpg',
  },
  {
    id: 'p4',
    title: 'Pavillon Ombre',
    location: 'Aix-en-Provence',
    year: '2022',
    category: 'Résidence privée',
    description:
      'Un pavillon de bois clair, rythmé de brise-soleil qui filtrent la lumière provençale.',
    image: 'https://story-rabat.com/wp-content/uploads/2025/12/Grand-Theatre-of-Rabat-Morocco-1024x546.webp',
  },
  {
    id: 'p5',
    title: 'Atelier Lumière',
    location: 'Lyon',
    year: '2022',
    category: 'Espace culturel',
    description:
      'La réhabilitation d\'une friche industrielle en un lieu de création baigné de lumière naturelle.',
    image: 'https://images.adsttc.com/media/images/67d0/0e99/6fa6/0801/8951/1a07/large_jpg/buildner-reveals-the-winning-projects-of-the-morocco-oasis-retreat-competition_1.jpg?1741688486',
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
