'use client';

import styles from './LogoMarquee.module.css';

const logos = [
  { src: '/images/logo/DAIKIN.webp', alt: 'Daikin' },
  { src: '/images/logo/bmw.webp', alt: 'BMW' },
  { src: '/images/logo/fi.avif', alt: 'F1' },
  { src: '/images/logo/launchsimplae.png', alt: 'LaunchSimple' },
  { src: '/images/logo/shanta.webp', alt: 'Shanta' },
  { src: '/images/logo/DAIKIN.webp', alt: 'Daikin' },
  { src: '/images/logo/bmw.webp', alt: 'BMW' },
  { src: '/images/logo/fi.avif', alt: 'F1' },
];

export default function LogoMarquee() {
  return (
    <div className={styles.gridContainer}>
      {logos.map((logo, index) => (
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
