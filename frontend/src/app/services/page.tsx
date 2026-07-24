import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Services.module.css';

import ScaleBlur from '@/components/layout/ScaleBlur';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { getServices } from '@/lib/data';

export default async function ServicesPage() {
  const parents = await getServices();

  const firstChild = parents?.[0]?.children?.[0];
  if (firstChild?.slug) {
    redirect(`/services/${firstChild.slug}`);
  }

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
