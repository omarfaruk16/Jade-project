'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import dynamic from 'next/dynamic';

import TitleReveal from '@/components/layout/TitleReveal';

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
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <TitleReveal><h1 style={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1rem' }}>Blog not found</h1></TitleReveal>
          <Link href="/blogs" style={{ color: '#000', textDecoration: 'underline' }}>← Back to Blogs</Link>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main style={{ minHeight: '100vh', background: '#fff', paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #eee', borderTop: '3px solid #000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <main style={{ minHeight: '100vh', background: '#fff', paddingTop: '0' }}>
      {/* Hero Banner */}
      <div style={{ position: 'relative', width: '100%', height: '70vh', minHeight: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <img
          src={blog.coverImage}
          alt={blog.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        
        <div style={{ position: 'relative', zIndex: 10, padding: '0 2rem', marginTop: '4rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '1.1rem', marginBottom: '1rem', opacity: 0.9, color: '#fff', fontWeight: 500 }}
          >
            {formatDate(blog.createdAt)}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: '1000px', color: '#fff', margin: '0 auto' }}
          >
            {blog.title}
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <div className="jade-container" style={{ paddingBlock: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* Back Button */}
          <div>
            <Link href="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#000', textDecoration: 'none', fontWeight: 500, background: '#f4f4f4', borderRadius: '9999px', padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
              Back to Blogs
            </Link>
          </div>

          {/* Blog Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            data-color-mode="light"
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <MDPreview source={blog.description} style={{ background: 'transparent', fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }} />
          </motion.div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div style={{ background: '#f9f9f9', paddingBlock: '6rem' }}>
          <div className="jade-container">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '3rem', textAlign: 'center', color: '#000' }}>Keep Reading</h2>
            <div className="related-blogs-grid">
              {relatedBlogs.map((b, idx) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/blogs/${b.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src={b.coverImage} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="related-img" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>{formatDate(b.createdAt)}</p>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.3, margin: 0 }}>{b.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .related-img:hover { transform: scale(1.05); }
        .related-blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        @media (max-width: 1023px) {
          .related-blogs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 767px) {
          .related-blogs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
