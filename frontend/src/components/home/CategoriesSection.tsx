"use client";

import { useState, useEffect } from "react";
import styles from "./CategoriesSection.module.css";
import SectionReveal from '@/components/layout/SectionReveal';
import API_BASE from '@/lib/api';

const defaultServices = [
  {
    id: "01",
    title: "Residential Interior Design",
    subtitle: "Elegant, livable spaces",
    image: "/images/bg-2.avif",
    number: "80+",
    label: "Tailored home environments",
    desc: "We create refined, functional interiors that reflect your lifestyle—balancing comfort, sophistication, and thoughtful material choices.",
  },
  {
    id: "02",
    title: "Commercial Interior Design",
    subtitle: "Branded environments that work",
    image: "/images/home-2.avif",
    number: "50+",
    label: "Commercial spaces",
    desc: "We design productive, premium business environments for offices, showrooms, restaurants, and retail spaces.",
  },
  {
    id: "03",
    title: "Custom Furniture & OEM Solutions",
    subtitle: "Structural design with depth",
    image: "/images/home-3.avif",
    number: "120+",
    label: "Custom furniture pieces",
    desc: "From concept to production, we create furniture solutions tailored to your space and brand identity.",
  },
];

export default function CategoriesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE}/services/children`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setServices(data.map((c: any, index: number) => ({
              id: String(index + 1).padStart(2, '0'),
              title: c.name,
              subtitle: c.subtitle || "",
              image: c.coverImage || "",
              number: c.statsNumber || "",
              label: c.statsText ? c.statsText.replace(/^\/\s*/, '') : "",
              desc: c.description || "",
            })));
          }
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <SectionReveal>
      <section className={styles.expertiseSection}>
        <div className={styles.expertiseContainer}>
          <div className={styles.expertiseHeader}>
            <h2>Our expertise</h2>
            <p>
              We offer a full spectrum of interior design — each tailored to
              elevate spaces with clarity and timeless aesthetic value.
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
                        <button className={`${styles.learnBtn} ${isOpen ? styles.btnOpen : ""}`}>
                          Learn more
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
