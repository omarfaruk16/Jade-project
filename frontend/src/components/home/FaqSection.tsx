'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import API_BASE from '@/lib/api';
import styles from './FaqSection.module.css';

import SectionReveal from '@/components/layout/SectionReveal';

export default function FaqSection() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/faq`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFaqs(data);
      })
      .catch(console.error);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionReveal>
      <section className={styles.section}>
        <div className="jade-container">
          <div className={styles.header}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Answers that bring clarity
            </motion.h2>

            <motion.div
              className={styles.headerRight}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className={styles.subtitle}>
                We've answered the most common questions<br />
                to help you move forward.
              </p>
              <div className={styles.dotsContainer}>
                <FourDotsIcon />
              </div>

            </motion.div>
          </div>

          <div className={styles.container}>
            <div className={styles.leftContent}>
              {Array.isArray(faqs) && faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    className={styles.faqItem}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      className={styles.faqQuestion}
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={20} className={styles.icon} />
                      ) : (
                        <ChevronDown size={20} className={styles.icon} />
                      )}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className={styles.faqAnswer}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={styles.answerInner}>
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className={styles.rightContent}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/images/contact_faq_team.png" alt="Team meeting" className={styles.faqImage} />

              <div className={styles.floatingContact}>
                <div className={styles.contactLeft}>
                  <FourDotsIconWhite />
                  <p>Still have a question in mind?</p>
                </div>
                <Link href="/contact" className={styles.contactBtn}>
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}

const FourDotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="1.5" fill="black" />
    <circle cx="12" cy="18" r="1.5" fill="black" />
    <circle cx="6" cy="12" r="1.5" fill="black" />
    <circle cx="18" cy="12" r="1.5" fill="black" />
  </svg>
);

const FourDotsIconWhite = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="1.5" fill="white" />
    <circle cx="12" cy="18" r="1.5" fill="white" />
    <circle cx="6" cy="12" r="1.5" fill="white" />
    <circle cx="18" cy="12" r="1.5" fill="white" />
  </svg>
);
