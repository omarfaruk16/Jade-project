'use client';

import { useState } from "react";
import styles from "./CategoriesSection.module.css";
import Link from 'next/link';

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  number: string;
  label: string;
  desc: string;
  slug: string;
}

export default function CategoriesSectionClient({ services }: { services: ServiceCard[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
      <section className={styles.expertiseSection}>
        <div className={styles.expertiseContainer}>
          <div className={`jade-container ${styles.innerContainer}`}>
          <div className={styles.expertiseHeader}>
            <h2>Our expertise</h2>
            <p>
              We provide a complete range of spatial solutions, thoughtfully crafted to enhance every environment with refined clarity and enduring aesthetic value.
            </p>
          </div>

          <div className={styles.expertiseList}>
            {services.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.id}
                  className={`${styles.expertiseItem} ${isOpen ? styles.active : ""} ${styles.mobileOpen}`}
                >
                  <div className={styles.itemGrid}>
                    <span className={styles.itemNumber}>{item.id}</span>

                    {item.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.itemImage}
                      />
                    ) : (
                      <div className={styles.itemImage} />
                    )}

                    <div className={styles.itemContent}>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>

                      <div className={`${styles.itemDetails} ${isOpen ? styles.detailsOpen : ""}`}>
                        <h4>{item.number}</h4>
                        <strong>/ {item.label}</strong>
                        <p>{item.desc}</p>
                      </div>
                    </div>

                    <div className={styles.itemAction}>
                      <button
                        className={styles.toggleBtn}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        {isOpen ? "×" : "+"}
                      </button>

                      {(isOpen || true) && (
                        <Link href={`/services/${item.slug}`} className={`${styles.learnBtn} ${isOpen ? styles.btnOpen : ""}`}>
                          Learn more
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </section>
  );
}
