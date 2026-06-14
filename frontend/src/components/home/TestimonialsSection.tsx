'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import API_BASE from '@/lib/api';
import styles from './TestimonialsSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

const fallbackTestimonials = [
  { id: '1', name: 'Amelia Hart', role: 'Vale Studio', rating: 5, review: 'Their work brought our entire brand to life—subtle, thoughtful, and timeless. Every element felt carefully crafted, both visually and emotionally.', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: '2', name: 'Daniel Rees', role: 'Rees & Co', rating: 5, review: 'The team captured our vision better than we imagined. From mood boards to final space, everything felt clear, smooth, and perfectly on-brand.', avatar: 'https://i.pravatar.cc/100?img=8' },
  { id: '3', name: 'Sophie Lang', role: 'Atelier Nine', rating: 5, review: 'We felt heard and understood at every step. Their design choices not only impressed—but told our story in ways we never could with words.', avatar: 'https://i.pravatar.cc/100?img=9' },
];

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    fetch(`${API_BASE}/testimonials`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const merged = [...data];
          let i = 0;
          while (merged.length < 3 && i < fallbackTestimonials.length) {
            // Avoid duplicate IDs if backend happens to return a matching ID
            if (!merged.find(t => t.id === fallbackTestimonials[i].id)) {
              merged.push(fallbackTestimonials[i]);
            }
            i++;
          }
          setTestimonials(merged.slice(0, 3));
        } else {
          setTestimonials(fallbackTestimonials.slice(0, 3));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <SectionReveal>
<section className={styles.section}>
      <div className="jade-container">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <TitleReveal><h2 className={styles.title}>
          Don&apos;t just listen to us—see what our partners have to say.
        </h2></TitleReveal>
      </motion.div>

      {/* 4-column grid: 1 row, video is the 3rd item */}
      <div className={styles.grid}>

        {/* Text review cards 1 and 2 */}
        {testimonials.slice(0, 2).map((item, idx) => (
          <motion.div
            key={item.id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.stars}>
              {[...Array(item.rating || 5)].map((_, i) => (
                <Star key={i} size={16} fill="#F05C46" color="#F05C46" />
              ))}
            </div>
            <p className={styles.reviewText}>{item.review}</p>
            <div className={styles.cardFooter}>
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder} />
              )}
              <div className={styles.userInfo}>
                <h4>{item.name}</h4>
                <p>{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Tall video card — 3rd column */}
        <motion.div
          className={`${styles.card} ${styles.videoCard}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            src="/images/client-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            suppressHydrationWarning
            className={styles.videoBg}
          />
          <div className={styles.videoOverlay} />
          <div className={styles.videoFooter}>
            <img src="https://i.pravatar.cc/100?img=11" alt="Julian Meyer" className={styles.avatar} />
            <div className={styles.userInfo}>
              <h4 style={{ color: 'white' }}>Julian Meyer</h4>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>Partner</p>
            </div>
          </div>
        </motion.div>

        {/* Text review card 3 */}
        {testimonials.slice(2, 3).map((item) => (
          <motion.div
            key={item.id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.stars}>
              {[...Array(item.rating || 5)].map((_, i) => (
                <Star key={i} size={16} fill="#F05C46" color="#F05C46" />
              ))}
            </div>
            <p className={styles.reviewText}>{item.review}</p>
            <div className={styles.cardFooter}>
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder} />
              )}
              <div className={styles.userInfo}>
                <h4>{item.name}</h4>
                <p>{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}

      </div>
      </div>
    </section>
</SectionReveal>
  );
}
