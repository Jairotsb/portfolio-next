import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { Briefcase, MapPin } from "@phosphor-icons/react";

// JSON de experiências - edite aqui para adicionar suas experiências
const experiences = [
  {
    id: 1,
    role: "Desenvolvedor Full Stack",
    company: "Escola de Especialistas de Aeronáutica (EEAR)",
    location: "Guaratinguetá, SP",
    period: "2022 - Presente",
    description: "Desenvolvimento de aplicações web para otimização de processos internos, garantindo alta disponibilidade de sistemas críticos. Atuação com React, Node.js, Next.js e Docker.",
    current: true
  },
  {
    id: 2,
    role: "Desenvolvedor Web",
    company: "Força Aérea Brasileira",
    location: "Guaratinguetá, SP",
    period: "2020 - 2022",
    description: "Desenvolvimento e manutenção de sistemas web internos, integração de APIs e suporte técnico em TI corporativa.",
    current: false
  },
  {
    id: 3,
    role: "Estagiário de TI",
    company: "Empresa de Tecnologia",
    location: "São Paulo, SP",
    period: "2019 - 2020",
    description: "Suporte técnico, manutenção de sistemas e desenvolvimento de pequenas soluções web.",
    current: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Timeline() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h6 className={styles.headerTitle}>Experiência Profissional</h6>
      </div>
      <div className={styles.divider}></div>

      <motion.div
        className={styles.timeline}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={styles.timelineItem}
            variants={itemVariants}
          >
            <div className={styles.timelineLine}>
              <div className={`${styles.timelineDot} ${exp.current ? styles.currentDot : ''}`}>
                <Briefcase size={14} weight="fill" />
              </div>
              {index < experiences.length - 1 && <div className={styles.timelineConnector}></div>}
            </div>

            <motion.div
              className={styles.timelineContent}
              whileHover={{ scale: 1.01 }}
            >
              <div className={styles.timelineHeader}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={`${styles.period} ${exp.current ? styles.currentPeriod : ''}`}>
                  {exp.period}
                </span>
              </div>

              <div className={styles.companyInfo}>
                <span className={styles.company}>{exp.company}</span>
                <span className={styles.location}>
                  <MapPin size={14} />
                  {exp.location}
                </span>
              </div>

              <p className={styles.description}>{exp.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
