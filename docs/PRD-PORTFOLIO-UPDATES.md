# PRD - Atualização Portfolio Jairo Tunisse
**Data:** 23/03/2026
**Autor:** Jairo Tunisse
**Versão:** 1.0

---

## 1. Visão Geral

Este documento especifica as alterações e melhorias necessárias no portfólio pessoal (portfolio-next) para refletir fielmente as informações do currículo profissional atualizado de Jairo Tunisse (cv-jairo-tunisse-2026.pdf).

### 1.1 Objetivos
- Alinhar informações do portfólio com o currículo oficial
- Destacar conquistas profissionais e projetos de alto impacto
- Adicionar informações faltantes sobre experiência, projetos e certificações
- Melhorar a apresentação profissional e conversão para oportunidades

### 1.2 Escopo
- ✅ Página Inicial (Bio e Apresentação)
- ✅ Seção de Projetos
- ✅ Timeline de Carreira
- ✅ Certificações e Cursos
- ✅ Novas seções: Skills/Stack, Resumo Profissional

---

## 2. Análise de Gaps (Estado Atual vs. Currículo)

### 2.1 Página Inicial (index.mdx)

#### ❌ Estado Atual
```
- Desenvolvedor Full-Stack
- Apaixonado por Javascript, Devops e Cloud Computing 🔥
- Tech-Writer & Mentoria Tech
- TI Institucional & Monitoramento de dados
- AWS
- Monitoramento de dados
```

#### ✅ Esperado (Baseado no CV)
```
Desenvolvedor Full Stack com 8 anos de experiência em JavaScript e ecossistema React
Fundador & CEO da ESHGO Software House
3º Sargento da FAB - Especialista em Infraestrutura de TI
Experiência em monitoramento de redes em larga escala (+1.000 máquinas)
Formando em Engenharia da Computação
```

#### 📋 Mudanças Necessárias
- [ ] Atualizar bio para refletir os 8 anos de experiência
- [ ] Destacar fundação da ESHGO (Nov 2023 - Presente)
- [ ] Mencionar experiência na FAB (6 anos, infraestrutura de larga escala)
- [ ] Adicionar formação acadêmica (Eng. da Computação - Uniamérica, previsão 2027)
- [ ] Adicionar telefone: (12) 98321-6226
- [ ] Corrigir link do site: jairotunisse.dev

---

### 2.2 Projetos (Projects/index.tsx)

#### ❌ Projetos Atuais (Incompletos)
1. **ESHGO - Landing Page** ✅ OK
2. **Bloomily** ❌ Nome errado, descrição genérica

#### ✅ Projetos Faltantes do CV
1. **HeartPass (ilovtks)** - Plataforma SaaS de ticketing
2. **LEXFY / Dr. LEX** - Assistente jurídico com IA
3. **Zabbix Matrix Monitor** - Painel de monitoramento FAB
4. **Yggdrasil Browser** - Navegador institucional Electron

#### 📋 Mudanças Necessárias

**A. Atualizar projeto Blumily:**
```json
{
  "title": "Blumily",  // Corrigir de "Bloomily"
  "description": "Micro-SaaS de diário digital de gravidez com modelo freemium, armazenamento otimizado via Cloudflare R2, plano de monetização e estratégia de marketing para Instagram/TikTok.",
  "technologies": ["Next.js 16", "TypeScript", "Tailwind v4", "Supabase", "Stripe", "Cloudflare R2"],
  "link": "https://blumily.com" // ou link apropriado
}
```

**B. Adicionar HeartPass:**
```json
{
  "title": "HeartPass (ilovtks)",
  "description": "Plataforma SaaS de venda de ingressos com dashboard administrativo, integração Mercado Pago e arquitetura serverless. Simplificou fluxo de pagamento de 3 camadas para abordagem direta via SDK.",
  "technologies": ["Next.js 14", "TypeScript", "Tailwind", "Radix UI", "Mercado Pago SDK", "Vercel"],
  "link": "https://heartpass.com.br" // ou link apropriado
}
```

**C. Adicionar LEXFY:**
```json
{
  "title": "LEXFY / Dr. LEX",
  "description": "Assistente jurídico com IA (chatbot) integrado a sistema de assinaturas recorrentes. Utiliza Gemini API para processamento de linguagem natural.",
  "technologies": ["React", "Vite", "Tailwind", "Gemini API", "Stripe", "Supabase"],
  "link": "https://lexfy.com.br" // ou link apropriado
}
```

**D. Adicionar Zabbix Matrix Monitor:**
```json
{
  "title": "Zabbix Matrix Monitor",
  "description": "Painel de monitoramento de rede em tempo real para a EEAR/FAB com visualização interativa do status de mais de 1.000 máquinas.",
  "technologies": ["React", "FastAPI", "Zabbix API", "Grafana"],
  "link": null, // Projeto interno
  "badge": "FAB" // Opcional: badge de projeto institucional
}
```

**E. Adicionar Yggdrasil Browser:**
```json
{
  "title": "Yggdrasil Browser",
  "description": "Navegador institucional dual-engine construído com Electron para atender políticas específicas de segurança e navegação da FAB.",
  "technologies": ["Electron", "JavaScript", "Node.js"],
  "link": null, // Projeto interno
  "badge": "FAB"
}
```

**F. Adicionar outros projetos mencionados no CV:**
- Landing pages para clientes (Kyvus, Celta Eventos)
- Script eear_setup.sh (automação Linux Mint)

#### 📊 Organização Sugerida
```
PROJETOS EM DESTAQUE (Featured Projects)
├── HeartPass (ilovtks) - SaaS principal
├── Blumily - Micro-SaaS
├── LEXFY / Dr. LEX - IA/Chatbot
└── ESHGO - Landing Page

PROJETOS INSTITUCIONAIS (FAB)
├── Zabbix Matrix Monitor
└── Yggdrasil Browser

PROJETOS OPEN-SOURCE / GITHUB
└── (Repositórios do GitHub - mantém atual)
```

---

### 2.3 Timeline de Carreira (Timeline/index.tsx)

#### ❌ Problemas Identificados

1. **ESHGO ausente como experiência principal:**
   - CV: "Fundador & Desenvolvedor Full Stack | Novembro 2023 – Presente"
   - Timeline: ❌ Não existe

2. **Datas incorretas FAB:**
   - CV: "Março 2020 – Presente"
   - Timeline: "2022 - Presente" ❌

3. **Descrições genéricas vs. achievements específicos:**
   - CV lista conquistas técnicas específicas (Zabbix, Grafana, +1000 máquinas)
   - Timeline tem descrições vagas

#### 📋 Mudanças Necessárias

**A. Adicionar ESHGO Software House:**
```json
{
  "role": "Fundador & Desenvolvedor Full Stack",
  "company": "ESHGO Software House",
  "location": "São Paulo, SP",
  "period": "Novembro 2023 - Presente",
  "description": "Fundador de software house com portfólio de produtos SaaS (HeartPass, Blumily, LEXFY) e projetos sob demanda. Arquitetura de soluções serverless, integração com APIs de pagamento (Stripe, Mercado Pago), e liderança técnica de projetos.",
  "current": true,
  "achievements": [
    "Desenvolveu HeartPass, plataforma SaaS de ticketing com integração Mercado Pago",
    "Projetou Blumily, micro-SaaS de diário de gravidez com armazenamento via Cloudflare R2",
    "Criou LEXFY, assistente jurídico com IA usando Gemini API e modelo de assinaturas",
    "Desenvolveu landing pages e sistemas web completos para clientes (Kyvus, Celta Eventos)"
  ]
}
```

**B. Atualizar FAB - Especialista (período atual):**
```json
{
  "role": "Especialista em Infraestrutura de TI & Monitoramento de Redes",
  "company": "Força Aérea Brasileira (FAB) – EEAR",
  "location": "Guaratinguetá, SP",
  "period": "Março 2020 - Presente",  // CORRIGIR de "2022"
  "description": "Administração de ambiente de monitoramento em larga escala (+1.000 máquinas) com Zabbix e Grafana. Desenvolvimento de ferramentas web institucionais e automação de processos.",
  "current": true,
  "achievements": [
    "Desenvolveu Zabbix Matrix Monitor (React + FastAPI) para visualização em tempo real da rede",
    "Criou Yggdrasil, navegador institucional com Electron dual-engine",
    "Automatizou configuração de estações Linux Mint via script (eear_setup.sh)",
    "Diagnosticou e solucionou problemas complexos de rede (loop Layer 2, MAC flapping)",
    "Liderou migração de sistemas legados para Windows 11 e Linux (+1.000 equipamentos)"
  ]
}
```

**C. Dividir histórico FAB corretamente:**
```json
{
  "role": "Efetivo Militar (3º Sgt) - TI",
  "company": "EEAR - Força Aérea Brasileira",
  "location": "Guaratinguetá, SP",
  "period": "Março 2022 - Presente",
  "description": "Promovido a 3º Sargento. Especialização em monitoramento de redes, desenvolvimento de ferramentas web e liderança técnica.",
  "current": true
},
{
  "role": "Auxiliar Técnico - TI",
  "company": "EEAR - Força Aérea Brasileira",
  "location": "Guaratinguetá, SP",
  "period": "Março 2020 - Março 2022",
  "description": "Suporte técnico, manutenção de sistemas e computadores. Primeiro contato com infraestrutura de larga escala.",
  "current": false
}
```

**D. Adicionar Tech Writer ESHGO (se aplicável):**
```json
{
  "role": "Tech Writer",
  "company": "ESHGO Soluções Tecnológicas",
  "location": "Lorena, SP",
  "period": "2025 - Presente",
  "description": "Produção de artigos sobre tecnologias emergentes, tutoriais e melhores práticas em TI para o blog técnico da empresa.",
  "current": true
}
```

#### 📊 Ordem Cronológica Sugerida
```
1. ESHGO Software House - Fundador (Nov 2023 - Presente)
2. ESHGO - Tech Writer (2025 - Presente)
3. FAB - Especialista TI (Mar 2020 - Presente)
4. [Posições anteriores se houver]
```

---

### 2.4 Certificações e Cursos (CourseGallery/index.tsx)

#### ❌ Estado Atual
```javascript
const courses = [
  { name: "Exemplo de Curso 1", image: "/images/curso-1.jpg" },
  { name: "Exemplo de Curso 2", image: "/images/curso-2.jpg" },
  { name: "Exemplo de Curso 3", image: "/images/curso-3.jpg" }
];
```

#### ✅ Cursos Reais do CV

**A. Rocketseat:**
- Next.js Foundations
- Backend & Frontend Integration
- Full Stack Pleno
- Java Certification
- JavaScript
- React.js
- Node.js
- React Native

**B. Uniamérica:**
- User Experience (UX)
- Programação e Desenvolvimento de Sistemas
- Cloud Computing
- Desenvolvedor Mobile

#### 📋 Mudanças Necessárias

**Atualizar array de courses:**
```javascript
const courses = [
  // Rocketseat
  {
    id: 1,
    name: "Next.js Foundations",
    institution: "Rocketseat",
    image: "/certificates/rocketseat-nextjs.jpg",
    category: "Frontend"
  },
  {
    id: 2,
    name: "Backend & Frontend Integration",
    institution: "Rocketseat",
    image: "/certificates/rocketseat-integration.jpg",
    category: "Full Stack"
  },
  {
    id: 3,
    name: "Full Stack Pleno",
    institution: "Rocketseat",
    image: "/certificates/rocketseat-fullstack.jpg",
    category: "Full Stack"
  },
  {
    id: 4,
    name: "React.js",
    institution: "Rocketseat",
    image: "/certificates/rocketseat-react.jpg",
    category: "Frontend"
  },
  {
    id: 5,
    name: "Node.js",
    institution: "Rocketseat",
    image: "/certificates/rocketseat-node.jpg",
    category: "Backend"
  },
  {
    id: 6,
    name: "React Native",
    institution: "Rocketseat",
    image: "/certificates/rocketseat-rn.jpg",
    category: "Mobile"
  },

  // Uniamérica
  {
    id: 7,
    name: "User Experience (UX)",
    institution: "Uniamérica",
    image: "/certificates/uniamerica-ux.jpg",
    category: "Design"
  },
  {
    id: 8,
    name: "Cloud Computing",
    institution: "Uniamérica",
    image: "/certificates/uniamerica-cloud.jpg",
    category: "DevOps"
  },
  {
    id: 9,
    name: "Desenvolvedor Mobile",
    institution: "Uniamérica",
    image: "/certificates/uniamerica-mobile.jpg",
    category: "Mobile"
  }
];
```

**Adicionar filtros por categoria:**
- Frontend
- Backend
- Full Stack
- Mobile
- DevOps
- Design

---

### 2.5 Nova Seção: Stack Técnico / Competências

#### 📋 Criar nova página: `/pages/stack.mdx`

**Competências do CV:**

**Front-end:**
- React.js
- Next.js
- TypeScript
- JavaScript (ES6+)
- HTML5, CSS3
- Styled-components
- MUI (Material-UI)
- Vite.js
- Figma (UI/UX)

**Back-end:**
- Node.js
- Bun.js
- FastAPI (Python)
- Express.js
- API RESTful
- WebSockets

**Mobile:**
- React Native

**Banco de Dados:**
- MongoDB
- Firebase
- PostgreSQL

**DevOps & Infra:**
- Docker
- Git/GitHub
- Vercel
- Cloudflare (R2/CDN)
- Linux (administração)
- Zabbix
- Grafana

**Redes & Segurança:**
- Cisco IOS (Catalyst 3850/2950)
- VLANs
- Troubleshooting Layer 2/3
- SNMP
- Monitoramento de infraestrutura

**Metodologias & Soft Skills:**
- Scrum/Agile
- Clean Code
- Documentação técnica (SDD/PRD)
- Liderança técnica
- Mentoria
- Comunicação interdepartamental

#### 🎨 Implementação Sugerida

**Componente Stack:**
```tsx
// components/Stack/index.tsx
const skillsData = {
  frontend: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", ...],
  backend: ["Node.js", "Bun.js", "FastAPI", "Express.js", ...],
  mobile: ["React Native"],
  database: ["MongoDB", "Firebase", "PostgreSQL"],
  devops: ["Docker", "Git/GitHub", "Vercel", ...],
  network: ["Cisco IOS", "VLANs", "SNMP", ...],
  methodologies: ["Scrum/Agile", "Clean Code", ...]
};

// Visual: cards com ícones, badges coloridas, progress bars, etc.
```

---

### 2.6 Nova Seção: Resumo Profissional

#### 📋 Adicionar na página inicial ou criar `/pages/about.mdx`

**Texto do CV:**
```
Desenvolvedor Full Stack com 8 anos de experiência em JavaScript e ecossistema React,
aliando sólida formação em Engenharia da Computação a 6 anos de atuação em
infraestrutura de TI na Força Aérea Brasileira.

Especialista em front-end com React, Next.js e TypeScript, com domínio comprovado
de back-end (Node.js, MongoDB, Firebase) e integração de APIs.

Fundador de software house com portfólio de produtos SaaS e projetos sob demanda.

Perfil orientado a resultados, com experiência em monitoramento de redes
(Zabbix/Grafana), automação de processos e liderança técnica em ambientes de
alta escala (+1.000 máquinas).
```

#### 🎨 Implementação Sugerida
- Hero section expandida na home
- Ou página "/sobre" dedicada
- Cards com números de impacto:
  - **8 anos** experiência JavaScript
  - **+1.000** máquinas gerenciadas
  - **4+** produtos SaaS desenvolvidos
  - **6 anos** infraestrutura FAB

---

### 2.7 Formação Acadêmica

#### ❌ Estado Atual
- Não existe seção dedicada

#### ✅ Do CV
```
Universidade das Américas Descomplica – Uniamérica
Bacharelado em Engenharia da Computação (Cursando)
Previsão: 2027

ETEC – Escola Técnica Estadual (Centro Paula Souza)
Técnico em Desenvolvimento de Sistemas
2018 – 2019
```

#### 📋 Implementação
- Adicionar na página "Sobre" ou "Carreira"
- Ou criar componente Education similar ao Timeline

---

### 2.8 Informações de Contato

#### ❌ Estado Atual
```javascript
<a href="mailto:jairo_tunisse@outlook.com">e-mail</a>
// Twitter, GitHub, Instagram
```

#### ✅ Adicionar
- **Telefone:** (12) 98321-6226
- **Site:** jairotunisse.dev
- **Localização:** Cruzeiro, SP
- **LinkedIn:** (se aplicável)

---

## 3. Melhorias Técnicas e UX

### 3.1 SEO e Meta Tags
- [ ] Atualizar meta description com resumo profissional
- [ ] Adicionar Open Graph tags com projetos em destaque
- [ ] Schema.org markup para Person e Portfolio
- [ ] Atualizar title tags: "Jairo Tunisse - Full Stack Developer | 8 anos JavaScript"

### 3.2 Performance
- [ ] Otimizar imagens dos projetos (Next.js Image)
- [ ] Lazy loading para galeria de certificados
- [ ] Code splitting por rota

### 3.3 Acessibilidade
- [ ] ARIA labels para navegação
- [ ] Alt texts descritivos nas imagens
- [ ] Contraste WCAG AA compliant

### 3.4 Features Novas
- [ ] Dark/Light mode toggle (já existe no config?)
- [ ] Download do currículo em PDF (já existe ✅)
- [ ] Formulário de contato
- [ ] Blog técnico integrado (para Tech Writer ESHGO)
- [ ] Estatísticas GitHub em tempo real
- [ ] RSS feed para blog (se aplicável)

---

## 4. Priorização (MoSCoW)

### Must Have (P0)
1. ✅ Corrigir nome "Bloomily" → "Blumily"
2. ✅ Adicionar ESHGO na timeline de carreira
3. ✅ Corrigir datas FAB (2022 → Março 2020)
4. ✅ Adicionar projetos HeartPass e LEXFY
5. ✅ Atualizar bio com 8 anos experiência
6. ✅ Adicionar telefone e localização

### Should Have (P1)
7. ✅ Adicionar Zabbix Matrix Monitor e Yggdrasil
8. ✅ Atualizar certificações (remover exemplos, adicionar reais)
9. ✅ Criar seção de Stack Técnico
10. ✅ Adicionar achievements nas experiências

### Could Have (P2)
11. Criar página "Sobre" com resumo profissional
12. Adicionar formação acadêmica
13. Melhorar SEO e meta tags
14. Adicionar filtros na galeria de certificados
15. Integrar estatísticas GitHub

### Won't Have (Futuro)
16. Blog técnico integrado
17. Formulário de contato
18. Modo dark/light (se não existe)
19. Versão em inglês

---

## 5. Cronograma Sugerido

### Sprint 1 (1-2 dias) - Must Have
- [ ] Atualizar [index.mdx](pages/index.mdx) - Bio e contato
- [ ] Atualizar [Projects/index.tsx](components/Projects/index.tsx) - Adicionar todos os projetos
- [ ] Atualizar [Timeline/index.tsx](components/Timeline/index.tsx) - Corrigir datas e adicionar ESHGO

### Sprint 2 (1 dia) - Should Have
- [ ] Atualizar [CourseGallery/index.tsx](components/CourseGallery/index.tsx) - Certificações reais
- [ ] Criar [components/Stack/index.tsx] - Competências técnicas
- [ ] Criar [pages/stack.mdx] - Página de stack

### Sprint 3 (Opcional) - Could Have
- [ ] SEO optimization
- [ ] Criar página "Sobre"
- [ ] Adicionar formação acadêmica

---

## 6. Checklist de Validação

Antes de considerar concluído, validar:

- [ ] Todas as informações do CV estão refletidas no portfólio?
- [ ] Datas e períodos estão corretos?
- [ ] Links de contato funcionam?
- [ ] Projetos têm descrições impactantes?
- [ ] Certificações têm imagens/links válidos?
- [ ] Responsivo em mobile?
- [ ] Tempo de carregamento < 3s?
- [ ] Sem erros no console?
- [ ] Download do CV funciona?

---

## 7. Referências

- Currículo: [cv-jairo-tunisse-2026.pdf](./public/cv-jairo-tunisse-2026.pdf)
- Repositório: /Users/administrador/development/portfolio-next
- CLAUDE.md: /Users/administrador/development/CLAUDE.md

---

## 8. Notas Adicionais

### Oportunidades de Destaque
1. **Experiência em Larga Escala:** +1.000 máquinas gerenciadas na FAB
2. **Empreendedorismo:** Fundador ESHGO com múltiplos produtos SaaS
3. **Versatilidade:** Front-end + Back-end + DevOps + Redes
4. **Experiência Institucional:** 6 anos FAB com projetos críticos
5. **Formação:** Engenharia + ETEC + Certificações Rocketseat

### Diferenciais Competitivos
- Combina experiência de startup (ESHGO) com instituição rígida (FAB)
- Portfólio diversificado: SaaS, Landing Pages, Ferramentas Internas
- Competências raras: Cisco IOS, Zabbix, Grafana + React/Next.js
- Projetos de impacto real mensuráveis

---

**Fim do PRD**
