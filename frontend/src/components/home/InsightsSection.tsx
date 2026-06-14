'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './InsightsSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

const insights = [
  { id: 1, date: '12-05-23', title: 'Top interior design trends 2023' },
  { id: 2, date: '28-04-23', title: 'How to maximize small spaces' },
  { id: 3, date: '15-03-23', title: 'The ultimate guide to home lighting' },
];

export default function InsightsSection() {
  return (
    <SectionReveal>
<section className={styles.section}>
      <div className="jade-container">
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Insights & Resources
        </motion.h2>
        <motion.div 
          className={styles.subtitleWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.subtitle}>Explore our recent news and insights</p>
          <button className={styles.viewAllBtn}>View All</button>
        </motion.div>
      </div>

      <div className={styles.content}>
        <motion.div 
          className={styles.leftImage}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/images/f3.png" alt="Staircase interior" />
          <div className={styles.imageOverlay}>
            <p>10 tips for choosing the perfect color palette</p>
            <button className={styles.iconBtn}>
              <ArrowUpRight size={20} />
            </button>
          </div>
        </motion.div>

        <div className={styles.rightList}>
          {insights.map((item, idx) => (
            <motion.div 
              key={item.id} 
              className={styles.listItem}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.listContent}>
                <span className={styles.date}>{item.date}</span>
                <TitleReveal><h3 className={styles.itemTitle}>{item.title}</h3></TitleReveal>
              </div>
              <button className={styles.arrowBtn}>
                <ArrowUpRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
</SectionReveal>
  );
}
