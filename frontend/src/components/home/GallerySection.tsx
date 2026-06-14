'use client';

import { motion } from 'framer-motion';
import styles from './GallerySection.module.css';

import SectionReveal from '@/components/layout/SectionReveal';

const galleryImages = [
  '/images/slider-1.avif',
  '/images/slider-2.avif',
  '/images/slider-4.avif'
];

export default function GallerySection() {
  return (
    <SectionReveal>
<section className={styles.section}>
      <div className="jade-container">
      <div className={styles.grid}>
        {galleryImages.map((src, idx) => (
          <motion.div 
            key={idx} 
            className={styles.imageWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={src} alt={`Gallery ${idx + 1}`} />
          </motion.div>
        ))}
      </div>
      </div>
    </section>
</SectionReveal>
  );
}
