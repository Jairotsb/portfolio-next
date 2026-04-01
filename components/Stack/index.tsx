import { motion } from "framer-motion";
import { skillsData } from "./data";
import SkillCard from "./SkillCard";
import styles from "./styles.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const categoryVariants = {
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

export default function Stack() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Stack Técnico</h1>
      </motion.div>

      <motion.div
        className={styles.skillsGrid}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {skillsData.map(category => (
          <motion.div
            key={category.id}
            className={styles.skillCategory}
            variants={categoryVariants}
          >
            <h2 className={styles.categoryTitle}>
              <span className={styles.categoryIcon}>{category.icon}</span>
              {category.name}
            </h2>
            <div className={styles.skillsList}>
              {category.skills.map(skill => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
