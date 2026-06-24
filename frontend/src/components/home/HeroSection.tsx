'use client';

import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import ScaleBlur from '../layout/ScaleBlur';

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/New%20folder/Jade-hero.jpg.jpeg" alt="Luxurious modern house exterior" className={styles.bgImage} />
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
            onClick={() => window.location.href = '/contact'}
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
            <img src="/images/New%20folder/Mr.%20Faaris%20bin%20Abood%20by%20Jade.jpg" alt="Mr. Faaris bin Abood" className={styles.avatar} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/New%20folder/Mrs.%20Jaya%20binti%20Elyas%20by%20Jade.jpg" alt="Mrs. Jaya binti Elyas" className={styles.avatar} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/New%20folder/Mr.%20Yaakop%20bin%20Zulkipli%20by%20Jade.jpg" alt="Mr. Yaakop bin Zulkipli" className={styles.avatar} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/New%20folder/Ameena%20binti%20Husain%20%26%20Abdullah%20bin%20Ameer%20%20by%20Jade.jpg" alt="Ameena binti Husain & Abdullah bin Ameer" className={styles.avatar} />
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
            <img src="/images/Award/ASIA Excellence Choise Awards 2024.png" alt="ASIA Excellence Choice Awards 2024" className={styles.awardIcon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/British Publishing House.png" alt="British Publishing House" className={styles.awardIcon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/Gemini_Generated_Image_qsc678qsc678qsc6-removebg-preview.png" alt="Award Icon" className={styles.awardIcon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/Global Business Leaders Award 2025 .png" alt="Global Business Leaders Award 2025" className={styles.awardIcon} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Award/Trusted Malaysia.png" alt="Trusted Malaysia" className={styles.awardIcon} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}