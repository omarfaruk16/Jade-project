'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';
import styles from './ExpertiseSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';
import SectionReveal from '@/components/layout/SectionReveal';

type ExpertiseItem = {
  id: string;
  title: string;
  sub: string;
  img: string;
  stat: string;
  statSub: string;
  desc: string;
};

const expertiseItems: ExpertiseItem[] = [
  {
    id: '01',
    title: 'Residential Interior Design',
    sub: 'Elegant, livable spaces',
    img: '/images/bg-2.avif',
    stat: '80+',
    statSub: '/ Tailored home environments',
    desc: 'We create refined, functional interiors that reflect your lifestyle—balancing comfort, sophistication, and thoughtful material choices.',
  },
  {
    id: '02',
    title: 'Commercial Interior Design',
    sub: 'Branded environments that work',
    img: '/images/home-2.avif',
    stat: '50+',
    statSub: '/ Commercial spaces delivered',
    desc: 'We design branded environments that foster productivity, culture, and business success.',
  },
  {
    id: '03',
    title: 'Custom Furniture & OEM Solutions',
    sub: 'Structural design with depth',
    img: '/images/home-3.avif',
    stat: '10k+',
    statSub: '/ Custom pieces crafted',
    desc: 'Tailor-made furniture and OEM solutions built with structural integrity and material honesty.',
  },
  {
    id: '04',
    title: 'Design Curation & Consultancy',
    sub: 'Curated design layers',
    img: '/images/home-1.avif',
    stat: '120+',
    statSub: '/ Successful consultations',
    desc: 'Expert guidance in selecting and curating elements that perfectly complement your architectural vision.',
  },
];

export default function ExpertiseSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionReveal>
      <section className={styles.expertiseSection}>
        <div className="jade-container">
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Our expertise
              </motion.h2>

              <motion.p
                className={styles.description}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                We offer a full spectrum of interior design — each tailored to
                elevate spaces with clarity and timeless aesthetic value.
              </motion.p>
            </div>

            <div className={styles.headerRight}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="6" r="1.5" fill="white" />
                <circle cx="12" cy="18" r="1.5" fill="white" />
                <circle cx="6" cy="12" r="1.5" fill="white" />
                <circle cx="18" cy="12" r="1.5" fill="white" />
              </svg>
            </div>
          </div>

          <div className={styles.list}>
            {expertiseItems.map((item) => {
              const isActive = activeId === item.id;

              return (
                <article
                  key={item.id}
                  className={`${styles.listItemWrapper} ${
                    isActive ? styles.active : ''
                  }`}
                >
                  <motion.div
                    className={styles.listItem}
                    layout
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className={styles.number}>{item.id}</div>

                    <div className={styles.imageWrapper}>
                      <img src={item.img} alt={item.title} />
                    </div>

                    <div className={styles.content}>
                      <div className={styles.contentTop}>
                        <TitleReveal>
                          <h3 className={styles.itemTitle}>{item.title}</h3>
                        </TitleReveal>
                        <p className={styles.itemSub}>{item.sub}</p>
                      </div>

                      <div className={styles.details}>
                        <h4 className={styles.statValue}>{item.stat}</h4>
                        <span className={styles.statSub}>{item.statSub}</span>
                        <p className={styles.descText}>{item.desc}</p>

                        <Link
                          href="/services"
                          className={styles.mobileLearnMoreBtn}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Learn more
                        </Link>
                      </div>
                    </div>

                    <div className={styles.actionsColumn}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(item.id);
                        }}
                        aria-label={isActive ? 'Close item' : 'Open item'}
                      >
                        {isActive ? <X size={22} /> : <Plus size={22} />}
                      </button>

                      <Link
                        href="/services"
                        className={styles.learnMoreBtn}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn more
                      </Link>
                    </div>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}