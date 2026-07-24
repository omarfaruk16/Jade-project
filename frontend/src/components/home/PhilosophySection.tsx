'use client';

import styles from './PhilosophySection.module.css';
import SectionReveal from '@/components/layout/SectionReveal';

import { homeLogos as logos } from '@/lib/logos';

export default function PhilosophySection() {
  return (
    <SectionReveal>
      <section className={styles.section}>
        <div className="jade-container">
          <div className={styles.content}>
            <div className={styles.textSide}>
              <p>Each project is a reflection of our design philosophy intentional, timeless, and tailored.</p>
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
