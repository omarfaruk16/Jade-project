'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import styles from './BlogsSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

const DEFAULT_BLOGS = [
  {
    id: 'default-1',
    title: 'The Art of Minimalist Living: Designing for Peace and Purpose',
    slug: 'art-of-minimalist-living',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000',
    description: 'How decluttering your space and focusing on essential elements can transform your daily life and productivity.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'default-2',
    title: 'Understanding Spatial Flow: Designing Intuitive Transitions',
    slug: 'understanding-spatial-flow',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
    description: 'Tips and techniques for organizing layout configurations to allow seamless movement and visual connections.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'default-3',
    title: 'Material Harmony: Blending Wood, Metal, and Stone',
    slug: 'material-harmony-wood-metal-stone',
    coverImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000',
    description: 'A guide on selecting contrasting textures to create warm, inviting, and layered high-end residential interiors.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'default-4',
    title: 'Lighting as an Experience: Sculpting with Illumination',
    slug: 'lighting-as-an-experience',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000',
    description: 'Explore the layers of ambient, task, and accent lighting that shape the perception of premium home environments.',
    createdAt: new Date().toISOString()
  }
];

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/blogs/recent?limit=4`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBlogs(data);
        }
      })
      .catch(console.error);
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const displayBlogs = Array.isArray(blogs) && blogs.length > 0 ? blogs : DEFAULT_BLOGS;
  const [featured, ...rest] = displayBlogs;

  return (
    <SectionReveal>
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
</SectionReveal>
  );
}
