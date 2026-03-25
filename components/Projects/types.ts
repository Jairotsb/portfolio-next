export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  github?: string;
  badge?: 'FAB' | 'ESHGO' | 'Open Source';
  category: 'SaaS' | 'Institutional' | 'Landing Page' | 'Tool';
  featured: boolean;
  image?: string;
}
