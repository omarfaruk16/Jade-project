'use client';

import { useEffect, useRef } from 'react';
import { ReactNode } from 'react';
import styles from './TitleRevealOpt.module.css';

interface TitleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function TitleReveal({ children, className = '', delay = 0 }: TitleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              entry.target.classList.add(styles.animated);
            }, delay * 1000);
          } else {
            entry.target.classList.add(styles.animated);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-30px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`${styles.titleReveal} ${className}`} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  );
}
