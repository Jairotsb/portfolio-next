import { motion } from "framer-motion";
import { useDictionary } from "../context/DictionaryContext";
import Timeline from "./Timeline";
import Education from "./Education";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function CareerContent() {
  const dict = useDictionary();

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.h2
        className="text-center"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center" }}
      >
        {dict.career.pageTitle}
      </motion.h2>

      <hr />

      <motion.div variants={fadeIn} transition={{ duration: 0.5, delay: 0.1 }}>
        <Timeline />
      </motion.div>

      <motion.div variants={fadeIn} transition={{ duration: 0.5, delay: 0.2 }}>
        <Education />
      </motion.div>
    </motion.div>
  );
}
