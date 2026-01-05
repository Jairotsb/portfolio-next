import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { api } from "../../lib/api";
import { GitPullRequest, Star, ArrowSquareOut } from "@phosphor-icons/react";

// JSON de projetos realizados - edite aqui para adicionar seus projetos
const featuredProjects = [
  {
    id: 1,
    title: "Sistema de Gestão Militar",
    description: "Sistema completo de gestão desenvolvido para a Escola de Especialistas de Aeronáutica, otimizando processos internos e garantindo alta disponibilidade de sistemas críticos.",
    image: "/images/ex-1.png",
    link: "https://github.com/Jairotsb",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"]
  },
  {
    id: 2,
    title: "Portal de Serviços Web",
    description: "Aplicação web moderna desenvolvida com Next.js para gerenciamento de serviços e integração com APIs externas, focado em performance e experiência do usuário.",
    image: "/images/ex-2.png",
    link: "https://github.com/Jairotsb",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "REST API"]
  }
];

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
          {featuredProjects.map((project) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.featuredCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.featuredImageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.featuredImage}
                />
              </div>
              <div className={styles.featuredContent}>
                <h3 className={styles.featuredTitle}>
                  {project.title}
                  <ArrowSquareOut size={18} className={styles.externalIcon} />
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
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

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
