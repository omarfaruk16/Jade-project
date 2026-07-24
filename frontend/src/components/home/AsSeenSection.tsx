'use client';

import styles from './AsSeenSection.module.css';
import SectionReveal from '@/components/layout/SectionReveal';

import { homeLogos as logos } from '@/lib/logos';

export default function AsSeenSection() {
  return (
    <SectionReveal>
      <section style={{ background: '#f7f7f7', paddingBottom: '5rem' }}>
        <div className="jade-container">
          <div className={styles.container}>
            <div className={styles.label}>As seen on:</div>
            <div className={styles.marqueeWrapper}>
            <div className={styles.marquee}>
              {/* Duplicate the array a few times to ensure seamless infinite scroll */}
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
