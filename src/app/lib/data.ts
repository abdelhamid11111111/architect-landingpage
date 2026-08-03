export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "residentiel",
    index: "01",
    title: "Architecture résidentielle",
    description:
      "Des résidences façonnées sur mesure, du terrain jusqu'au dernier détail de finition.",
  },
  {
    id: "interieur",
    index: "02",
    title: "Architecture d'intérieur",
    description:
      "Des intérieurs pensés comme des œuvres, où chaque matière raconte une histoire.",
  },
  {
    id: "direction",
    index: "03",
    title: "Direction artistique",
    description:
      "Une vision globale, de la structure au mobilier, jusqu'au dessin de la lumière.",
  },
  {
    id: "patrimoine",
    index: "04",
    title: "Rénovation patrimoniale",
    description:
      "La restauration d'édifices d'exception, entre mémoire du lieu et écriture contemporaine.",
  },
];

export interface Project {
  id: string;
  name: string;
  location: string;
  category: string;
  year: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "villa-argent",
    name: "Villa Argent",
    location: "Saint-Tropez",
    category: "Résidentiel",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "maison-de-verre",
    name: "Maison de Verre",
    location: "Neuilly-sur-Seine",
    category: "Résidentiel",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "le-belvedere",
    name: "Le Belvédère",
    location: "Chamonix",
    category: "Résidentiel",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "hotel-particulier",
    name: "Hôtel Particulier Lumière",
    location: "Paris 7e",
    category: "Rénovation",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "fondation-arcadie",
    name: "Fondation Arcadie",
    location: "Bordeaux",
    category: "Culturel",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop",
  },
];

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { id: "team", value: 42, suffix: "", label: "Membres de l'équipe" },
  { id: "projects", value: 128, suffix: "", label: "Projets terminés" },
  { id: "years", value: 18, suffix: " ans", label: "D'expérience" },
];

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Écoute",
    description:
      "Nous rencontrons le site, ses usages et ses contraintes, pour comprendre ce que le lieu attend de nous.",
  },
  {
    index: "02",
    title: "Esquisse",
    description:
      "Premières intentions : volumes, orientation, lumière. L'idée prend forme avant la ligne.",
  },
  {
    index: "03",
    title: "Conception",
    description:
      "Plans exécutifs, choix des matières, ingénierie. Chaque détail est dessiné avant d'être bâti.",
  },
  {
    index: "04",
    title: "Réalisation",
    description:
      "Suivi de chantier rigoureux, jusqu'à la remise des clés et la première lumière du matin.",
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "types-projets",
    question: "Quels types de projets accompagnez-vous ?",
    answer:
      "Nous concevons des résidences privées, des intérieurs d'exception, des lieux culturels et des rénovations patrimoniales, en France et à l'étranger.",
  },
  {
    id: "international",
    question: "Intervenez-vous en dehors de la France ?",
    answer:
      "Oui. Notre atelier parisien accompagne des clients en Europe, en Suisse et sur le pourtour méditerranéen, avec des équipes présentes sur chaque chantier.",
  },
  {
    id: "duree",
    question: "Combien de temps dure un projet type ?",
    answer:
      "Entre douze et vingt-quatre mois, de l'esquisse à la livraison, selon l'ampleur du programme et les contraintes patrimoniales du bâti.",
  },
  {
    id: "artisans",
    question: "Travaillez-vous avec nos propres artisans et entreprises ?",
    answer:
      "Bien volontiers. Nous savons aussi bien piloter notre réseau de compagnons que collaborer avec les entreprises déjà choisies par nos clients.",
  },
  {
    id: "suivi",
    question: "Proposez-vous un accompagnement après livraison ?",
    answer:
      "Chaque projet bénéficie d'un suivi d'un an après remise des clés, pour ajuster, entretenir et faire vivre les espaces comme ils ont été pensés.",
  },
];

export interface Review {
  id: string;
  name: string;
  role: string;
  project: string;
  quote: string;
}

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Isabelle Fontenay",
    role: "Propriétaire",
    project: "Villa Argent, Saint-Tropez",
    quote:
      "Une écoute rare et un sens du détail qui a transformé notre terrain en un lieu que nous ne quittons plus.",
  },
  {
    id: "review-2",
    name: "Marc-Antoine Delcourt",
    role: "Collectionneur d'art",
    project: "Maison de Verre, Neuilly",
    quote:
      "Chaque pièce dialogue avec la lumière naturelle. C'est de l'architecture qui respire.",
  },
  {
    id: "review-3",
    name: "Hélène Roussillon",
    role: "Directrice, Fondation Arcadie",
    project: "Fondation Arcadie, Bordeaux",
    quote:
      "Ils ont su respecter l'histoire du bâtiment tout en lui offrant un second souffle contemporain.",
  },
  {
    id: "review-4",
    name: "Julien Ferrand",
    role: "Propriétaire",
    project: "Le Belvédère, Chamonix",
    quote:
      "Un chantier suivi avec une rigueur exemplaire, du premier croquis jusqu'à la dernière poignée de porte.",
  },
  {
    id: "review-5",
    name: "Camille Vasseur",
    role: "Propriétaire",
    project: "Hôtel Particulier Lumière, Paris",
    quote:
      "Une équipe qui pense en volumes et en matières avant de penser en mètres carrés. Le résultat est saisissant.",
  },
];

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#projets" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];
