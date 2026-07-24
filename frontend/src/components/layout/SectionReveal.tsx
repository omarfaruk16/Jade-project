'use client';

import { useEffect, useRef } from 'react';
import { ReactNode } from 'react';
import styles from './SectionRevealOpt.module.css';

interface SectionRevealProps {
  children: ReactNode;
}

export default function SectionReveal({ children }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animated);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '-50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className={styles.reveal}>
      {children}
    </div>
  );
}
