'use client';

import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import ScaleBlur from '../layout/ScaleBlur';

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <div className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-avatars/hero-bg.webp" alt="Luxurious modern house exterior" className={styles.bgImage} />
        </div>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <motion.p
              className={styles.hashtag}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              # Bringing Spaces to Life
            </motion.p>

            <div style={{ overflow: 'hidden' }}>
              <h1 className={styles.title}>
                <ScaleBlur text="Luxury in Every" stagger={0.03} delay={0} />
                <br />
                <ScaleBlur text="Detail of Space." stagger={0.03} delay={0.5} />
              </h1>
            </div>
          </div>

          <motion.button
            className={styles.ctaButton}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            onClick={() => window.open('https://wa.me/601163329447', '_blank')}
          >
            Let&apos;s Talk Concepts
          </motion.button>
        </div>

        <motion.div
          className={styles.bottomLeftWidget}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        >
          <div className={styles.avatars}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-avatars/faaris.webp" alt="Mr. Faaris bin Abood" className={styles.avatar} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-avatars/jaya.webp" alt="Mrs. Jaya binti Elyas" className={styles.avatar} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-avatars/yaakop.webp" alt="Mr. Yaakop bin Zulkipli" className={styles.avatar} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-avatars/ameena-abdullah.webp" alt="Ameena binti Husain & Abdullah bin Ameer" className={styles.avatar} />
          </div>
          <div className={styles.trustText}>
            <strong>Trusted by over</strong>
            1.6K+ Clients
          </div>
        </motion.div>

        <motion.div
          className={styles.bottomRightWidget}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        >
          <span className={styles.awardsLabel}>Awards:</span>
          <div className={styles.awardsList}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/asia-excellence-awards-2024.webp" alt="ASIA Excellence Choice Awards 2024" className={styles.awardIcon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/british-publishing-house.webp" alt="British Publishing House" className={styles.awardIcon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/Gemini_Generated_Image_qsc678qsc678qsc6-removebg-preview.png" alt="Award Icon" className={styles.awardIcon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/global-business-leaders-award-2025.webp" alt="Global Business Leaders Award 2025" className={styles.awardIcon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/trusted-malaysia.webp" alt="Trusted Malaysia" className={styles.awardIcon} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}