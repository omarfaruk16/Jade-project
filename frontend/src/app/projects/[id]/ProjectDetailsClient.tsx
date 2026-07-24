'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './ProjectDetails.module.css';
import SectionReveal from '@/components/layout/SectionReveal';
import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';

interface ProcessStep {
  title: string;
  desc: string;
}

export default function ProjectDetailsClient({
  project,
  gallery,
  processSteps,
  relatedProjects,
}: {
  project: any;
  gallery: string[];
  processSteps: ProcessStep[];
  relatedProjects: any[];
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const DotIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="6" r="1.5" fill="black" />
      <circle cx="6" cy="2" r="1.5" fill="black" />
      <circle cx="6" cy="10" r="1.5" fill="black" />
      <circle cx="10" cy="6" r="1.5" fill="black" />
    </svg>
  );

  return (
    <>
      {/* ── Hero / Cover ── */}
      <SectionReveal>
        <div className={styles.heroWrapper}>
          <section className={styles.hero}>
            <motion.img
              src={project.coverImage}
              alt={project.title}
              className={styles.coverImage}
              style={{ y }}
            />
            <div className={styles.heroOverlay} />
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0.001, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 30, mass: 1 }}
            >
              <h1 className={styles.title}><ScaleBlur text={project.title} stagger={0.04} /></h1>
              {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
            </motion.div>
          </section>
        </div>
      </SectionReveal>

      <div className={styles.contentContainer}>

        {/* ── Product Information Section ── */}
          <section className={styles.overviewSection}>
            {/* Left label */}
            <div className={styles.leftColumn}>
              <div className={styles.aboutLabel}>
                <DotIcon />
                Project info
              </div>
            </div>

            {/* Middle — meta grid + description */}
            <div className={styles.middleColumn}>
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <label>Date</label>
                  <span>{project.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <label>Category</label>
                  <span>{project.category}</span>
                </div>
                <div className={styles.metaItem}>
                  <label>Space Plan</label>
                  <span>{project.spacePlan || project.client}</span>
                </div>
                <div className={styles.metaItem}>
                  <label>Timeline</label>
                  <span>{project.timeline}</span>
                </div>
              </div>
              <p className={styles.overviewDesc}>{project.overviewDesc}</p>
            </div>

            {/* Right — overview image */}
            <motion.div
              className={styles.rightColumn}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.overviewImage} alt="Overview" className={styles.overviewImage} />
            </motion.div>
          </section>

        {/* ── Gallery ── */}
        {gallery.length > 0 && (
            <section className={styles.gallerySection}>
              <div className={styles.galleryGrid}>
                {gallery.map((url, i) => (
                  <motion.div
                    key={i}
                    className={styles.galleryItem}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: (i % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Gallery ${i + 1}`} className={styles.galleryImg} />
                  </motion.div>
                ))}
              </div>
            </section>
        )}

        {/* ── Process Section ── */}
        {(processSteps.length > 0 || project.processImage) && (
            <section className={styles.processSection}>
              {/* Left label */}
              <div className={styles.leftColumn}>
                <div className={styles.aboutLabel}>
                  <DotIcon />
                  The Process
                </div>
              </div>

              {/* Middle — dynamic steps */}
              <div className={styles.middleColumn}>
                <div className={styles.processList}>
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      className={styles.processItem}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — process image */}
              {project.processImage && (
                <motion.div
                  className={styles.rightColumn}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.processImage} alt="Process" className={styles.processImage} />
                </motion.div>
              )}
            </section>
        )}

        {/* ── Related Projects ── */}
        {relatedProjects.length > 0 && (
          <SectionReveal>
            <section style={{ paddingBottom: '6rem' }}>
              <div className={styles.relatedHeader}>
                <TitleReveal><h2>Related Projects</h2></TitleReveal>
              </div>
              <div className={styles.relatedGrid}>
                {relatedProjects.map((rel, i) => (
                  <Link href={`/projects/${rel.id}`} key={i} className={styles.relatedCard}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rel.coverImage} alt={rel.title} />
                    <div className={styles.relatedFooter}>
                      <span>{rel.title}</span>
                      <span style={{ color: '#666' }}>{rel.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}


      </div>
    </>
  );
}
