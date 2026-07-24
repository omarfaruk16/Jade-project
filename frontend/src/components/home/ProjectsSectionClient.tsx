'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './ProjectsSection.module.css';

interface Project {
  id: string;
  title: string;
  coverImage: string;
  date: string;
}

const AUTO_SCROLL_SPEED = 40; // px per second

export default function ProjectsSectionClient({ projects }: { projects: Project[] }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isHoveringRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const isArrowScrollingRef = useRef(false);
  const arrowScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateProgress = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? Math.max(0, Math.min(1, el.scrollLeft / max)) : 0;
    setScrollProgress(progress * 100);
  }, []);

  // Auto-scroll loop — pauses on hover and while dragging, resumes otherwise.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let rafId: number;
    let lastTime: number | null = null;

    const tick = (time: number) => {
      if (lastTime == null) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (!isHoveringRef.current && !isDraggingRef.current && !isArrowScrollingRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft < max - 0.5) {
          el.scrollLeft = Math.min(max, el.scrollLeft + (AUTO_SCROLL_SPEED * dt) / 1000);
          updateProgress();
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [updateProgress]);

  // Keep progress in sync with any scroll (native trackpad/touch scroll included).
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    updateProgress();

    const onScroll = () => updateProgress();
    const onResize = () => updateProgress();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateProgress, projects.length]);

  const getStep = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || wrapper.children.length === 0) return viewportRef.current?.clientWidth ?? 0;
    const first = wrapper.children[0] as HTMLElement;
    const second = wrapper.children[1] as HTMLElement | undefined;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }, []);

  // Arrow-triggered smooth scroll — pause auto-scroll for the duration so the
  // two don't fight over scrollLeft on the same frame.
  const runArrowScroll = useCallback((delta: number) => {
    const el = viewportRef.current;
    if (!el) return;
    isArrowScrollingRef.current = true;
    if (arrowScrollTimeoutRef.current) clearTimeout(arrowScrollTimeoutRef.current);
    el.scrollBy({ left: delta, behavior: 'smooth' });
    arrowScrollTimeoutRef.current = setTimeout(() => {
      isArrowScrollingRef.current = false;
    }, 500);
  }, []);

  const handlePrev = useCallback(() => {
    runArrowScroll(-getStep());
  }, [getStep, runArrowScroll]);

  const handleNext = useCallback(() => {
    runArrowScroll(getStep());
  }, [getStep, runArrowScroll]);

  useEffect(() => () => {
    if (arrowScrollTimeoutRef.current) clearTimeout(arrowScrollTimeoutRef.current);
  }, []);

  // Mouse drag-to-scroll ("dragFree" style). Touch keeps native scrolling.
  // Pointer capture is deferred until real movement is detected, so a plain
  // click still reaches the underlying <Link> normally.
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = viewportRef.current;
    if (!el) return;
    isPointerDownRef.current = true;
    dragMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;
    pointerIdRef.current = e.pointerId;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const el = viewportRef.current;
    if (!el) return;
    const delta = e.clientX - dragStartXRef.current;

    if (!dragMovedRef.current) {
      if (Math.abs(delta) <= 4) return;
      dragMovedRef.current = true;
      isDraggingRef.current = true;
      if (pointerIdRef.current != null) el.setPointerCapture(pointerIdRef.current);
    }

    el.scrollLeft = dragStartScrollLeftRef.current - delta;
    updateProgress();
  }, [updateProgress]);

  const endDrag = useCallback(() => {
    isPointerDownRef.current = false;
    isDraggingRef.current = false;
    const el = viewportRef.current;
    if (el && pointerIdRef.current != null && el.hasPointerCapture(pointerIdRef.current)) {
      el.releasePointerCapture(pointerIdRef.current);
    }
    pointerIdRef.current = null;
  }, []);

  const handleCardsClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragMovedRef.current) {
      e.preventDefault();
      dragMovedRef.current = false;
    }
  }, []);

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

        <div
          className={styles.carouselViewport}
          ref={viewportRef}
          onMouseEnter={() => { isHoveringRef.current = true; }}
          onMouseLeave={() => { isHoveringRef.current = false; }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleCardsClickCapture}
          style={{ cursor: 'grab' }}
        >
          <div className={styles.projectsWrapper} ref={wrapperRef}>
            {projects.map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className={styles.projectCard}
                draggable={false}
              >
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className={styles.cardImage}
                    draggable={false}
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
                  <div className={styles.titleWrapper}>
                    <span className={styles.cardTitle}>{project.title}</span>
                    <span className={styles.cardTitle}>{project.title}</span>
                  </div>
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
