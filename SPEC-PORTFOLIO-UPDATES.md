# SPEC - Portfolio Updates Implementation
**Based on:** PRD-PORTFOLIO-UPDATES.md
**Date:** 2026-03-23
**Implementation Phases:** 3 sprints

---

## Overview

This spec defines the technical implementation for aligning the portfolio with the updated CV. Changes are organized by file and component, with exact code modifications.

---

## Phase 1: Critical Content Updates (Must Have)

### 1.1 Update Bio - `pages/index.mdx`

**Current State:**
```markdown
- Desenvolvedor Full-Stack
- Apaixonado por Javascript, Devops e Cloud Computing 🔥
- Tech-Writer & Mentoria Tech
```

**Required Changes:**

```markdown
# Jairo Tunisse

Desenvolvedor Full Stack com **8 anos de experiência** em JavaScript e ecossistema React, aliando sólida formação em Engenharia da Computação a **6 anos** de atuação em infraestrutura de TI na Força Aérea Brasileira.

**Fundador & CEO** da [ESHGO Software House](https://eshgo.com.br) | **3º Sargento** da FAB | Especialista em monitoramento de redes em larga escala (+3.000 ativos) | Formando em **Engenharia da Computação** (Uniamérica, 2027)

## Contato

- 📧 [jairo_tunisse@outlook.com](mailto:jairo_tunisse@outlook.com)
- 📱 [(12) 98321-6226](tel:+5512983216226)
- 🌐 [jairotunisse.dev](https://jairotunisse.dev)
- 📍 Guaratinguetá, SP
- [GitHub](https://github.com/Jairotsb) · [LinkedIn](#) · [Twitter](#)
```

**Files to modify:**
- `pages/index.mdx` (lines 1-20 approximately)

---

### 1.2 Projects Component - `components/Projects/index.tsx`

**Current Issues:**
- ❌ "Bloomily" → should be "Blumily"
- ❌ Missing: HeartPass, LEXFY, Zabbix Matrix Monitor, Yggdrasil Browser
- ❌ Generic descriptions

**New Data Structure:**

```typescript
// components/Projects/types.ts (create new file)
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
```

**Implementation in `components/Projects/index.tsx`:**

```typescript
const projects: Project[] = [
  // === FEATURED PROJECTS ===
  {
    id: 'heartpass',
    title: 'HeartPass (ilovtks)',
    description: 'Plataforma SaaS de venda de ingressos com dashboard administrativo, integração Mercado Pago e arquitetura serverless. Simplificou fluxo de pagamento de 3 camadas para abordagem direta via SDK.',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Mercado Pago SDK', 'Vercel'],
    link: 'https://heartpass.com.br',
    badge: 'ESHGO',
    category: 'SaaS',
    featured: true,
    image: '/projects/heartpass.png'
  },
  {
    id: 'blumily',
    title: 'Blumily', // FIXED from "Bloomily"
    description: 'Micro-SaaS de diário digital de gravidez com modelo freemium, armazenamento otimizado via Cloudflare R2, plano de monetização e estratégia de marketing para Instagram/TikTok.',
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'Supabase', 'Stripe', 'Cloudflare R2'],
    link: 'https://blumily.com',
    badge: 'ESHGO',
    category: 'SaaS',
    featured: true,
    image: '/projects/blumily.png'
  },
  {
    id: 'lexfy',
    title: 'LEXFY / Dr. LEX',
    description: 'Assistente jurídico com IA (chatbot) integrado a sistema de assinaturas recorrentes. Utiliza Gemini API para processamento de linguagem natural.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Gemini API', 'Stripe', 'Supabase'],
    link: 'https://lexfy.com.br',
    badge: 'ESHGO',
    category: 'SaaS',
    featured: true,
    image: '/projects/lexfy.png'
  },
  {
    id: 'eshgo-landing',
    title: 'ESHGO - Landing Page',
    description: 'Website institucional da software house com design moderno e animações fluidas.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://eshgo.com.br',
    badge: 'ESHGO',
    category: 'Landing Page',
    featured: true,
    image: '/projects/eshgo.png'
  },

  // === INSTITUTIONAL PROJECTS (FAB) ===
  {
    id: 'zabbix-matrix',
    title: 'Zabbix Matrix Monitor',
    description: 'Painel de monitoramento de rede em tempo real para a EEAR/FAB com visualização interativa do status de mais de 1.000 máquinas.',
    technologies: ['React', 'FastAPI', 'Zabbix API', 'Grafana'],
    link: null,
    badge: 'FAB',
    category: 'Institutional',
    featured: false,
    image: '/projects/zabbix-matrix.png'
  },
  {
    id: 'yggdrasil',
    title: 'Yggdrasil Browser',
    description: 'Navegador institucional dual-engine construído com Electron para atender políticas específicas de segurança e navegação da FAB.',
    technologies: ['Electron', 'JavaScript', 'Node.js'],
    link: null,
    badge: 'FAB',
    category: 'Institutional',
    featured: false,
    image: '/projects/yggdrasil.png'
  },

  // === CLIENT PROJECTS ===
  {
    id: 'kyvus',
    title: 'Kyvus - Landing Page',
    description: 'Landing page institucional desenvolvida para cliente.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: null,
    category: 'Landing Page',
    featured: false
  },
  {
    id: 'celta-eventos',
    title: 'Celta Eventos - Website',
    description: 'Website para empresa de eventos.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: null,
    category: 'Landing Page',
    featured: false
  }
];
```

**UI Updates:**

```tsx
// Add category filters
const categories = ['All', 'SaaS', 'Institutional', 'Landing Page', 'Tool'];

// Add featured section at top
<section className="featured-projects">
  <h2>Projetos em Destaque</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.filter(p => p.featured).map(project => (
      <ProjectCard key={project.id} project={project} size="large" />
    ))}
  </div>
</section>

// Add institutional projects section
<section className="institutional-projects">
  <h2>Projetos Institucionais (FAB)</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.filter(p => p.category === 'Institutional').map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
</section>
```

**Files to create/modify:**
- `components/Projects/types.ts` (new)
- `components/Projects/index.tsx` (modify)
- `components/Projects/ProjectCard.tsx` (modify - add badge support)

---

### 1.3 Timeline Component - `components/Timeline/index.tsx`

**Critical Fixes:**
- ❌ ESHGO missing as primary experience
- ❌ FAB dates wrong: "2022 - Presente" → should be "Março 2020 - Presente"
- ❌ Generic descriptions

**New Data Structure:**

```typescript
// components/Timeline/types.ts (create new file)
export interface TimelineExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string; // ISO format for sorting
  endDate: string | null; // null if current
  description: string;
  current: boolean;
  achievements: string[];
  type: 'work' | 'education';
}
```

**Implementation:**

```typescript
const experiences: TimelineExperience[] = [
  {
    id: 'eshgo-founder',
    role: 'Fundador & Desenvolvedor Full Stack',
    company: 'ESHGO Software House',
    location: 'São Paulo, SP',
    period: 'Novembro 2023 - Presente',
    startDate: '2023-11-01',
    endDate: null,
    current: true,
    type: 'work',
    description: 'Fundador de software house com portfólio de produtos SaaS (HeartPass, Blumily, LEXFY) e projetos sob demanda. Arquitetura de soluções serverless, integração com APIs de pagamento (Stripe, Mercado Pago), e liderança técnica de projetos.',
    achievements: [
      'Desenvolveu HeartPass, plataforma SaaS de ticketing com integração Mercado Pago',
      'Projetou Blumily, micro-SaaS de diário de gravidez com armazenamento via Cloudflare R2',
      'Criou LEXFY, assistente jurídico com IA usando Gemini API e modelo de assinaturas',
      'Desenvolveu landing pages e sistemas web completos para clientes (Kyvus, Celta Eventos)'
    ]
  },
  {
    id: 'eshgo-tech-writer',
    role: 'Tech Writer',
    company: 'ESHGO Soluções Tecnológicas',
    location: 'Lorena, SP',
    period: '2025 - Presente',
    startDate: '2025-01-01',
    endDate: null,
    current: true,
    type: 'work',
    description: 'Produção de artigos sobre tecnologias emergentes, tutoriais e melhores práticas em TI para o blog técnico da empresa.',
    achievements: []
  },
  {
    id: 'fab-specialist',
    role: 'Especialista em Infraestrutura de TI & Monitoramento de Redes',
    company: 'Força Aérea Brasileira (FAB) – EEAR',
    location: 'Guaratinguetá, SP',
    period: 'Março 2020 - Presente', // FIXED from "2022 - Presente"
    startDate: '2020-03-01',
    endDate: null,
    current: true,
    type: 'work',
    description: 'Administração de ambiente de monitoramento em larga escala (+1.000 máquinas) com Zabbix e Grafana. Desenvolvimento de ferramentas web institucionais e automação de processos.',
    achievements: [
      'Desenvolveu Zabbix Matrix Monitor (React + FastAPI) para visualização em tempo real da rede',
      'Criou Yggdrasil, navegador institucional com Electron dual-engine',
      'Automatizou configuração de estações Linux Mint via script (eear_setup.sh)',
      'Diagnosticou e solucionou problemas complexos de rede (loop Layer 2, MAC flapping)',
      'Liderou migração de sistemas legados para Windows 11 e Linux (+1.000 equipamentos)'
    ]
  },
  {
    id: 'fab-sergeant',
    role: 'Efetivo Militar (3º Sgt) - TI',
    company: 'EEAR - Força Aérea Brasileira',
    location: 'Guaratinguetá, SP',
    period: 'Março 2022 - Presente',
    startDate: '2022-03-01',
    endDate: null,
    current: true,
    type: 'work',
    description: 'Promovido a 3º Sargento. Especialização em monitoramento de redes, desenvolvimento de ferramentas web e liderança técnica.',
    achievements: []
  },
  {
    id: 'fab-auxiliary',
    role: 'Auxiliar Técnico - TI',
    company: 'EEAR - Força Aérea Brasileira',
    location: 'Guaratinguetá, SP',
    period: 'Março 2020 - Março 2022',
    startDate: '2020-03-01',
    endDate: '2022-03-01',
    current: false,
    type: 'work',
    description: 'Suporte técnico, manutenção de sistemas e computadores. Primeiro contato com infraestrutura de larga escala.',
    achievements: []
  }
];

// Sort by most recent first
const sortedExperiences = experiences
  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
```

**Files to create/modify:**
- `components/Timeline/types.ts` (new)
- `components/Timeline/index.tsx` (major refactor)
- `components/Timeline/TimelineItem.tsx` (modify - add achievements list)

---

## Phase 2: Certifications & Skills (Should Have)

### 2.1 Course Gallery - `components/CourseGallery/index.tsx`

**Current State:** Mock data with "Exemplo de Curso 1, 2, 3"

**New Implementation:**

```typescript
// components/CourseGallery/types.ts
export interface Course {
  id: number;
  name: string;
  institution: 'Rocketseat' | 'Uniamérica';
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Mobile' | 'DevOps' | 'Design';
  image: string;
  certificateUrl?: string;
  completedAt?: string;
}

// components/CourseGallery/data.ts
export const courses: Course[] = [
  // ROCKETSEAT
  {
    id: 1,
    name: 'Next.js Foundations',
    institution: 'Rocketseat',
    category: 'Frontend',
    image: '/certificates/rocketseat-nextjs.jpg',
    certificateUrl: '#'
  },
  {
    id: 2,
    name: 'Backend & Frontend Integration',
    institution: 'Rocketseat',
    category: 'Full Stack',
    image: '/certificates/rocketseat-integration.jpg'
  },
  {
    id: 3,
    name: 'Full Stack Pleno',
    institution: 'Rocketseat',
    category: 'Full Stack',
    image: '/certificates/rocketseat-fullstack.jpg'
  },
  {
    id: 4,
    name: 'Java Certification',
    institution: 'Rocketseat',
    category: 'Backend',
    image: '/certificates/rocketseat-java.jpg'
  },
  {
    id: 5,
    name: 'JavaScript',
    institution: 'Rocketseat',
    category: 'Frontend',
    image: '/certificates/rocketseat-js.jpg'
  },
  {
    id: 6,
    name: 'React.js',
    institution: 'Rocketseat',
    category: 'Frontend',
    image: '/certificates/rocketseat-react.jpg'
  },
  {
    id: 7,
    name: 'Node.js',
    institution: 'Rocketseat',
    category: 'Backend',
    image: '/certificates/rocketseat-node.jpg'
  },
  {
    id: 8,
    name: 'React Native',
    institution: 'Rocketseat',
    category: 'Mobile',
    image: '/certificates/rocketseat-rn.jpg'
  },

  // UNIAMÉRICA
  {
    id: 9,
    name: 'User Experience (UX)',
    institution: 'Uniamérica',
    category: 'Design',
    image: '/certificates/uniamerica-ux.jpg'
  },
  {
    id: 10,
    name: 'Programação e Desenvolvimento de Sistemas',
    institution: 'Uniamérica',
    category: 'Full Stack',
    image: '/certificates/uniamerica-dev.jpg'
  },
  {
    id: 11,
    name: 'Cloud Computing',
    institution: 'Uniamérica',
    category: 'DevOps',
    image: '/certificates/uniamerica-cloud.jpg'
  },
  {
    id: 12,
    name: 'Desenvolvedor Mobile',
    institution: 'Uniamérica',
    category: 'Mobile',
    image: '/certificates/uniamerica-mobile.jpg'
  }
];
```

**UI Updates:**

```tsx
// Add filters
const [selectedCategory, setSelectedCategory] = useState<string>('All');
const [selectedInstitution, setSelectedInstitution] = useState<string>('All');

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Design'];
const institutions = ['All', 'Rocketseat', 'Uniamérica'];

const filteredCourses = courses
  .filter(c => selectedCategory === 'All' || c.category === selectedCategory)
  .filter(c => selectedInstitution === 'All' || c.institution === selectedInstitution);
```

**Files to create/modify:**
- `components/CourseGallery/types.ts` (new)
- `components/CourseGallery/data.ts` (new)
- `components/CourseGallery/index.tsx` (major refactor)
- `pages/cursos.mdx` (already exists, verify integration)

---

### 2.2 Skills/Stack Component - NEW

**Create:** `components/Stack/index.tsx`

```typescript
// components/Stack/types.ts
export interface SkillCategory {
  id: string;
  name: string;
  icon: string; // or React component
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
}

// components/Stack/data.ts
export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Front-end',
    icon: '🎨',
    skills: [
      { name: 'React.js', level: 'Expert', yearsOfExperience: 8 },
      { name: 'Next.js', level: 'Expert', yearsOfExperience: 5 },
      { name: 'TypeScript', level: 'Advanced', yearsOfExperience: 6 },
      { name: 'JavaScript (ES6+)', level: 'Expert', yearsOfExperience: 8 },
      { name: 'HTML5', level: 'Expert' },
      { name: 'CSS3', level: 'Expert' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'Styled-components', level: 'Advanced' },
      { name: 'Material-UI (MUI)', level: 'Intermediate' },
      { name: 'Vite.js', level: 'Advanced' },
      { name: 'Figma', level: 'Intermediate' }
    ]
  },
  {
    id: 'backend',
    name: 'Back-end',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 'Advanced', yearsOfExperience: 6 },
      { name: 'Bun.js', level: 'Intermediate' },
      { name: 'FastAPI (Python)', level: 'Intermediate' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'API RESTful', level: 'Expert' },
      { name: 'WebSockets', level: 'Intermediate' }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: '📱',
    skills: [
      { name: 'React Native', level: 'Advanced', yearsOfExperience: 4 }
    ]
  },
  {
    id: 'database',
    name: 'Banco de Dados',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 'Advanced' },
      { name: 'Firebase', level: 'Advanced' },
      { name: 'PostgreSQL', level: 'Intermediate' },
      { name: 'Supabase', level: 'Advanced' }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps & Infraestrutura',
    icon: '🚀',
    skills: [
      { name: 'Docker', level: 'Intermediate' },
      { name: 'Git/GitHub', level: 'Expert' },
      { name: 'Vercel', level: 'Advanced' },
      { name: 'Cloudflare (R2/CDN)', level: 'Advanced' },
      { name: 'Linux (Administração)', level: 'Advanced', yearsOfExperience: 6 },
      { name: 'Zabbix', level: 'Advanced', yearsOfExperience: 4 },
      { name: 'Grafana', level: 'Intermediate', yearsOfExperience: 3 }
    ]
  },
  {
    id: 'network',
    name: 'Redes & Segurança',
    icon: '🔒',
    skills: [
      { name: 'Cisco IOS (Catalyst 3850/2950)', level: 'Intermediate' },
      { name: 'VLANs', level: 'Intermediate' },
      { name: 'Troubleshooting Layer 2/3', level: 'Advanced' },
      { name: 'SNMP', level: 'Intermediate' },
      { name: 'Monitoramento de Infraestrutura', level: 'Advanced' }
    ]
  },
  {
    id: 'methodologies',
    name: 'Metodologias & Soft Skills',
    icon: '🧠',
    skills: [
      { name: 'Scrum/Agile', level: 'Advanced' },
      { name: 'Clean Code', level: 'Advanced' },
      { name: 'Documentação Técnica (SDD/PRD)', level: 'Advanced' },
      { name: 'Liderança Técnica', level: 'Intermediate' },
      { name: 'Mentoria', level: 'Intermediate' },
      { name: 'Comunicação Interdepartamental', level: 'Advanced' }
    ]
  }
];
```

**Component:**

```tsx
// components/Stack/index.tsx
import { skillsData } from './data';
import SkillCard from './SkillCard';

export default function Stack() {
  return (
    <div className="stack-container">
      <h1>Stack Técnico</h1>
      <p className="subtitle">
        Competências desenvolvidas ao longo de 8 anos de experiência em desenvolvimento e infraestrutura
      </p>

      <div className="skills-grid">
        {skillsData.map(category => (
          <div key={category.id} className="skill-category">
            <h2>
              <span className="icon">{category.icon}</span>
              {category.name}
            </h2>
            <div className="skills-list">
              {category.skills.map(skill => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Create page:** `pages/stack.mdx`

```mdx
import Stack from '@/components/Stack';

# Stack Técnico

<Stack />
```

**Files to create:**
- `components/Stack/types.ts`
- `components/Stack/data.ts`
- `components/Stack/index.tsx`
- `components/Stack/SkillCard.tsx`
- `pages/stack.mdx`

---

## Phase 3: Additional Improvements (Could Have)

### 3.1 Education Section

**Create:** `components/Education/index.tsx`

```typescript
interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: 'Cursando' | 'Concluído';
  location: string;
}

const education: Education[] = [
  {
    id: 'uniamerica',
    degree: 'Bacharelado em Engenharia da Computação',
    institution: 'Universidade das Américas Descomplica – Uniamérica',
    period: '2024 - 2027 (previsão)',
    status: 'Cursando',
    location: 'EAD'
  },
  {
    id: 'etec',
    degree: 'Técnico em Desenvolvimento de Sistemas',
    institution: 'ETEC – Escola Técnica Estadual (Centro Paula Souza)',
    period: '2018 - 2019',
    status: 'Concluído',
    location: 'Cruzeiro, SP'
  }
];
```

**Add to:** `pages/carreira.mdx` or create separate page

---

### 3.2 SEO & Meta Tags

**Update:** `pages/_document.tsx`

```tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="title" content="Jairo Tunisse - Full Stack Developer | 8 anos JavaScript" />
        <meta
          name="description"
          content="Desenvolvedor Full Stack com 8 anos de experiência em React, Next.js e TypeScript. Fundador da ESHGO Software House. Especialista em infraestrutura de TI e monitoramento de redes."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jairotunisse.dev/" />
        <meta property="og:title" content="Jairo Tunisse - Full Stack Developer" />
        <meta
          property="og:description"
          content="Desenvolvedor Full Stack com 8 anos de experiência. Fundador da ESHGO Software House."
        />
        <meta property="og:image" content="https://jairotunisse.dev/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jairotunisse.dev/" />
        <meta property="twitter:title" content="Jairo Tunisse - Full Stack Developer" />
        <meta
          property="twitter:description"
          content="Desenvolvedor Full Stack com 8 anos de experiência. Fundador da ESHGO Software House."
        />
        <meta property="twitter:image" content="https://jairotunisse.dev/og-image.jpg" />

        {/* Schema.org for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jairo Tunisse",
              "jobTitle": "Full Stack Developer",
              "url": "https://jairotunisse.dev",
              "sameAs": [
                "https://github.com/Jairotsb",
                "https://twitter.com/jairotsb",
                "https://instagram.com/jairotsb"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "ESHGO Software House"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

### 3.3 Performance Optimizations

**Image Optimization:**

```tsx
// In all components using images, replace <img> with Next.js Image
import Image from 'next/image';

<Image
  src="/projects/heartpass.png"
  alt="HeartPass Platform"
  width={600}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL="/projects/heartpass-blur.jpg"
/>
```

**Code Splitting:**

```tsx
// For heavy components (like CourseGallery)
import dynamic from 'next/dynamic';

const CourseGallery = dynamic(() => import('@/components/CourseGallery'), {
  loading: () => <p>Carregando certificações...</p>,
  ssr: false
});
```

---

## Implementation Checklist

### Sprint 1 (P0 - Must Have) - Est. 4-6h
- [ ] Update [pages/index.mdx](pages/index.mdx) with new bio and contact info
- [ ] Fix "Bloomily" → "Blumily" in [components/Projects/index.tsx](components/Projects/index.tsx)
- [ ] Add HeartPass project
- [ ] Add LEXFY project
- [ ] Add Zabbix Matrix Monitor project
- [ ] Add Yggdrasil Browser project
- [ ] Update project descriptions with detailed info
- [ ] Fix FAB dates in [components/Timeline/index.tsx](components/Timeline/index.tsx) (2022 → Março 2020)
- [ ] Add ESHGO Software House to timeline
- [ ] Add achievements to FAB experience
- [ ] Add phone number and location to contact

### Sprint 2 (P1 - Should Have) - Est. 3-4h
- [ ] Create `components/CourseGallery/data.ts` with real certifications
- [ ] Update [components/CourseGallery/index.tsx](components/CourseGallery/index.tsx)
- [ ] Add category filters to course gallery
- [ ] Create `components/Stack/` directory and files
- [ ] Implement Stack component with all skill categories
- [ ] Create [pages/stack.mdx](pages/stack.mdx)
- [ ] Add Stack link to navigation

### Sprint 3 (P2 - Could Have) - Est. 2-3h
- [ ] Create Education component
- [ ] Update SEO meta tags in [pages/_document.tsx](pages/_document.tsx)
- [ ] Add Schema.org structured data
- [ ] Optimize images with Next.js Image component
- [ ] Implement code splitting for heavy components
- [ ] Create OG image (`/public/og-image.jpg`)

---

## Testing Checklist

- [ ] All projects display correctly with proper badges
- [ ] Timeline shows correct dates (ESHGO: Nov 2023, FAB: Mar 2020)
- [ ] Course gallery filters work
- [ ] Stack page renders all skill categories
- [ ] Contact links are functional (email, phone)
- [ ] Mobile responsive (test on < 768px)
- [ ] Page load time < 3s
- [ ] No console errors
- [ ] CV download button works
- [ ] All links open correctly (external in new tab)

---

## Dependencies

No new dependencies required. All features use existing tech:
- Next.js (already installed)
- TypeScript (already configured)
- Tailwind CSS (already configured)

---

## Notes

1. **Images:** Placeholder paths used (`/projects/*.png`, `/certificates/*.jpg`). Replace with actual image paths.
2. **Links:** Some project links marked as `null` (internal FAB projects). Verify correct URLs for public projects.
3. **Badge Design:** Create visual badge component for "FAB", "ESHGO", "Open Source" labels.
4. **Filtering:** Consider adding search functionality to projects page if list grows.
5. **Analytics:** Consider adding Google Analytics or Vercel Analytics to track page views.

---

## File Structure Summary

```
portfolio-next/
├── components/
│   ├── Projects/
│   │   ├── index.tsx (MODIFY)
│   │   ├── types.ts (NEW)
│   │   └── ProjectCard.tsx (MODIFY)
│   ├── Timeline/
│   │   ├── index.tsx (MODIFY)
│   │   ├── types.ts (NEW)
│   │   └── TimelineItem.tsx (MODIFY)
│   ├── CourseGallery/
│   │   ├── index.tsx (MODIFY)
│   │   ├── types.ts (NEW)
│   │   └── data.ts (NEW)
│   ├── Stack/
│   │   ├── index.tsx (NEW)
│   │   ├── types.ts (NEW)
│   │   ├── data.ts (NEW)
│   │   └── SkillCard.tsx (NEW)
│   └── Education/
│       └── index.tsx (NEW)
├── pages/
│   ├── index.mdx (MODIFY)
│   ├── projects.mdx (verify)
│   ├── carreira.mdx (verify)
│   ├── cursos.mdx (verify)
│   ├── stack.mdx (NEW)
│   └── _document.tsx (MODIFY)
└── public/
    ├── projects/ (add images)
    ├── certificates/ (add images)
    └── og-image.jpg (NEW)
```

---

**End of Spec**
