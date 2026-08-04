export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: 'concept' | 'interior' | 'renovation' | 'supervision';
}

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  description: string;
  image: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface ProcessStep {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}
