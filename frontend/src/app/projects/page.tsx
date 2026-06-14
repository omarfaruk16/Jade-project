'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import SectionReveal from '@/components/layout/SectionReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import styles from './ProjectsArchive.module.css';

export default function ProjectsArchive() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Expected projects array but got:", data);
          setProjects([]);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

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

      <div className={styles.gridControls}>
        <span className={styles.count}>({projects.length})</span>
        <div className={styles.filters}>
          <span className={styles.filterItem}>LaunchSimple</span>
          <span className={styles.filterItem}>45 Degrees+</span>
          <span className={styles.filterItem}><Filter size={16} /></span>
        </div>
      </div>

      <SectionReveal>
        <div className={styles.projectsGrid}>
          {loading ? (
            <div style={{ textAlign: 'center', width: '100%', gridColumn: 'span 3', padding: '4rem' }}>Loading architecture...</div>
          ) : (
            projects.map((p, i) => (
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
                    <span className={styles.cardTitle}>{p.title}</span>
                    <span className={styles.cardDate}>{p.date}</span>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </SectionReveal>
    </div>
  );
}
