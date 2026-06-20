'use client';


import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './ImportExport.module.css';
import { motion } from 'framer-motion';
import WorldMap from '@/components/home/WorldMap';
import SectionReveal from '@/components/layout/SectionReveal';
import CeoBadge from '@/components/shared/CeoBadge';
import WhatsIncluded from '@/components/shared/WhatsIncluded';
import FaqSection from '@/components/home/FaqSection';
import '@/app/jade-shared.css';

import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import SmoothScroll from '@/components/layout/SmoothScroll';

const importExportWhatsIncluded = [
  'Our products are manufactured in accordance with international quality standards, ensuring premium craftsmanship, reliable performance, and long-term value.',
  'With advanced production capabilities, we deliver customized interior solutions tailored to the requirements of diverse global projects.',
  'Efficient logistics and streamlined export operations ensure timely delivery and seamless coordination for partners worldwide.',
  'We foster long-term business relationships through trust, consistency, and dedicated support, creating sustainable growth opportunities for our partners.',
];

export default function ImportExportPage() {


  return (
    <SmoothScroll>
    <div className={styles.pageWrapper}>
      <Navbar />

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
                Trusted by corporate clients in Southeast Asia, the Middle East, and beyond, we export and import world-class furniture, fixtures, and interior systems that transform workspaces into productivity hubs.
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
              <span>Insights</span>
            </div>
            <div className={styles.wideMiddleCol}>
              <h4 className={styles.introText}>
                Worldwide export and import is more than logistics; it’s the bridge that connects Malaysian interior craftsmanship with global markets. By managing seamless trade flows, we ensure quality products reach clients securely and on time.
              </h4>
              <CeoBadge />
            </div>
          </div>
        </SectionReveal>

        {/* Office Design Section */}
        <SectionReveal>
          <section className={styles.officeSection}>
            <div className={styles.officeHeader}>
              <TitleReveal><h2 className={styles.officeTitle}>Office Design</h2></TitleReveal>
              <div className={styles.headerRightContent}>
                <p className={styles.headerDesc}>Explore ideas, trends, and behind-the-scenes stories from our studio.</p>
                <button className={styles.contactBtn} onClick={() => window.location.href = '/contact'}>Contact now</button>
              </div>
            </div>

            <div className={styles.gridRow}>
              <div className={styles.leftCol}>
                <FourDotsIcon />
                <span>About service</span>
              </div>

              <div className={styles.middleCol}>
                <div className={styles.conceptItem}>
                  <h4>Export Excellence</h4>
                  <p>We specialize in delivering Malaysian interior products worldwide with strict quality checks and reliable shipping. This ensures clients receive premium furnishings and design solutions that meet international standards.</p>
                </div>
                <div className={styles.conceptItem}>
                  <h4>Import Reliability</h4>
                  <p>Our import services bring in high-quality materials, finishes, and fixtures from trusted global suppliers. This guarantees diversity, innovation, and cost-effective solutions for every project.</p>
                </div>
              </div>

              <div className={styles.rightCol}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/import-export-righy.avif" alt="Modern Office Detail" className={styles.officeImgSide} />
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* What's Included Section */}
        <SectionReveal>
          <div className={styles.gridRow} style={{ padding: '6rem 0 4rem' }}>
            <div className={styles.leftCol}>
              <FourDotsIcon />
              <span>What&apos;s included</span>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://svgl.app/library/boltshift.svg" className={styles.logoItem} alt="Boltshift" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://svgl.app/library/logoipsum.svg" className={styles.logoItem} alt="Logoipsum" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://svgl.app/library/extrahop.svg" className={styles.logoItem} alt="Extrahop" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://svgl.app/library/framer.svg" className={styles.logoItem} alt="Framer" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://svgl.app/library/vercel_wordmark_dark.svg" className={styles.logoItem} alt="Vercel" />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Harmony Section */}
        <SectionReveal>
          <section className={styles.harmonySection}>
            <TitleReveal>
              <h2 className={styles.harmonySectionTitle}>Design, Installation, and Support in Harmony</h2>
            </TitleReveal>
            <div className={styles.harmonyIntro}>
              <span className={styles.resonateLabel}>(Resonate)</span>
              <p className={styles.harmonyDesc}>
                Every dream home begins with questions: Will this design fit my life? Will it be installed
                flawlessly? Will it last? At Jade, we remove doubt with clarity, precision, and lasting
                support — a journey from vision to peace of mind.
              </p>

            </div>
            <div className={styles.processCards}>
              {[
                { img: '/images/f1.png', text: 'The Art of Understanding brings clarity in every detail.' },
                { img: '/images/f2.png', text: 'The Craft of Perfection delivers flawless lasting results.' },
                { img: '/images/f3.png', text: 'The Promise of Forever ensures trust that never fades.' }
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
              <TitleReveal><h2 className={styles.sectionTitle}>Insights that shape spaces</h2></TitleReveal>
              <div className={styles.insightsHeaderRight}>
                <p className={styles.headerDesc}>Explore ideas, trends, and behind-the-scenes stories from our studio.</p>
              </div>
            </div>

            <WorldMap />

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <TitleReveal><h2>15+</h2></TitleReveal>
                <p>Years of market expertise.</p>
              </div>
              <div className={styles.statItem}>
                <TitleReveal><h2>2-7</h2></TitleReveal>
                <p>Delivery Fast, reliable service.</p>
              </div>
              <div className={styles.statItem}>
                <TitleReveal><h2>1.6k+</h2></TitleReveal>
                <p>Clients Exceptional service.</p>
              </div>
              <div className={styles.statItem}>
                <TitleReveal><h2>8k+</h2></TitleReveal>
                <p>Projects Completed — Quality work.</p>
              </div>
            </div>
          </section>
        </SectionReveal>

      </main>

      {/* Shared FAQ Section */}
      <SectionReveal>
        <FaqSection />
      </SectionReveal>

      <Footer />
    </div>
    </SmoothScroll>
  );
}

const FourDotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="3" r="1.5" fill="currentColor" />
    <circle cx="8" cy="13" r="1.5" fill="currentColor" />
    <circle cx="3" cy="8" r="1.5" fill="currentColor" />
    <circle cx="13" cy="8" r="1.5" fill="currentColor" />
  </svg>
);
