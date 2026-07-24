'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { ChevronRight } from 'lucide-react';
import styles from './BlogDetailClient.module.css';

const MDPreview = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default.Markdown), { ssr: false });

interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  createdAt: string;
}

export default function BlogDetailClient({ blog, relatedBlogs }: { blog: Blog; relatedBlogs: Blog[] }) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <main className={styles.main}>
      {/* Hero Banner */}
      <div className={styles.heroWrapper}>
      <div className={styles.hero}>
        <img
          src={blog.coverImage}
          alt={blog.title}
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={styles.heroDate}
          >
            {formatDate(blog.createdAt)}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className={styles.heroTitle}
          >
            {blog.title}
          </motion.h1>
        </div>
      </div>
      </div>

      {/* Content */}
      <div className={`jade-container ${styles.contentWrapper}`}>
        <div className={styles.contentGrid}>
          {/* Back Button */}
          <div>
            <Link href="/blogs" className={styles.backLink}>
              <div className={styles.backArrow}>
                <svg className={styles.backArrowSvg} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </div>
              Back to Blogs
            </Link>
          </div>

          {/* Blog Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            data-color-mode="light"
            className={styles.blogBody}
          >
            <MDPreview source={blog.description} style={{ background: 'transparent', fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }} />
          </motion.div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className={styles.relatedSection}>
          <div className="jade-container">
            <h2 className={styles.relatedTitle}>Keep Reading</h2>
            <div className={styles.relatedGrid}>
              {relatedBlogs.map((b, idx) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/blogs/${b.slug}`} className={styles.relatedCard}>
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className={styles.relatedCardImg}
                    />
                    <div className={styles.relatedCardOverlay} />

                    <div className={styles.relatedCardDate}>
                      {formatDate(b.createdAt)}
                    </div>

                    <div className={styles.relatedCardBottom}>
                      <h3 className={styles.relatedCardTitle}>{b.title}</h3>
                      <div className={styles.relatedCardArrow}>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
