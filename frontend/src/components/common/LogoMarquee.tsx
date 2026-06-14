'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './LogoMarquee.module.css';

const logos = [
  { src: '/images/logo/DAIKIN.webp', alt: 'Daikin' },
  { src: '/images/logo/bmw.webp', alt: 'BMW' },
  { src: '/images/logo/fi.avif', alt: 'F1' },
  { src: '/images/logo/launchsimplae.png', alt: 'LaunchSimple' },
  { src: '/images/logo/shanta.webp', alt: 'Shanta' },
];

// 4 copies — one set scrolls out, the others fill the space endlessly
const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const totalWidth = trackRef.current.scrollWidth;
      // We have 4 copies; scroll exactly 1 copy worth of width for seamless loop
      const oneSet = totalWidth / 4;
      if (oneSet > 0) setOffset(oneSet);
    };

    // Measure once on mount
    measure();

    // Re-measure when images finish loading (in case they push widths)
    const imgs = trackRef.current?.querySelectorAll('img') ?? [];
    imgs.forEach((img) => img.addEventListener('load', measure));

    return () => {
      imgs.forEach((img) => img.removeEventListener('load', measure));
    };
  }, []);

  return (
    <div className={styles.marqueeContainer}>
      <motion.div
        ref={trackRef}
        className={styles.marqueeContent}
        /* Only start animating once we have a real measured width */
        animate={offset > 0 ? { x: [0, -offset] } : { x: 0 }}
        transition={{
          duration: 16,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {marqueeLogos.map((logo, index) => (
          <div key={index} className={styles.logoItem}>
            <img
              src={logo.src}
              alt={logo.alt}
              className={styles.logoImage}
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
