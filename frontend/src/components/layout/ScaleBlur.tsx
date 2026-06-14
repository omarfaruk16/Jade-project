'use client';

import { motion } from 'framer-motion';

interface ScaleBlurProps {
  text: string;
  stagger?: number;
  className?: string;
  delay?: number;
}

const charVariants = {
  hidden: { opacity: 0, scale: 0.2, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
};

export default function ScaleBlur({ text = "", stagger = 0.05, className = "", delay = 0 }: ScaleBlurProps) {
  const words = (text || "").split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      style={{ wordBreak: "normal", overflowWrap: "normal", justifyContent: "center" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{
            display: "inline-flex",
            whiteSpace: "nowrap",
          }}
        >
          {word.split("").map((c, ci) => (
            <motion.span
              key={ci}
              style={{ display: "inline-block" }}
              variants={charVariants}
            >
              {c}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <motion.span
              style={{ display: "inline-block", width: "0.3em" }}
              variants={charVariants}
            >
              {"\u00A0"}
            </motion.span>
          )}
        </span>
      ))}
    </motion.span>
  );
}