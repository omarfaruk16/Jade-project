'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './About.module.css';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import SmoothScroll from '@/components/layout/SmoothScroll';
import TeamSection from '@/components/home/TeamSection';
import LogoMarquee from '@/components/common/LogoMarquee';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import TitleReveal from '@/components/layout/TitleReveal';

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(1); // Start with index 1 in center

  const heroMedia = [
    { id: 0, type: 'image', src: '/images/About%20us/A.jpg' },
    { id: 1, type: 'image', src: '/images/About%20us/B.jpg' },
    { id: 2, type: 'image', src: '/images/About%20us/C.jpg' },
    { id: 3, type: 'image', src: '/images/About%20us/D.jpg' },
    { id: 4, type: 'image', src: '/images/About%20us/Asia%20Award%202025-169%20by%20jade%20.jpg' },
    { id: 5, type: 'image', src: '/images/About%20us/Asia%20Award%202025-298%20By%20jade%27.jpg' },
    { id: 6, type: 'image', src: '/images/About%20us/Asia%20Award%202025-394%20By%20Jade.jpg' },
  ];

  const handleNext = () => setActiveIndex(p => (p + 1) % heroMedia.length);
  const handlePrev = () => setActiveIndex(p => (p === 0 ? heroMedia.length - 1 : p - 1));

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 6; i++) {
      indices.push((activeIndex + i) % heroMedia.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();


  useEffect(() => {
    fetch(`${API_BASE}/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(console.error);

    fetch(`${API_BASE}/team`)
      .then(res => res.json())
      .then(data => setTeamMembers(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(p => (p + 1) % heroMedia.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroMedia.length]);

  return (
    <SmoothScroll>
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.container}>
        {/* Header Section */}
        <SectionReveal>
          <div className={styles.heroOuterWrapper}>
            <section className={styles.headerSection}>
              <h1 className={styles.pageTitle}>
                <ScaleBlur text="About Us" stagger={0.05} />
              </h1>
              <p className={styles.pageSubtitle}>
                Jade Kitchen Design Sdn Bhd is a leading kitchen design and cabinet manufacturer in Malaysia, specializing in modern, contemporary, and customized kitchen solutions. Since 2007
              </p>

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
                <div className={styles.sliderDots}>
                  {heroMedia.map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`${styles.dot} ${activeIndex === dotIdx ? styles.dotActive : ''}`}
                      onClick={() => setActiveIndex(dotIdx)}
                    />
                  ))}
                </div>
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
                Our process is thoughtful, collaborative, and built around you. From the first conversation to the final detail, we blend creativity with strategy.
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
                  Designing Across Borders
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
                  Rebranded with a Clearer Vision
                </div>
                <span className={styles.year}>2024</span>
              </div>
              <div className={styles.milestoneItem}>
                <div className={styles.milestoneText}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="6" r="2.5" fill="#000" />
                    <circle cx="12" cy="18" r="2.5" fill="#000" />
                    <circle cx="6" cy="12" r="2.5" fill="#000" />
                    <circle cx="18" cy="12" r="2.5" fill="#000" />
                  </svg>
                  Building a Strong Team
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
                  Expanded to Commercial Design
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
                  Completed 50+ Projects
                </div>
                <span className={styles.year}>2021</span>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Philosophy Section */}
        <SectionReveal>
          <section className={styles.philosophySection}>
            <div className={styles.philosophyLeft}>
              <div>
                <TitleReveal><h2 className={styles.sectionTitle}>Design With Purpose,<br />Built on Collaboration</h2></TitleReveal>
                <p className={styles.philosophyText}>
                  We're more than a design studio—we're partners in bringing spaces to life. Our approach is rooted in thoughtful strategy, creative exploration, and a commitment to meaningful results.
                </p>
              </div>
              <ul className={styles.featureList}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                  <span>We collaborate with our trusted partners to achieve the best.</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                  <span>Our mission is to transform environments into bespoke sanctuaries.</span>
                </li>
              </ul>
            </div>
            <div className={styles.philosophyRight}>
              <div className={styles.philColLeft}>
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Wood paneling" className={styles.philImgSmall} />
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Glass doors" className={styles.philImgSmall} />
              </div>
              <div className={styles.philColRight}>
                <img src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Vase and chair" className={styles.philImgTall} />
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Our Clients Section */}
        <SectionReveal>
          <section className={styles.clientLogosSection}>
            <h2 className={styles.clientLogosTitle}>Our Clients</h2>
            <p className={styles.clientLogosSub}>We are proud of contributing to the success of world leading brand.</p>
            <div className={styles.heroLogos}>
              <LogoMarquee />
            </div>
          </section>
        </SectionReveal>

        {/* Client Voices Section */}
        <SectionReveal>
          <section className={styles.clientVoicesSection}>
            <div className={styles.voicesHeader}>
              <TitleReveal><h2 className={styles.sectionTitleCenter}>Client Voices</h2></TitleReveal>
              <p className={styles.sectionSubtitleCenter}>
                Real feedback from the incredible people we've had the pleasure to design for.
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              {testimonials.length > 0 ? (
                testimonials.map((testi, idx) => (
                  <div key={idx} className={styles.testimonialCard}>
                    <div className={styles.stars}>
                      {'★'.repeat(testi.rating)}{'☆'.repeat(5 - testi.rating)}
                    </div>
                    <p className={styles.reviewText}>
                      "{testi.review}"
                    </p>
                    <div className={styles.clientInfo}>
                      <img src={testi.avatar || 'https://via.placeholder.com/50'} alt={testi.name} className={styles.avatar} />
                      <div>
                        <h4 className={styles.clientName}>{testi.name}</h4>
                        <span className={styles.clientRole}>{testi.role}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>No testimonials available yet.</p>
              )}
            </div>
          </section>
        </SectionReveal>

        {/* Shared Team Section */}
        <SectionReveal>
          <TeamSection />
        </SectionReveal>

      </main>
      <Footer />
    </div>
    </SmoothScroll>
  );
}
