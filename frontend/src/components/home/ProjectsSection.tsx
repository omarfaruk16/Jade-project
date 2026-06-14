'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import styles from './ProjectsSection.module.css';

const FALLBACK_PROJECTS = [
  { id: 1, title: 'Studio Earth', coverImage: '/images/f1.png', date: 'Jul 9, 2025' },
  { id: 2, title: 'Coastal Retreat', coverImage: '/images/home-hero.webp', date: 'Jun 13, 2025' },
  { id: 3, title: 'Modern Nest', coverImage: '/images/f1.png', date: 'Jun 4, 2025' },
  { id: 4, title: 'The Greenhouse', coverImage: '/images/home-hero.webp', date: 'Jun 1, 2025' },
  { id: 5, title: 'Desert Light', coverImage: '/images/f1.png', date: 'May 20, 2025' },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'start',
      dragFree: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        speed: 1,
      }),
    ]
  );

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]));
  }, []);

  const onScroll = useCallback((api: any) => {
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);

    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('reInit', onScroll);
    };
  }, [emblaApi, onScroll]);

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    <section className={styles.scrollContainer}>
      <div className={styles.stickySection}>
        <div className={styles.sectionHeader}>

          <div className={styles.carouselArrows}>
            <button
              onClick={handlePrev}
              className={styles.arrowBtn}
              aria-label="Previous Project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className={styles.arrowBtn}
              aria-label="Next Project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.carouselViewport} ref={emblaRef}>
          <div className={styles.projectsWrapper}>
            {displayProjects.map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className={styles.projectCard}
              >
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.hoverArrow}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardTitle}>{project.title}</span>
                  <span className={styles.cardDate}>{project.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ transform: `scaleX(${scrollProgress / 100})` }}
          />
        </div>
      </div>
    </section>
  );
}
