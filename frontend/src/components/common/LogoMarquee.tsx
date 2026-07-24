'use client';

import styles from './LogoMarquee.module.css';
import { partnerLogos } from '@/lib/logos';

interface LogoMarqueeProps {
  partners?: Array<{ id: string; logo: string; name: string }>;
}

const fallbackLogos = partnerLogos.map((src, i) => ({ src, alt: `Partner Logo ${i + 1}` }));

export default function LogoMarquee({ partners }: LogoMarqueeProps) {
  const displayLogos = partners && partners.length > 0
    ? partners.map(p => ({ src: p.logo, alt: p.name }))
    : fallbackLogos;

  return (
    <div className={styles.gridContainer}>
      {displayLogos.map((logo, index) => (
        <div key={index} className={styles.logoItem}>
          <img
            src={logo.src}
            alt={logo.alt}
            className={styles.logoImage}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
