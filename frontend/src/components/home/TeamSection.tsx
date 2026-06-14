'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API_BASE from '@/lib/api';
import styles from './TeamSection.module.css';

import SectionReveal from '@/components/layout/SectionReveal';
import TitleReveal from '@/components/layout/TitleReveal';

export default function TeamSection() {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/team`)
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(console.error);
  }, []);

  return (
    <SectionReveal>
<section className={styles.section}>
      <div className={`${styles.container} jade-container`}>
        <div className={styles.header}>
          <TitleReveal>
            <h2 className={styles.title}>
              Meet the Team Behind Your Dream Space
            </h2>
          </TitleReveal>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Great design is a collaborative journey. Our team works closely to deliver thoughtful, seamless results that go beyond your expectations.
          </motion.p>
        </div>

        <div className={styles.teamGrid}>
          {Array.isArray(team) && team.length > 0 ? team.map((member, idx) => (
            <motion.div 
              key={member.id} 
              className={styles.teamMember}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.imageWrapper}>
                <img src={member.image} alt={member.name} />
                <div className={styles.overlay}>
                  <span className={styles.name}>{member.name}</span>
                  <div className={styles.cornerIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.8 }}>
                      <circle cx="12" cy="6" r="1.5" fill="white"/>
                      <circle cx="12" cy="18" r="1.5" fill="white"/>
                      <circle cx="6" cy="12" r="1.5" fill="white"/>
                      <circle cx="18" cy="12" r="1.5" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          )) : (
            // Fallback skeleton or empty state
            [...Array(5)].map((_, i) => (
              <div key={i} className={styles.skeletonMember} />
            ))
          )}
        </div>

        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.footerLeft}>
            <h4 className={styles.footerHeadline}>Join us in shaping better spaces</h4>
            <p className={styles.footerSubtext}>Bring your talent, creativity, and passion let&apos;s build something extraordinary together.</p>
          </div>
          <button className={styles.joinBtn} onClick={() => window.location.href='/contact'}>Join us now</button>
        </motion.div>
      </div>
    </section>
</SectionReveal>
  );
}
