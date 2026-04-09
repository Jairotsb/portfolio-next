import { DownloadSimple } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useDictionary } from "../context/DictionaryContext";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HomeContent() {
  const dict = useDictionary();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div variants={fadeIn} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="bio">
          {dict.home.bio}
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <strong>{dict.home.roles}</strong>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ textAlign: "center", marginTop: "1.5rem" }}
      >
        <motion.a
          href="/cv-jairo-tunisse.pdf"
          download
          className="mt-6 inline-flex items-center gap-2 bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors shadow-md"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <DownloadSimple size={20} style={{ flexShrink: 0, verticalAlign: "middle" }} />
          <span style={{ lineHeight: 1 }}>{dict.home.downloadCV}</span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
