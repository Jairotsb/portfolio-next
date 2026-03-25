import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { Briefcase, MapPin, CheckCircle } from "@phosphor-icons/react";
import { TimelineExperience } from "./types";

// Experiências profissionais completas conforme SPEC
const experiencesData: TimelineExperience[] = [
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
    period: 'Março 2020 - Presente',
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
const experiences = experiencesData
  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

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

              {exp.achievements.length > 0 && (
                <ul className={styles.achievementsList}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className={styles.achievementItem}>
                      <CheckCircle size={16} weight="fill" className={styles.checkIcon} />
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
