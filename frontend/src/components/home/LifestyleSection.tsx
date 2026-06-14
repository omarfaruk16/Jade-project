'use client';

import { motion } from 'framer-motion';
import styles from './LifestyleSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

const articles = [
  {
    tag: 'INTERIOR',
    title: 'The art of minimalism: How to create a calm space',
    img: '/images/home-1.avif',
    authorImg: 'https://i.pravatar.cc/100?img=4',
    authorName: 'Jenny Wilson',
    date: 'May 12, 2023',
    readTime: '5 min read'
  },
  {
    tag: 'ARCHITECTURE',
    title: 'Sustainable materials in modern home construction',
    img: '/images/home-2.avif',
    authorImg: 'https://i.pravatar.cc/100?img=5',
    authorName: 'Guy Hawkins',
    date: 'Apr 28, 2023',
    readTime: '4 min read'
  },
  {
    tag: 'LIFESTYLE',
    title: 'Designing your home office for maximum productivity',
    img: '/images/home-3.avif',
    authorImg: 'https://i.pravatar.cc/100?img=6',
    authorName: 'Bessie Cooper',
    date: 'Mar 15, 2023',
    readTime: '6 min read'
  }
];

export default function LifestyleSection() {
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
        <TitleReveal><h2 className={styles.title}>Craft, our spaces to represent modern lifestyle</h2></TitleReveal>
      </motion.div>

      <div className={styles.grid}>
        {articles.map((article, idx) => (
          <motion.div 
            key={idx} 
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageWrapper}>
              <img src={article.img} alt={article.title} />
              <span className={styles.tag}>{article.tag}</span>
            </div>
            <div className={styles.content}>
              <TitleReveal><h3 className={styles.cardTitle}>{article.title}</h3></TitleReveal>
              <div className={styles.meta}>
                <div className={styles.author}>
                  <img src={article.authorImg} alt={article.authorName} />
                  <span>{article.authorName}</span>
                </div>
                <div className={styles.dateInfo}>
                  <span>{article.date}</span>
                  <span className={styles.dot}>•</span>
                  <span>{article.readTime}</span>
                </div>
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
