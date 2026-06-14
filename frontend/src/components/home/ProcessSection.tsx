'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import styles from './ProcessSection.module.css';

import SectionReveal from '@/components/layout/SectionReveal';
import TitleReveal from '@/components/layout/TitleReveal';

export default function ProcessSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <SectionReveal>
<section className={styles.section}>
      <div className="jade-container">
      <div className={styles.container}>
        
        {/* LEFT SIDE: Video */}
        <motion.div 
          className={styles.leftColumn}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.videoWrapper} onClick={() => setIsVideoOpen(true)}>
            <img src="/images/3 concept view/Design, Installation, and Support in Harmony by jade.jpg" alt="Video cover" className={styles.videoCover} />
            <div className={styles.playButton}>
              <div className={styles.playIconWrapper}>
                <Play fill="black" size={20} style={{ marginLeft: '4px' }} />
              </div>
              <span className={styles.playText}>Discover full video</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className={styles.rightColumn}>
          <TitleReveal>
            <h2 className={styles.title}>
              Design, Installation, and Support in Harmony
            </h2>
          </TitleReveal>
          
          <motion.div 
            className={styles.textRow}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.textLabel}>(Resonate)</div>
            <div className={styles.textBody}>
              Every dream home begins with questions: Will this design fit my life? Will it be installed flawlessly? Will it last? At Jade, we remove doubt with clarity, precision, and lasting support — a journey from vision to peace of mind.
            </div>
            <div className={styles.buttonWrapper}>
              <button className={styles.quoteBtn} onClick={() => window.location.href='/contact'}>Get a Quote</button>
            </div>
          </motion.div>

          <div className={styles.cardsRow}>
            {[
              {
                img: '/images/3 concept view/The Art of Understanding brings clarity in every detail. by jade.jpg',
                text: 'The Art of Understanding brings clarity in every detail.'
              },
              {
                img: '/images/3 concept view/The Craft of Perfection delivers flawless lasting results. by jade.jpg',
                text: 'The Craft of Perfection delivers flawless lasting results.'
              },
              {
                img: '/images/3 concept view/The Promise of Forever ensures trust that never fades.. by jade.jpg',
                text: 'The Promise of Forever ensures trust that never fades.'
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx} 
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.cardHeader}>
                  <img src={card.img} alt="Card Thumbnail" className={styles.cardThumb} />
                  <FourDotsIcon />
                </div>
                <p className={styles.cardText}>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
                className={styles.videoElement}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
