'use client';

import { motion } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import styles from './Promotion.module.css';

import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';

export default function PromotionPageClient({ promotions }: { promotions: any[] }) {
  return (
    <>
      <SectionReveal>
        <section className={styles.heroSection}>
          <div className={styles.featureLabel}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="6" r="2.5" fill="#000" />
              <circle cx="12" cy="18" r="2.5" fill="#000" />
              <circle cx="6" cy="12" r="2.5" fill="#000" />
              <circle cx="18" cy="12" r="2.5" fill="#000" />
            </svg>
          </div>
          <h1 className={styles.pageTitle}>
            <ScaleBlur text="Ongoing Promotions" stagger={0.04} />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className={styles.pageSubtitle}
          >
            With a seamless process and attention to detail, we turn ideas into beautiful, livable realities.
          </motion.p>
        </section>
      </SectionReveal>

        <div className={styles.contentContainer}>
            <div className={styles.promotionGrid}>
              {promotions.map((promo, i) => (
                <motion.div
                  key={promo.id}
                  className={styles.promoCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1 }}
                >
                  <div className={styles.imageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={promo.image} alt={promo.title} className={styles.promoImage} />
                  </div>
                  <div className={styles.promoInfo}>
                    <TitleReveal><h3 className={styles.promoTitle}>{promo.title}</h3></TitleReveal>
                    <button className={styles.viewButton} onClick={() => window.open('https://wa.me/601163329447', '_blank')}>Get it now</button>
                  </div>
                </motion.div>
              ))}

              {promotions.length === 0 && (
                <div className={styles.emptyState}>No active promotions at the moment. Check back soon!</div>
              )}
            </div>
        </div>
    </>
  );
}
