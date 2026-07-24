'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import TitleReveal from '@/components/layout/TitleReveal';

export default function ProductCategoryClient({ category }: { category: any }) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth > 1080);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <SectionReveal>
        <div style={{ padding: `10rem 4rem ${isLargeScreen ? '64px' : '2rem'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="6" r="2.5" fill="#fff" />
              <circle cx="12" cy="18" r="2.5" fill="#fff" />
              <circle cx="6" cy="12" r="2.5" fill="#fff" />
              <circle cx="18" cy="12" r="2.5" fill="#fff" />
            </svg>
          </div>
          <h1 style={{ color: '#fff', fontSize: isLargeScreen ? '80px' : 'clamp(2.2rem, 6vw, 5rem)', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-5.6px', lineHeight: '88px', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            <ScaleBlur text={category.name || "Products"} stagger={0.04} />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            style={{ color: 'rgb(204, 204, 204)', fontSize: '16px', letterSpacing: '-0.6px', maxWidth: '550px', margin: '0 auto', lineHeight: '24px' }}
          >
            With a seamless process and attention to detail, we turn ideas into beautiful, livable realities.
          </motion.p>
        </div>
      </SectionReveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
        {category.products?.map((product: any) => (
          <div key={product.id} style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', cursor: 'pointer' }} onClick={() => router.push(`/products/details/${product.id}`)}>
            {/* Background Image */}
            <img src={product.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

            {/* Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="6" r="2.5" fill="#fff" />
                  <circle cx="12" cy="18" r="2.5" fill="#fff" />
                  <circle cx="6" cy="12" r="2.5" fill="#fff" />
                  <circle cx="18" cy="12" r="2.5" fill="#fff" />
                </svg>
              </div>
              <TitleReveal><h2 style={{ color: '#fff', fontSize: '42px', fontWeight: 500, lineHeight: '50px', letterSpacing: '-2.5px', marginBottom: '0.5rem' }}>{product.title}</h2></TitleReveal>
              <p style={{ color: 'rgb(204, 204, 204)', fontSize: '16px', marginBottom: '16px' }}>{product.subtitle}</p>
              <button
                onMouseEnter={() => setHoveredBtn(product.id)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ padding: '0.8rem 24px', borderRadius: '9999px', background: '#fff', color: '#000', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                <span style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
                  <span style={{ display: 'block', transition: 'transform 0.4s ease', transform: hoveredBtn === product.id ? 'translateY(-100%)' : 'translateY(0)' }}>Buy now</span>
                  <span style={{ display: 'block', position: 'absolute', top: '100%', left: 0, width: '100%', transition: 'transform 0.4s ease', transform: hoveredBtn === product.id ? 'translateY(-100%)' : 'translateY(0)' }}>Buy now</span>
                </span>
              </button>
            </div>
          </div>
        ))}

        {(!category.products || category.products.length === 0) && (
          <div style={{ textAlign: 'center', color: '#888', padding: '4rem' }}>No products found in this category.</div>
        )}
      </div>
    </>
  );
}
