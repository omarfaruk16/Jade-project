'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import API_BASE from '@/lib/api';

import { ChevronRight } from 'lucide-react';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

export default function BlogsClientPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(console.error);
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const restBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <main style={{ minHeight: '100vh', background: '#fff', paddingTop: '80px' }}>
      {/* Header */}
      <SectionReveal>
<section style={{ padding: '5rem 5% 3rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} style={{ marginBottom: '1rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
            <circle cx="12" cy="4" r="2" fill="black"/>
            <circle cx="12" cy="20" r="2" fill="black"/>
            <circle cx="4" cy="12" r="2" fill="black"/>
            <circle cx="20" cy="12" r="2" fill="black"/>
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0.001, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 160, damping: 30, mass: 1 }}
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 500, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.1, color: '#000' }}
        >
          Our Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.1 }}
          style={{ color: '#666', fontSize: '1rem', marginBottom: '2rem' }}
        >
          Explore ideas, trends, and behind-the-scenes stories from our studio.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '0' }}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email"
            style={{ padding: '0.75rem 1.25rem', border: '1px solid #ddd', borderRadius: '9999px 0 0 9999px', outline: 'none', fontSize: '0.9rem', width: 220 }}
          />
          <button
            style={{ background: '#111', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0 9999px 9999px 0', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            Subscribe
          </button>
        </motion.div>
      </section>
</SectionReveal>

      {/* Blog Grid */}
      <SectionReveal>
        <section style={{ padding: '0 0 8rem', background: '#f7f7f7' }}>
          <div className="jade-container" style={{ paddingTop: '4rem' }}>
            {blogs.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999', padding: '4rem 0' }}>No blog posts yet. Check back soon!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Featured Blog */}
                {featuredBlog && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                  >
                    <Link href={`/blogs/${featuredBlog.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', borderRadius: '20px', overflow: 'hidden', minHeight: '600px', cursor: 'pointer' }}>
                      <img
                        src={featuredBlog.coverImage}
                        alt={featuredBlog.title}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="blog-card-img"
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.1) 80%)' }} />

                      {/* Date pill */}
                      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '0.4rem 1.2rem', fontSize: '0.85rem', fontWeight: 600, color: '#111' }}>
                        {formatDate(featuredBlog.createdAt)}
                      </div>

                      {/* Title + arrow */}
                      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' }}>
                        <TitleReveal><h3 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, lineHeight: 1.2, margin: 0, maxWidth: '800px' }}>{featuredBlog.title}</h3></TitleReveal>
                        <div style={{ width: 56, height: 56, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#000', transition: 'transform 0.3s ease' }} className="arrow-circle-white">
                          <ChevronRight size={28} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Rest of the Blogs */}
                {restBlogs.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {restBlogs.map((blog, idx) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: idx * 0.1 }}
                      >
                        <Link href={`/blogs/${blog.slug}`} className="blog-list-card" style={{ display: 'flex', flexDirection: 'column', padding: '2rem', background: '#fff', borderRadius: '16px', textDecoration: 'none', color: 'inherit', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', height: '100%', justifyContent: 'space-between', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ color: '#111', display: 'flex' }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
                                <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
                                <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
                                <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
                              </svg>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <p style={{ fontSize: '0.9rem', color: '#555', margin: 0, fontWeight: 500 }}>{formatDate(blog.createdAt)}</p>
                              <h4 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#000', margin: 0, lineHeight: 1.3 }}>{blog.title}</h4>
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                            <div className="blog-list-arrow" style={{ width: 48, height: 48, background: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'transform 0.3s ease' }}>
                              <ChevronRight size={24} />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </SectionReveal>

      <style>{`
        .blog-card-img:hover { transform: scale(1.02) !important; }
        a:hover .arrow-circle-white { transform: scale(1.05); }
        .blog-list-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.06) !important; }
        .blog-list-card:hover .blog-list-arrow { transform: scale(1.05); }
      `}</style>
    </main>
  );
}
