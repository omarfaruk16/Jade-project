'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import styles from './HarmonySection.module.css';
import TitleReveal from '@/components/layout/TitleReveal';

const FourDots = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const features = [
  {
    img: '/images/Harmony/The Art of Understanding brings clarity in every detail. by jade.jpg',
    label: 'The Art of Understanding brings clarity in every detail.',
  },
  {
    img: '/images/Harmony/The Craft of Perfection delivers flawless lasting results. by jade.jpg',
    label: 'The Craft of Perfection delivers flawless lasting results.',
  },
  {
    img: '/images/Harmony/The Promise of Forever ensures trust that never fades.. by jade.jpg',
    label: 'The Promise of Forever ensures trust that never fades.',
  },
];

export default function HarmonySection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className={styles.harmonySection}>
        <div className="jade-container">
          <div className={styles.desktopLayout}>
            {/* Left — large media card */}
            <motion.div
              className={styles.mediaCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/images/Harmony/Design, Installation, and Support in Harmony by jade.jpg" alt="Jade interior showcase" className={styles.mediaImg} />
              <div className={styles.mediaOverlay}>
                <button className={styles.videoBtn} onClick={() => setIsVideoOpen(true)}>
                  <span className={styles.playIcon}>▶</span>
                  Discover full video
                </button>
              </div>
            </motion.div>

            {/* Right — content */}
            <div className={styles.contentCol}>
              {/* Heading */}
              <motion.h2
                className={styles.desktopTitle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Design, Installation, and Support in <br></br>Harmony
              </motion.h2>

              {/* Meta row: label | paragraph | CTA */}
              <motion.div
                className={styles.metaRow}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.metaLabel}>(Essence)</span>
                <div className={styles.metaTextCtaWrap}>
                  <p className={styles.metaText}>
                    Every dream home begins with questions: Will this design fit my life?
                    Will it be installed flawlessly? Will it last? At Jade, we remove doubt
                    with clarity, precision, and lasting support a journey from vision to
                    peace of mind.
                  </p>
                  <a href="https://cal.com/jade-kitchen-design/not-sure-what-you-need-let-s-figure-it-out-fast" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>Get a Quote</a>
                </div>
              </motion.div>

              {/* Feature cards */}
              <div className={styles.featureCards}>
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    className={styles.featureCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.featureImgRow}>
                      <img src={f.img} alt={f.label} className={styles.featureImg} />
                      <span className={styles.featureDots}><FourDots /></span>
                    </div>
                    <p className={styles.featureLabel}>{f.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className={styles.videoModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <button className={styles.closeBtn} onClick={() => setIsVideoOpen(false)}>
              <X size={24} />
            </button>
            <motion.div
              className={styles.videoContainer}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <video
                src="/images/download.mp4"
                controls
                autoPlay
                preload="none"
                className={styles.videoElement}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
