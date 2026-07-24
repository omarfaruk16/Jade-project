import { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import styles from './LegalDoc.module.css';
import '@/app/jade-shared.css';

/* Shared shell for legal/policy pages (Terms, Privacy).
   Renders the site Navbar + Footer with a centered
   reading column that matches the site typography. */
export default function LegalDoc({
  title,
  lastUpdate,
  intro,
  children,
}: {
  title: string;
  lastUpdate: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className={styles.page}>
        <Navbar />
        <main className={styles.main}>
          <span className={styles.badge}>Last update: {lastUpdate}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          <div>{children}</div>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      {children}
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className={styles.subheading}>{children}</h3>;
}

export function Para({ children }: { children: ReactNode }) {
  return <p className={styles.para}>{children}</p>;
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
