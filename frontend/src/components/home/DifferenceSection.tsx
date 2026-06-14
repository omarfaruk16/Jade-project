'use client';

import { motion } from 'framer-motion';
import styles from './DifferenceSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

export default function DifferenceSection() {
  return (
    <SectionReveal>
<section className={styles.section}>
      <div className={styles.overlay}></div>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <TitleReveal><h2 className={styles.title}>We make the difference in your space.</h2></TitleReveal>
      </motion.div>
    </section>
</SectionReveal>
  );
}
