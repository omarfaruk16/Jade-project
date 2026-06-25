'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import dynamic from 'next/dynamic';

import { ChevronRight } from 'lucide-react';
import TitleReveal from '@/components/layout/TitleReveal';
import styles from './BlogDetailClient.module.css';

const MDPreview = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default.Markdown), { ssr: false });

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<any>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/blogs/${slug}`)
      .then(res => {
        if (!res.ok) { setNotFound(true); return null; }
        return res.json();
      })
      .then(data => { 
        if (data) {
          setBlog(data);
          // Fetch related blogs (recent ones)
          fetch(`${API_BASE}/blogs/recent?limit=4`)
            .then(r => r.json())
            .then(recent => {
              if (Array.isArray(recent)) {
                // Filter out current blog
                setRelatedBlogs(recent.filter((b: any) => b.slug !== slug).slice(0, 3));
              }
            })
            .catch(console.error);
        } 
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <main className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <TitleReveal><h1 className={styles.notFoundTitle}>Blog not found</h1></TitleReveal>
          <Link href="/blogs" className={styles.notFoundLink}>← Back to Blogs</Link>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className={styles.spinnerContainer}>
        <div className={styles.spinner} />
      </main>
    );
  }

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
