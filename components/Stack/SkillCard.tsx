import { motion } from "framer-motion";
import { Skill } from "./types";
import styles from "./styles.module.css";

interface SkillCardProps {
  skill: Skill;
}

const levelColors = {
  Beginner: '#F59E0B',
  Intermediate: '#3B82F6',
  Advanced: '#8B5CF6',
  Expert: '#10B981'
};

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <motion.div
      className={styles.skillCard}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={styles.skillName}>{skill.name}</span>
      <div className={styles.skillMeta}>
        {skill.level && (
          <span
            className={styles.skillLevel}
            style={{ backgroundColor: levelColors[skill.level] }}
          >
            {skill.level}
          </span>
        )}
        {skill.yearsOfExperience && (
          <span className={styles.skillYears}>
            {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'ano' : 'anos'}
          </span>
        )}
      </div>
    </motion.div>
  );
}
