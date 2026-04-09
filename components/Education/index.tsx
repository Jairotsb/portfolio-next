import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { GraduationCap, MapPin } from "@phosphor-icons/react";
import { useDictionary } from "../../context/DictionaryContext";

interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: 'current' | 'completed';
  location: string;
}

const education: Education[] = [
  {
    id: 'uniamerica',
    degree: 'Bacharelado em Engenharia da Computação',
    institution: 'Universidade das Américas Descomplica – Uniamérica',
    period: '2024 - 2027 (previsão)',
    status: 'current',
    location: 'EAD'
  },
  {
    id: 'etec',
    degree: 'Técnico em Desenvolvimento de Sistemas',
    institution: 'ETEC – Escola Técnica Estadual (Centro Paula Souza)',
    period: '2018 - 2019',
    status: 'completed',
    location: 'Cruzeiro, SP'
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

export default function Education() {
  const dict = useDictionary();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h6 className={styles.headerTitle}>{dict.career.education}</h6>
      </div>
      <div className={styles.divider}></div>

      <motion.div
        className={styles.educationList}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {education.map((edu) => (
          <motion.div
            key={edu.id}
            className={styles.educationItem}
            variants={itemVariants}
          >
            <div className={styles.iconWrapper}>
              <div className={`${styles.icon} ${edu.status === 'current' ? styles.currentIcon : ''}`}>
                <GraduationCap size={18} weight="fill" />
              </div>
            </div>

            <motion.div
              className={styles.educationContent}
              whileHover={{ scale: 1.01 }}
            >
              <div className={styles.educationHeader}>
                <h3 className={styles.degree}>{edu.degree}</h3>
                <span className={`${styles.status} ${edu.status === 'current' ? styles.currentStatus : ''}`}>
                  {edu.status === 'current' ? dict.common.current : dict.common.completed}
                </span>
              </div>

              <div className={styles.institutionInfo}>
                <span className={styles.institution}>{edu.institution}</span>
                <span className={styles.location}>
                  <MapPin size={14} />
                  {edu.location}
                </span>
              </div>

              <p className={styles.period}>{edu.period}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
