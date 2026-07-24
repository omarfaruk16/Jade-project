'use client';

import styles from './ImportExport.module.css';
import { motion } from 'framer-motion';
import WorldMap from '@/components/home/WorldMap';
import SectionReveal from '@/components/layout/SectionReveal';
import CeoBadge from '@/components/shared/CeoBadge';
import WhatsIncluded from '@/components/shared/WhatsIncluded';
import '@/app/jade-shared.css';

import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';

const importExportWhatsIncluded = [
  'We seamlessly bring together deep design intelligence and robust manufacturing strength to serve international clients with uncompromised consistency.',
  'From careful packaging to efficient logistics, we manage every tiny detail with responsibility and absolute care.',
  'Beyond production lines, our commitment ensures seamless door-to-door delivery with full operational accountability.',
  'Guided by competitive value, we build long-term confidence with every client, distributor, and dealer growing with us. ',
];

const FourDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="3" r="1.5" fill="currentColor" />
    <circle cx="8" cy="13" r="1.5" fill="currentColor" />
    <circle cx="3" cy="8" r="1.5" fill="currentColor" />
    <circle cx="13" cy="8" r="1.5" fill="currentColor" />
  </svg>
);

export default function ImportExportClient({ partners }: { partners: any[] }) {
  return (
    <>
        {/* Hero Section */}
        <SectionReveal>
          <section className={styles.heroSection}>
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  <ScaleBlur text="Worldwide Export Import" stagger={0.04} />
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className={styles.heroSubtitle}
                >
                  Delivering trust across borders through seamless worldwide export import and global project solutions.
                </motion.p>
              </div>
            </div>
          </section>
        </SectionReveal>

        <main className={styles.container}>
          {/* Intro Section (Insights) */}
          <SectionReveal>
            <div className={styles.gridRow}>
              <div className={styles.leftCol}>
                <FourDotsIcon />
                <span>Pledge</span>
              </div>
              <div className={styles.wideMiddleCol}>
                <h4 className={styles.introText}>
                  At Jade Kitchen, we bring together design intelligence and manufacturing strength to serve clients across international markets with consistency and trust. With more than fifteen years of design consultation experience, our team delivers solutions shaped by insight, precision, and practical understanding of global project needs. Our product range is diverse, supported by a strong manufacturing facility, skilled manpower, and a strict quality assurance system that ensures reliability at every stage. From careful packaging to efficient logistics coordination, we manage every detail with responsibility and care. Our commitment extends beyond production. We ensure seamless door to door delivery with full accountability and service support. Guided by competitive value and a strong focus on long term partnership, we aim to build confidence with every client, distributor, and dealer who chooses to grow with us. At Jade Kitchen, we do not only supply products. We deliver trust across borders.
                </h4>
                <CeoBadge />
              </div>
            </div>
          </SectionReveal>

          {/* Office Design Section */}
          <SectionReveal>
            <section className={styles.officeSection}>
              <div className={styles.officeHeader}>
                <TitleReveal><h2 className={styles.officeTitle}>Global Trade & Export Excellence</h2></TitleReveal>
                <div className={styles.headerRightContent}>
                  <p className={styles.headerDesc}>Explore how we bridge precision manufacturing with global projects.</p>
                  <button className={styles.contactBtn} onClick={() => window.open('https://wa.me/601163329447', '_blank')}>Contact now</button>
                </div>
              </div>

              <div className={styles.gridRow}>
                <div className={styles.leftCol}>
                  <FourDotsIcon />
                  <span>Export Power</span>
                </div>

                <div className={styles.middleCol}>
                  <div className={styles.conceptItem}>
                    <h4>Strategic Export Excellence</h4>
                    <p>With more than fifteen years of design consultation experience, our team delivers global solutions shaped by insight, precision, and a practical understanding of international project needs.</p>
                  </div>
                  <div className={styles.conceptItem}>
                    <h4>Robust Global Sourcing </h4>
                    <p>Our product range is diverse, supported by a state-of-the-art manufacturing facility, skilled manpower, and a strict quality assurance system that ensures reliability at every stage.</p>
                  </div>
                </div>

                <div className={styles.rightCol}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/export-import-page/global-trade-export.webp" alt="Modern Office Detail" className={styles.officeImgSide} />
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* What's Included Section */}
          <SectionReveal>
            <div className={styles.gridRow} style={{ padding: '6rem 0 4rem' }}>
              <div className={styles.leftCol}>
                <FourDotsIcon />
                <span>Commitments</span>
              </div>
              <div className={`${styles.middleCol} ${styles.wideMiddleCol}`}>
                <WhatsIncluded quotes={importExportWhatsIncluded} />
              </div>
            </div>
          </SectionReveal>

          {/* Partners Section */}
          <SectionReveal>
            <div className={styles.gridRow} style={{ padding: '6rem 0 1rem' }}>
              <div className={styles.leftCol}>
                <FourDotsIcon />
                <span>Partners</span>
              </div>
              <div className={`${styles.middleCol} ${styles.wideMiddleCol}`}>
                <TitleReveal><h3 className={styles.partnersTitle}>Our export import partners</h3></TitleReveal>
                <div className={styles.logosRow}>
                  {partners.length > 0 ? partners.map((p: any) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={p.id} src={p.logo} className={styles.logoItem} alt={p.name} />
                  )) : (
                    <p style={{ color: '#999', fontSize: '0.95rem' }}>No partners added yet.</p>
                  )}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Harmony Section */}
          <SectionReveal>
            <section className={styles.harmonySection}>
              <TitleReveal>
                <h2 className={styles.harmonySectionTitle}>Aligning Global Insight with Manufacturing Strength</h2>
              </TitleReveal>
              <div className={styles.harmonyIntro}>
                <span className={styles.resonateLabel}>Philosophy</span>
                <p className={styles.harmonyDesc}>
                  At Jade Kitchen, we align global insight with manufacturing strength, combining our design intelligence and operational capabilities to eliminate cross-border complexities and deliver absolute certainty.
                </p>

              </div>
              <div className={styles.processCards}>
                {[
                  { img: '/images/export-import-page/global-consultation.png', text: 'Global consultation creates tailored solutions.' },
                  { img: '/images/export-import-page/robust-manufacturing.png', text: 'Robust manufacturing ensures quality.' },
                  { img: '/images/export-import-page/secure-logistics.png', text: 'Secure logistics build absolute confidence.' }
                ].map((item, idx) => (
                  <div key={idx} className={styles.processCard}>
                    <div className={styles.processCardHeader}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt="Process thumbnail" className={styles.processThumb} />
                      <FourDotsIcon />
                    </div>
                    <p className={styles.processText}>{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </SectionReveal>

          {/* Insights Section */}
          <SectionReveal>
            <section className={styles.fullInsightsSection}>
              <div className={styles.insightsHeader}>
                <TitleReveal><h2 className={styles.sectionTitle}>Seamless Delivery Across Global Frontiers </h2></TitleReveal>
                <div className={styles.insightsHeaderRight}>
                  <p className={styles.headerDesc}>Connecting premium craftsmanship to global markets with trust.</p>
                </div>
              </div>

              <WorldMap />

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <TitleReveal><h2>15+</h2></TitleReveal>
                  <p>Years Export Mastery</p>
                </div>
                <div className={styles.statItem}>
                  <TitleReveal><h2>8+</h2></TitleReveal>
                  <p>Global Territories Reached</p>
                </div>
                <div className={styles.statItem}>
                  <TitleReveal><h2>10 Days</h2></TitleReveal>
                  <p>Record Turnaround Capability</p>
                </div>
                <div className={styles.statItem}>
                  <TitleReveal><h2>20+</h2></TitleReveal>
                  <p>Elite industries served worldwide</p>
                </div>
              </div>
            </section>
          </SectionReveal>

        </main>
    </>
  );
}
