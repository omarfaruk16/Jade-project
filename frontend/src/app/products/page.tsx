'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Products.module.css';

export default function ProductsOverviewPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch(`${API_BASE}/products/categories`)
      .then(r => r.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const tabs = ['All', ...categories.map((c: any) => c.name)];
  const filtered = activeCategory === 'All'
    ? categories
    : categories.filter((c: any) => c.name === activeCategory);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#000' }}>
      Loading...
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      {/* Hero */}
      <section className={styles.heroSection}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.heroTitle}
        >
          Our Products
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.heroSub}
        >
          Explore our premium collections of kitchen cabinetry and interior solutions, crafted to elevate every space.
        </motion.p>
      </section>

      <div className={styles.container}>
        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.catTab} ${activeCategory === tab ? styles.catTabActive : ''}`}
              onClick={() => setActiveCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          className={styles.productsGrid}
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((cat: any, i: number) => (
            <motion.div
              key={cat.id}
              className={styles.productCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/products/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className={styles.productImageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800'}
                    alt={cat.name}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productCategory}>Collection</div>
                  <h3 className={styles.productName}>{cat.name}</h3>
                  {cat.description && (
                    <p className={styles.productPrice}>{cat.description}</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Showcase Banner */}
      <div className={styles.showcaseSection}>
        <div className={styles.showcaseBg} />
        <div className={styles.showcaseContent}>
          <h2 className={styles.showcaseTitle}>Designed for Every Space</h2>
          <p className={styles.showcaseDesc}>
            From modern minimalist to classic luxury — find the perfect kitchen solution for your lifestyle.
          </p>
          <Link href="/contact">
            <button className={styles.showcaseBtn}>Book a Consultation</button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
