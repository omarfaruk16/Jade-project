'use client';

import { useEffect, useState } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Services.module.css';


import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import SmoothScroll from '@/components/layout/SmoothScroll';

export default function ServicesPage() {
  const [parents, setParents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then(r => r.json())
      .then(data => {
        setParents(data);
        setLoading(false);
        // Auto-redirect to the first child category
        const firstChild = data?.[0]?.children?.[0];
        if (firstChild?.slug) {
          router.replace(`/services/${firstChild.slug}`);
        }
      });
  }, [router]);

  if (loading) return (
    <div className={styles.indexPage}>
      <div className={styles.loadingText}>Loading services…</div>
    </div>
  );

  return (
    <SmoothScroll>
    <>
    <div className={styles.indexPage}>
      <Navbar />
      <div className={styles.indexHero}>

        <h1 className={styles.pageTitle}><ScaleBlur text="Our Services" stagger={0.05} /></h1>
        <p>Select a service category below to explore what we offer.</p>
      </div>
      <div className={styles.indexGrid}>
        {parents.map((parent: any) => (
          <div key={parent.id} className={styles.indexGroup}>
            <div className={styles.indexGroupLabel}>{parent.name}</div>
            {parent.children.map((child: any) => (
              <Link key={child.id} href={`/services/${child.slug}`} className={styles.indexCard}>
                <span>{child.name}</span>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
      <Footer />
    </>
    </SmoothScroll>
  );
}

