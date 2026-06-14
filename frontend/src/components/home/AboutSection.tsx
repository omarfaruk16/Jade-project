'use client';

import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';


const FourDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="4" r="2.5" fill="currentColor" />
    <circle cx="12" cy="20" r="2.5" fill="currentColor" />
    <circle cx="4" cy="12" r="2.5" fill="currentColor" />
    <circle cx="20" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

export default function AboutSection() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className="jade-container">
        <div className={styles.header}>
          <TitleReveal>
            <h2 className={styles.title}>
              Jade blends calm and character -
              creating beautifully crafted interiors.
            </h2>
          </TitleReveal>
          <motion.div
            className={styles.headerRight}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.subtitle}>
              At Jade, we craft interiors that blend calm elegance with bold character using premium materials and timeless design to create spaces that feel as good as they look.
            </p>
            <button className={styles.getToKnowBtn}>Get to Know Us</button>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {/* DOM order set for proper responsive stacking */}

          {/* 1. Mission Card */}
          <motion.div
            className={`${styles.card} ${styles.missionCard}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className={styles.missionText}>
              Our mission is to create exceptional, personalized spaces that truly reflect the vision and aspirations of our clients. Every project is a testament to our dedication to craftsmanship and design excellence.
            </p>
            <div className={styles.founder}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/jade_ceo.avif" alt="Dr. Shiful Islam" className={styles.founderImg} />
              <div className={styles.founderInfo}>
                <h4>Dr. Shiful Islam</h4>
                <p>Founder & CEO</p>
              </div>
            </div>
          </motion.div>

          {/* 2. Image 1 (Dark Bowl) */}
          <motion.div className={`${styles.card} ${styles.imageCard} ${styles.cImg1}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/f1.png" alt="Cabinet design" />
          </motion.div>

          {/* 3. Text 1 (01 Royal Reverie) */}
          <motion.div className={`${styles.card} ${styles.textCard} ${styles.cText1}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.cardNumber}><span>01</span> <FourDotsIcon /></div>
            <TitleReveal><h3 className={styles.cardTitle}>Royal Reverie in Every Cabinet</h3></TitleReveal>
            <p className={styles.cardDesc}>Step into a home that feels like royalty. Every piece is crafted with regal elegance, blending timeless craftsmanship with luxurious beauty.</p>
          </motion.div>

          {/* 4. Text 2 (02 Whispered Elegance) */}
          <motion.div className={`${styles.card} ${styles.textCard} ${styles.cText2}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.cardNumber}><span>02</span> <FourDotsIcon /></div>
            <TitleReveal><h3 className={styles.cardTitle}>Whispered Elegance in Timeless Wood</h3></TitleReveal>
            <p className={styles.cardDesc}>Each grain of wood tells a story of nature and heritage. Designed with intention, our work brings quiet beauty to every corner of your space.</p>
          </motion.div>

          {/* 5. Image 3 (Staircase) */}
          <motion.div className={`${styles.card} ${styles.imageCard} ${styles.cImg3}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/f3.png" alt="Concrete interior" />
          </motion.div>

          {/* 6. Text 3 (03 Dreamscape) */}
          <motion.div className={`${styles.card} ${styles.textCard} ${styles.cText3}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.cardNumber}><span>03</span> <FourDotsIcon /></div>
            <TitleReveal><h3 className={styles.cardTitle}>Dreamscape of Sculpted Spaces</h3></TitleReveal>
            <p className={styles.cardDesc}>Our designs transform spaces into sculptural experiences where light, texture, and form unite, creating a home that feels surreal and uniquely yours.</p>
          </motion.div>

          {/* 7. Image 2 (Orange Sink) */}
          <motion.div className={`${styles.card} ${styles.imageCard} ${styles.cImg2}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/f2.png" alt="Orange Sink design" />
          </motion.div>
        </div>

        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.statItem}>
            <TitleReveal><h3>15+</h3></TitleReveal>
            <p>Years of market expertise.</p>
          </div>
          <div className={styles.statItem}>
            <TitleReveal><h3>2-7</h3></TitleReveal>
            <p>Delivery Fast, reliable service.</p>
          </div>
          <div className={styles.statItem}>
            <TitleReveal><h3>1.6k+</h3></TitleReveal>
            <p>Clients Exceptional service.</p>
          </div>
          <div className={styles.statItem}>
            <TitleReveal><h3>8k+</h3></TitleReveal>
            <p>Projects Completed — Quality work.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
