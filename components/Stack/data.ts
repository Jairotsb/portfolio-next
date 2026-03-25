import { SkillCategory } from './types';

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
