'use client';

import { useEffect, useRef } from 'react';
import styles from './ScaleBlurOpt.module.css';

interface ScaleBlurProps {
  text: string;
  stagger?: number;
  className?: string;
  delay?: number;
}

export default function ScaleBlur({ text = '', stagger = 0.05, className = '', delay = 0 }: ScaleBlurProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll(`.${styles.char}`);
          spans.forEach((span, index) => {
            const element = span as HTMLElement;
            setTimeout(() => {
              element.classList.add(styles.visible);
            }, (delay * 1000) + (index * stagger * 1000));
          });
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
  }, [stagger, delay]);

  const words = (text || '').split(' ');

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={{ wordBreak: 'normal', overflowWrap: 'normal', justifyContent: 'center' }}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{
            display: 'inline-flex',
            whiteSpace: 'nowrap',
          }}
        >
          {word.split('').map((c, ci) => (
            <span
              key={ci}
              className={styles.char}
              style={{ display: 'inline-block' }}
            >
              {c}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className={styles.char} style={{ display: 'inline-block', width: '0.2em' }}>
              {' '}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
