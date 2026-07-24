'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

interface Blog {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  createdAt: string;
}

export default function BlogsClientPage({ blogs }: { blogs: Blog[] }) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <main style={{ minHeight: '100vh', background: '#fff', paddingTop: '80px' }}>
      {/* Header */}
      <SectionReveal>
<section style={{ padding: '5rem 5% 0', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#000' }}>
            <circle cx="12" cy="4" r="2" fill="black"/>
            <circle cx="12" cy="20" r="2" fill="black"/>
            <circle cx="4" cy="12" r="2" fill="black"/>
            <circle cx="20" cy="12" r="2" fill="black"/>
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0.001, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 160, damping: 30, mass: 1 }}
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '1.5rem', lineHeight: 1.1, color: '#000' }}
        >
          Our Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.1 }}
          style={{ color: '#000', fontSize: '1rem', marginBottom: '1.5rem' }}
        >
          Explore ideas, trends, and behind-the-scenes stories from our studio.
        </motion.p>
      </section>
</SectionReveal>

      {/* Blog Grid */}
        <section style={{ padding: '0 0 8rem', background: '#fff' }}>
          <div className="jade-container" style={{ paddingTop: '4rem' }}>
            {blogs.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999', padding: '4rem 0' }}>No blog posts yet. Check back soon!</p>
            ) : (
              <div className="blog-grid">
                {blogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.08 }}
                  >
                    <Link href={`/blogs/${blog.slug}`} className="blog-card" style={{ textDecoration: 'none', display: 'block', position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        className="blog-card-img"
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.1) 80%)' }} />

                      {/* Date pill */}
                      <div className="blog-card-date" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '0.4rem 1.2rem', fontSize: '0.85rem', fontWeight: 600, color: '#111', transition: 'transform 0.4s ease' }}>
                        {formatDate(blog.createdAt)}
                      </div>

                      {/* Title + arrow */}
                      <div className="blog-card-bottom" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
                        <h3 className="blog-card-title" style={{ color: '#fff', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 500, lineHeight: 1.2, margin: 0, maxWidth: '80%', transition: 'transform 0.4s ease' }}>{blog.title}</h3>
                        <div style={{ width: 44, height: 44, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#000', transition: 'transform 0.4s ease' }} className="arrow-circle-white">
                          <ChevronRight size={22} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .blog-card { min-height: 450px; }
        @media (min-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
          .blog-card { height: 560px; }
          .blog-card-title { font-size: 1.75rem !important; }
        }
        .blog-card:hover .blog-card-img { transform: scale(1.03); }
        .blog-card:hover .blog-card-date { transform: translateX(6px); }
        .blog-card:hover .blog-card-title { transform: translateX(6px); }
        .blog-card:hover .arrow-circle-white { transform: translateX(-6px) scale(1.08); }
        .blog-email-input::placeholder { color: #000 !important; }
        @media (min-width: 1024px) { .blog-email-input { width: 380px !important; } }
      `}</style>
    </main>
  );
}
