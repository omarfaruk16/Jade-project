'use client';

import { useEffect, useState } from 'react';
import styles from './About.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import LogoMarquee from '@/components/common/LogoMarquee';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import TitleReveal from '@/components/layout/TitleReveal';

export default function AboutPageClient({ partners }: { partners: any[] }) {
  const [activeIndex, setActiveIndex] = useState(1); // Start with index 1 in center

  const heroMedia = [
    { id: 0, type: 'image', src: '/images/about-us/moment-1.webp' },
    { id: 1, type: 'image', src: '/images/about-us/moment-2.webp' },
    { id: 2, type: 'image', src: '/images/about-us/moment-3.webp' },
    { id: 3, type: 'image', src: '/images/about-us/moment-4.webp' },
    { id: 4, type: 'image', src: '/images/about-us/moment-5.webp' },
    { id: 5, type: 'image', src: '/images/about-us/moment-6.webp' },
    { id: 6, type: 'image', src: '/images/about-us/moment-7.webp' },
    { id: 7, type: 'image', src: '/images/about-us/moment-8.webp' },
    { id: 8, type: 'image', src: '/images/about-us/moment-9.webp' },
    { id: 9, type: 'image', src: '/images/about-us/moment-10.webp' },
    { id: 10, type: 'image', src: '/images/about-us/moment-11.webp' },
    { id: 11, type: 'image', src: '/images/about-us/moment-12.webp' },
    { id: 12, type: 'image', src: '/images/about-us/moment-13.webp' },
    { id: 13, type: 'image', src: '/images/about-us/moment-14.webp' },
    { id: 14, type: 'image', src: '/images/about-us/moment-15.webp' },
    { id: 15, type: 'image', src: '/images/about-us/moment-16.webp' },
  ];

  const handleNext = () => setActiveIndex(p => (p + 1) % heroMedia.length);
  const handlePrev = () => setActiveIndex(p => (p === 0 ? heroMedia.length - 1 : p - 1));

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((activeIndex + i) % heroMedia.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(p => (p + 1) % heroMedia.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroMedia.length]);

  return (
    <>
          {/* Header Section */}
          <SectionReveal>
            <div className={styles.heroOuterWrapper}>
              <section className={styles.headerSection}>
                <h1 className={styles.pageTitle}>
                  <ScaleBlur text="About Us" stagger={0.05} />
                </h1>

                <div className={styles.heroGridWrapper}>
                  <div className={styles.heroImagesGrid}>
                    {visibleIndices.map((mediaIndex, i) => {
                      const media = heroMedia[mediaIndex];

                      return (
                        <div key={i} className={styles.imageCol}>
                          <AnimatePresence mode="popLayout">
                            <motion.div
                              key={media.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.05 }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                            >
                              {media.type === 'video' ? (
                                <video src={media.src} autoPlay muted loop playsInline className={styles.heroMediaEl} />
                              ) : (
                                <img src={media.src} alt="" className={styles.heroMediaEl} />
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  <button className={`${styles.sliderNavBtn} ${styles.sliderNavLeft}`} onClick={handlePrev}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className={`${styles.sliderNavBtn} ${styles.sliderNavRight}`} onClick={handleNext}>
                    <ChevronRight size={24} />
                  </button>
                </div>

              </section>
            </div>
          </SectionReveal>

          {/* Milestones Section */}
          <SectionReveal>
            <section className={styles.milestoneSection}>
              <div className={styles.milestoneTop}>
                <div className={styles.milestoneHeader}>
                  <span className={styles.label}>Our history</span>
                  <TitleReveal><h2 className={styles.sectionTitle}>Our Historical Milestones</h2></TitleReveal>
                </div>

                <p className={styles.milestoneIntro}>
                  Built on trust and global pride, our timeline reflects an elite legacy of crafting premium spaces, transforming structural visions into reality.
                </p>
              </div>

              <div className={styles.milestoneList}>
                <div className={styles.milestoneItem}>
                  <div className={styles.milestoneText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    Global Design & Material Manufacturing Center
                  </div>
                  <span className={styles.year}>2025</span>
                </div>
                <div className={styles.milestoneItem}>
                  <div className={styles.milestoneText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    Franchise Expansion in Bangladesh (Space_Coutoure)
                  </div>
                  <span className={styles.year}>2023</span>
                </div>
                <div className={styles.milestoneItem}>
                  <div className={styles.milestoneText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    Cross-Border Distribution (Takara Standard Japan & AGT Turkey)
                  </div>
                  <span className={styles.year}>2022</span>
                </div>
                <div className={styles.milestoneItem}>
                  <div className={styles.milestoneText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    Architectural Solutions & IT Developments (Jadeas & Dinno BD)
                  </div>
                  <span className={styles.year}>2020</span>
                </div>
                <div className={styles.milestoneItem}>
                  <div className={styles.milestoneText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    Manufacturing Plant Establishments & Market Entry
                  </div>
                  <span className={styles.year}>2009</span>
                </div>
                <div className={styles.milestoneItem}>
                  <div className={styles.milestoneText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    Inaugural Kitchen Design & Export-Import Infrastructure
                  </div>
                  <span className={styles.year}>2008</span>
                </div>
                <div className={styles.milestoneItem}>
                  <div className={styles.milestoneText}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="6" r="2.5" fill="#000" />
                      <circle cx="12" cy="18" r="2.5" fill="#000" />
                      <circle cx="6" cy="12" r="2.5" fill="#000" />
                      <circle cx="18" cy="12" r="2.5" fill="#000" />
                    </svg>
                    The Foundation: Architecture & Structure Design
                  </div>
                  <span className={styles.year}>2007</span>
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* Philosophy Section */}
          <SectionReveal>
            <section className={styles.philosophySection}>
              <div className={styles.philosophyLeft}>
                <div>
                  <TitleReveal><h2 className={styles.sectionTitle}>Crafting Spaces, <br />Delivering Trust Worldwide.</h2></TitleReveal>
                  <p className={styles.philosophyText}>
                    Since 2007, Jade Kitchen designs premium custom spaces with global trust, elite partnerships, and seamless cross-border delivery.
                  </p>
                </div>
                <ul className={styles.featureList}>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                    <span>We build relationships on total clarity and permanent trust.</span>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                    <span>Sharing custom innovation and true love to enrich your life.</span>
                  </li>
                </ul>
              </div>
              <div className={styles.philosophyRight}>
                <div className={styles.philColLeft}>
                  <img src="/images/Slices/2-by-jade.webp" alt="Wood paneling" className={styles.philImgSmall} />
                  <img src="/images/Slices/3-by-jade.webp" alt="Glass doors" className={styles.philImgSmall} />
                </div>
                <div className={styles.philColRight}>
                  <img src="/images/Slices/1-by-jade.webp" alt="Vase and chair" className={styles.philImgTall} />
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* Our Clients Section */}
          <SectionReveal>
            <section className={styles.ourClientsSection}>
              <div className={styles.ourClientsHeader}>
                <TitleReveal><h2 className={styles.sectionTitleCenter}>Global Partner</h2></TitleReveal>
                <p className={styles.sectionSubtitleCenter}>
                  With trusted global partners, we bring elite quality worldwide.
                </p>
              </div>
              <LogoMarquee partners={partners} />
            </section>
          </SectionReveal>
    </>
  );
}
