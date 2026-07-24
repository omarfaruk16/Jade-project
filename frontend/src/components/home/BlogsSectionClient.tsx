'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './BlogsSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

interface Blog {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  createdAt: string;
}

export default function BlogsSectionClient({ blogs }: { blogs: Blog[] }) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const [featured, ...rest] = blogs;

  return (
    <section className={styles.section}>
      <div className="jade-container">
      {/* Header Row */}
      <div className={styles.header}>
        <TitleReveal>
          <h2 className={styles.title}>
            Insights that shape spaces
          </h2>
        </TitleReveal>
        <div className={styles.headerRight}>
          <p className={styles.subtitle}>Explore ideas, trends, and behind-the-scenes stories from our studio.</p>
          <Link href="/blogs" className={styles.viewAllBtn}>View all</Link>
        </div>
      </div>

      {/* Content Grid */}
      <div className={styles.grid}>
        {/* Featured large card */}
        {featured && (
          <motion.div
            className={styles.featuredCard}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/blogs/${featured.slug}`} className={styles.featuredLink}>
              <img src={featured.coverImage} alt={featured.title} className={styles.featuredImg} />
              <div className={styles.featuredOverlay} />
              <div className={styles.datePill}>{formatDate(featured.createdAt)}</div>
              <div className={styles.featuredBottom}>
                <TitleReveal><h3 className={styles.featuredTitle}>{featured.title}</h3></TitleReveal>
                <div className={styles.arrowCircleWhite}>
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Right list */}
        <div className={styles.rightList}>
          {rest.map((blog, idx) => (
            <motion.div
              key={blog.id}
              className={styles.listItem}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blogs/${blog.slug}`} className={styles.listContentLeft}>
                <div className={styles.fourDots}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
                    <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <div className={styles.listText}>
                  <p className={styles.listDate}>{formatDate(blog.createdAt)}</p>
                  <h4 className={styles.listTitle}>{blog.title}</h4>
                </div>
              </Link>
              <div className={styles.listArrow}>
                <ChevronRight size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
