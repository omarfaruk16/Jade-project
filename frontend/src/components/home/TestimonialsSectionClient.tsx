'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Volume2, VolumeX } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
}

export default function TestimonialsSectionClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
        setIsMuted(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
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
              Don&apos;t just listen to us see what our partners have to say.
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
                ref={videoRef}
                src="/images/client_video.mp4"
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                suppressHydrationWarning
                className={styles.videoBg}
              />
              <div className={styles.videoOverlay} />

              <button
                className={styles.muteButton}
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
              </button>

              <div className={styles.videoFooter}>
                <img src="/images/jade-client.webp" alt="Mr Faiz Fikri" className={styles.avatar} />
                <div className={styles.userInfo}>
                  <h4 style={{ color: 'white' }}>Mr Faiz Fikri</h4>
                  <p style={{ color: 'rgba(255,255,255,0.75)' }}>Flora Rossa Putrajaya</p>
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
  );
}
