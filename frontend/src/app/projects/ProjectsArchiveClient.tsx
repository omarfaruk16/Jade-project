'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import styles from './ProjectsArchive.module.css';

interface Project {
  id: string;
  title: string;
  coverImage: string;
  date: string;
}

export default function ProjectsArchiveClient({ projects }: { projects: Project[] }) {
  return (
    <>
      <SectionReveal>
        <section className={styles.headerSection}>
          <div className={styles.icon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="6" r="2.5" fill="#000" />
              <circle cx="12" cy="18" r="2.5" fill="#000" />
              <circle cx="6" cy="12" r="2.5" fill="#000" />
              <circle cx="18" cy="12" r="2.5" fill="#000" />
            </svg>
          </div>
          <h1 className={styles.title}><ScaleBlur text="Selected Projects" stagger={0.04} /></h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            With a seamless process and attention to detail, we turn ideas into beautiful, livable realities.
          </motion.p>
        </section>
      </SectionReveal>

        <div className={styles.projectsGrid}>
          {projects.map((p, i) => (
            <Link href={`/projects/${p.id}`} key={p.id} className={styles.projectCard}>
              <motion.div
                className={styles.projectCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.coverImage} alt={p.title} />
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.titleWrapper}>
                    <span className={styles.cardTitle}>{p.title}</span>
                    <span className={styles.cardTitle}>{p.title}</span>
                  </div>
                  <span className={styles.cardDate}>{p.date}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
    </>
  );
}
