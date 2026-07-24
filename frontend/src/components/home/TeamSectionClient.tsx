'use client';

import { motion } from 'framer-motion';
import styles from './TeamSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

interface TeamMember {
  id: string;
  name: string;
  image: string;
  designation?: string;
}

export default function TeamSectionClient({ team }: { team: TeamMember[] }) {
  return (
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
                  <div className={styles.infoWrapper}>
                    <span className={styles.name}>{member.name}</span>
                    {member.designation && (
                      <span className={styles.designation}>{member.designation}</span>
                    )}
                  </div>
                  <div className={styles.cornerIcon}>
                    <div className={styles.iconDotGrid}>
                      <span className={styles.dot}></span>
                      <span className={styles.dot}></span>
                      <span className={styles.dot}></span>
                      <span className={styles.dot}></span>
                    </div>
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
  );
}
