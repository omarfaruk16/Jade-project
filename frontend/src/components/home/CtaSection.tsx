'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './CtaSection.module.css';

import SectionReveal from '@/components/layout/SectionReveal';

export default function CtaSection() {
  return (
    <SectionReveal>
<section className={styles.section}>
      <div className={styles.bgWrapper}>
        <img src="/images/bg-2.avif" alt="Modern interior design" className={styles.bgImage} />
        <div className={styles.overlay} />
      </div>

      <div className="jade-container">
      <div className={styles.content}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          We’re set to build your dream just<br />say the word.
        </motion.h2>

        <motion.p 
          className={styles.paragraph}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          The impact of our craft is carried by those we’ve partnered<br />
          with. Genuine collaborations, lasting outcomes and spaces<br />
          that truly connect.
        </motion.p>

        <motion.div 
          className={styles.floatingCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.userInfo}>
              <img src="https://i.pravatar.cc/100?img=12" alt="Warsty Roslan" className={styles.avatar} />
              <div className={styles.userDetails}>
                <h4>Warsty Roslan</h4>
                <p>Sale Expert</p>
              </div>
            </div>
            <FourDotsIcon />
          </div>
          
          <div className={styles.cardBottom}>
            <p className={styles.cardText}>
              With purpose, passion, and<br />precision in every detail.
            </p>
            <Link href="/contact" className={styles.quoteBtn}>
              Get a Quote
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
</SectionReveal>
  );
}

const FourDotsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
    <circle cx="12" cy="6" r="1.5" fill="black"/>
    <circle cx="12" cy="18" r="1.5" fill="black"/>
    <circle cx="6" cy="12" r="1.5" fill="black"/>
    <circle cx="18" cy="12" r="1.5" fill="black"/>
  </svg>
);
