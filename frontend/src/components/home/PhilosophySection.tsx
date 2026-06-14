'use client';

import styles from './PhilosophySection.module.css';
import SectionReveal from '@/components/layout/SectionReveal';

const logos = [
  '/images/logo/fi.avif',
  '/images/logo/bmw.webp',
  '/images/logo/DAIKIN.webp',
  '/images/logo/launchsimplae.png',
  '/images/logo/shanta.webp',
];

export default function PhilosophySection() {
  return (
    <SectionReveal>
      <section className={styles.section}>
        <div className="jade-container">
          <div className={styles.content}>
            <div className={styles.textSide}>
              <p>Each project is a reflection of our design philosophym intentional, timeless, and tailored.</p>
            </div>
            <div className={styles.marqueeWrapper}>
              <div className={styles.marquee}>
                {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
                  <div key={idx} className={styles.logoItem}>
                    <img src={logo} alt="Partner Logo" className={styles.logoImage} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
