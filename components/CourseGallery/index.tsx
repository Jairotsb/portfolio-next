import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import { X } from "@phosphor-icons/react";
import { courses } from "./data";
import { Course } from "./types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

export default function CourseGallery() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Design'];
  const institutions = ['All', 'Rocketseat', 'Uniamérica'];

  const filteredCourses = courses
    .filter(c => selectedCategory === 'All' || c.category === selectedCategory)
    .filter(c => selectedInstitution === 'All' || c.institution === selectedInstitution);

  return (
    <>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Instituição:</label>
          <div className={styles.filterButtons}>
            {institutions.map(inst => (
              <button
                key={inst}
                className={`${styles.filterButton} ${selectedInstitution === inst ? styles.filterButtonActive : ''}`}
                onClick={() => setSelectedInstitution(inst)}
              >
                {inst}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Categoria:</label>
          <div className={styles.filterButtons}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterButton} ${selectedCategory === cat ? styles.filterButtonActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className={styles.gallery}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            className={styles.courseFrame}
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 12px 24px rgba(30, 64, 175, 0.2)"
            }}
            onClick={() => setSelectedCourse(course)}
          >
            <div className={styles.frameInner}>
              <img
                src={course.image}
                alt={course.name}
                className={styles.courseImage}
              />
            </div>
            <div className={styles.courseName}>{course.name}</div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className={styles.modalOverlay}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.button
              className={styles.closeButton}
              onClick={() => setSelectedCourse(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} weight="bold" />
            </motion.button>
            
            <motion.div
              className={styles.modalContent}
              variants={imageVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCourse.image}
                alt={selectedCourse.name}
                className={styles.modalImage}
              />
              <p className={styles.modalTitle}>{selectedCourse.name}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
