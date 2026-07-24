'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import NavbarClient from '@/components/layout/NavbarClient';
import styles from './ServiceChild.module.css';
import SectionReveal from '@/components/layout/SectionReveal';

import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
const QuoteIcon = () => (
  <svg viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="12">
    <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V11.5H5.5V6H2.5C2.5 4.89543 3.39543 4 4.5 4V0Z" fill="currentColor" />
    <path d="M13 0C10.5147 0 8.5 2.01472 8.5 4.5V11.5H14V6H11C11 4.89543 11.8954 4 13 4V0Z" fill="currentColor" />
  </svg>
);

const PinIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="4.5" r="3.5" stroke="#111" strokeWidth="1.2" />
    <path d="M6 8V13.5" stroke="#111" strokeWidth="1.2" />
  </svg>
);

export default function ServiceChildClient({ data, services, products }: { data: any; services: any[]; products: any[] }) {
  const [activeItem, setActiveItem] = useState<string>(data.items?.[0]?.id || '');
  const [showSubNav, setShowSubNav] = useState(false);
  const itemRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const activeItemRef = useRef<string>(data.items?.[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowSubNav(scrollPos > 600);

      const items = data.items || [];
      let currentActive = items[0]?.id || activeItemRef.current;
      for (const item of items) {
        const ref = itemRefs.current[item.id];
        if (ref) {
          const refTop = ref.getBoundingClientRect().top + window.scrollY;
          if (refTop - 150 <= scrollPos) {
            currentActive = item.id;
          }
        }
      }
      if (currentActive !== activeItemRef.current) {
        activeItemRef.current = currentActive;
        setActiveItem(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.items]);

  const scrollTo = (id: string) => {
    setActiveItem(id);
    activeItemRef.current = id;
    const ref = itemRefs.current[id];
    if (ref) {
      const top = ref.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <NavbarClient visible={!showSubNav} services={services} products={products} />

      {/* Floating Sticky Sub-navigation */}
      <div className={`${styles.subNavWrapper} ${showSubNav ? styles.subNavVisible : ''}`}>
        <div className={styles.subNav}>

          <Link href="/" className={styles.subNavLogo} >
            <img src="/images/jadelogo.png" alt="Jade" style={{ objectFit: 'contain' }} />
          </Link>

          <div className={styles.subNavLinks}>
            {data.items.map((item: any, idx: number) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`${styles.subNavBtn} ${activeItem === item.id ? styles.subNavBtnActive : ''}`}
              >
                {activeItem === item.id && <span className={styles.redDot} />}
                <span className={styles.subNavNum}></span> {item.title}
              </button>
            ))}
          </div>
          <a href="https://cal.com/jade-kitchen-design/not-sure-what-you-need-let-s-figure-it-out-fast" target="_blank" rel="noopener noreferrer" className={styles.subNavAction}>Book a Call</a>
        </div>
      </div>

      <div className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${data.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"})` }}></div>
          <div className={styles.heroOverlay}></div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 5vw' }}
          >
            <h1 className={styles.heroTitle}><ScaleBlur text={data.name} stagger={0.04} /></h1>
            {data.description && (
              <p className={styles.heroDesc}>{data.description}</p>
            )}
          </motion.div>
        </div>
      </div>

      <div className={styles.page}>
        {data.items.map((item: any) => (
          <section
            key={item.id}
            ref={el => { itemRefs.current[item.id] = el; }}
            className={styles.serviceItem}
          >
              <div className={styles.itemHeader}>
                <TitleReveal><h1 className={styles.itemTitle}>{item.title}</h1></TitleReveal>
                <div className={styles.itemHeaderRight}>
                  <p className={styles.headerText}>Think we&apos;re the right fit? Contact us and let&apos;s get started.</p>
                  <button className={styles.contactBtn} onClick={() => window.open('https://wa.me/601163329447', '_blank')}>Contact now</button>
                </div>
              </div>

              {/* Row 1: About service */}
              <SectionReveal>
                <div className={styles.gridRow}>
                  <div className={styles.leftCol}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    <span>About service</span>
                  </div>
                  <div className={styles.middleCol}>
                    <p className={styles.aboutText}>{item.about}</p>
                    {item.keyLine && (
                      <div className={`${styles.quoteBox} ${styles.quoteBoxOrange}`}>
                        <div className={styles.quoteWrap}><QuoteIcon /></div>
                        <span>{item.keyLine}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.rightCol}>
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className={styles.aboutImage} />
                    )}
                  </div>
                </div>
              </SectionReveal>

              {/* Row 2: Overview */}
              {(item.overviewCategory || item.overviewBestFor || item.overviewStyleApproach) && (
                <SectionReveal>
                  <div className={`${styles.gridRow} ${styles.overviewGridRow}`}>
                    <div className={styles.leftCol}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="6" r="2.5" fill="#000" />
                        <circle cx="12" cy="18" r="2.5" fill="#000" />
                        <circle cx="6" cy="12" r="2.5" fill="#000" />
                        <circle cx="18" cy="12" r="2.5" fill="#000" />
                      </svg>
                      <span>Overview</span>
                    </div>
                    <div className={styles.overviewGrid}>
                      {item.overviewCategory && (
                        <div className={styles.overviewItem}>
                          <TitleReveal><h4>Category</h4></TitleReveal>
                          <p>{item.overviewCategory}</p>
                        </div>
                      )}
                      {item.overviewBestFor && (
                        <div className={styles.overviewItem}>
                          <TitleReveal><h4>Best For</h4></TitleReveal>
                          <p>{item.overviewBestFor}</p>
                        </div>
                      )}
                      {item.overviewStyleApproach && (
                        <div className={styles.overviewItem}>
                          <TitleReveal><h4>Style Approach</h4></TitleReveal>
                          <p>{item.overviewStyleApproach}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </SectionReveal>
              )}

              {/* Row 3: Features */}
              <SectionReveal>
                <div className={styles.gridRow}>
                  <div className={styles.leftCol}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    <span>Features</span>
                  </div>
                  <div className={styles.includedMiddleCol}>
                    {item.whatsIncluded?.map((w: any, idx: number) => (
                      <div key={w.id} className={styles.includedBlock}>
                        <TitleReveal><h4 className={styles.includedTitle}>{idx + 1}. {w.title}</h4></TitleReveal>
                        <div className={styles.includedDesc} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(w.description || '') }} />
                      </div>
                    ))}
                  </div>
                  <div className={styles.includedRightCol}>
                    {JSON.parse(item.featureQuotesJson || '[]').map((q: string, idx: number, arr: string[]) => {
                      const isLast = idx === arr.length - 1;
                      return (
                        <div key={idx} className={`${styles.quoteBox} ${isLast ? styles.quoteBoxOrange : styles.quoteBoxWhite}`}>
                          <div className={styles.quoteWrap}><QuoteIcon /></div>
                          <p>{q}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </SectionReveal>

              {/* Gallery Row */}
              {item.gallery?.length > 0 && (
                <SectionReveal>
                  <div className={styles.galleryRow}>
                    {item.gallery.map((g: any) => (
                      <img key={g.id} src={g.url} alt="" className={styles.galleryImage} />
                    ))}
                  </div>
                </SectionReveal>
              )}
            </section>
        ))}
      </div>
    </>
  );
}
