import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { api } from "../../lib/api";
import { GitPullRequest, Star, ArrowSquareOut } from "@phosphor-icons/react";
import { Project } from "./types";

// Projetos completos conforme SPEC
const allProjects: Project[] = [
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
    title: 'Blumily',
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

const featuredProjects = allProjects.filter(p => p.featured);
const institutionalProjects = allProjects.filter(p => p.category === 'Institutional');

interface RepositoryProps {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Projects() {
  const [repositories, setRepositories] = useState<RepositoryProps[]>([]);

  async function fetchMainRepositories() {
    const response = await api.get("repos", {
      params: {
        per_page: 6,
        sort: "updated",
        direction: "desc",
        q: "language:typescript",
      },
    });
    setRepositories(response.data);
  }

  useEffect(() => {
    fetchMainRepositories();
  }, []);

  return (
    <div className={styles.container}>
      {/* Featured Projects Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className={styles.sectionHeader}>
          <h6 className={styles.headerTitle}>Projetos Realizados</h6>
        </div>
        <div className={styles.divider}></div>

        <motion.div className={styles.featuredGrid}>
          {featuredProjects.map((project) => {
            const CardWrapper = project.link ? motion.a : motion.div;
            const linkProps = project.link
              ? {
                  href: project.link,
                  target: "_blank",
                  rel: "noopener noreferrer"
                }
              : {};

            return (
              <CardWrapper
                key={project.id}
                {...linkProps}
                className={styles.featuredCard}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.featuredImageContainer}>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.featuredImage}
                    />
                  )}
                </div>
                <div className={styles.featuredContent}>
                  <h3 className={styles.featuredTitle}>
                    {project.title}
                    {project.badge && (
                      <span className={`${styles.badge} ${styles[`badge${project.badge}`]}`}>
                        {project.badge}
                      </span>
                    )}
                    {project.link && <ArrowSquareOut size={18} className={styles.externalIcon} />}
                  </h3>
                  <p className={styles.featuredDescription}>{project.description}</p>
                  <div className={styles.techTags}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Institutional Projects Section (FAB) */}
      {institutionalProjects.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={styles.institutionalSection}
        >
          <div className={styles.sectionHeader}>
            <h6 className={styles.headerTitle}>Projetos Institucionais (FAB)</h6>
          </div>
          <div className={styles.divider}></div>

          <motion.div className={styles.featuredGrid}>
            {institutionalProjects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.featuredCard}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.featuredImageContainer}>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.featuredImage}
                    />
                  )}
                </div>
                <div className={styles.featuredContent}>
                  <h3 className={styles.featuredTitle}>
                    {project.title}
                    {project.badge && (
                      <span className={`${styles.badge} ${styles[`badge${project.badge}`]}`}>
                        {project.badge}
                      </span>
                    )}
                  </h3>
                  <p className={styles.featuredDescription}>{project.description}</p>
                  <div className={styles.techTags}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Repositories Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={styles.repositoriesSection}
      >
        <div className={styles.githubHeader}>
          <h6 className={styles.headerTitle}>Repositórios</h6>
          <a
            target="_blank"
            href="https://github.com/Jairotsb"
            className={styles.viewMore}
          >
            Ver mais
          </a>
        </div>
        <div className={styles.divider}></div>

        {repositories.map((repository, index) => (
          <motion.div
            key={repository.id}
            className={styles.card}
            variants={itemVariants}
            whileHover={{ scale: 1.01, borderColor: "#3B82F6" }}
            whileTap={{ scale: 0.99 }}
          >
            <a
              className={styles.cardLink}
              href={`https://github.com/Jairotsb/${repository.name}`}
              target="_blank"
            >
              <h3 className={styles.name}>{repository.name}</h3>
              <p className={styles.description}>{repository.description}</p>
              <div className={styles.infoCard}>
                <div className={styles.githubInfo}>
                  <Star className={styles.iconData} />{" "}
                  {repository.stargazers_count}
                  <GitPullRequest className={styles.iconData} />{" "}
                  {repository.forks_count}
                </div>
                <p className={styles.language}>#{repository.language}</p>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
