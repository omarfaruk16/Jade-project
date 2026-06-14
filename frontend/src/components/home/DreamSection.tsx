'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './DreamSection.module.css';

import SectionReveal from '@/components/layout/SectionReveal';

const FourDots = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export default function DreamSection() {
  return (
    <SectionReveal>
      <section className={styles.section}>
        <div className={styles.backgroundWrapper}>
          <img src="/images/bg-2.avif" alt="Interior space" className={styles.bgImage} />
          <div className={styles.bgOverlay} />
        </div>

        <div className={`jade-container ${styles.contentContainer}`}>
          {/* Top content area */}
          <div className={styles.topArea}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              We’re set to build your dream just say the word.
            </motion.h2>

            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              The impact of our craft is carried by those we’ve partnered with. Genuine collaborations, lasting outcomes and spaces that truly connect.
            </motion.p>
          </div>

          {/* Floating Card at Bottom Right */}
          <motion.div
            className={styles.floatingCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top row of card */}
            <div className={styles.cardHeader}>
              <div className={styles.profileInfo}>
                <img src="/images/jade_ceo.jpeg" alt="Warsty Roslan" className={styles.avatar} />
                <div className={styles.profileText}>
                  <h4 className={styles.profileName}>Warsty Roslan</h4>
                  <p className={styles.profileRole}>Sale Expert</p>
                </div>
              </div>
              <div className={styles.cardIcon}>
                <FourDots />
              </div>
            </div>

            {/* Bottom row of card */}
            <div className={styles.cardFooter}>
              <p className={styles.cardDesc}>
                With purpose, passion, and precision in every detail.
              </p>
              <Link href="/contact" className={styles.quoteBtn}>
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </SectionReveal>
  );
}
