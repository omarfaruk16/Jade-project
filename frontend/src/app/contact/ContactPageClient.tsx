'use client';

import { useState, useEffect } from 'react';
import API_BASE from '@/lib/api';
import styles from './Contact.module.css';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';

export default function ContactPageClient() {
  const [contact, setContact] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', message: '' });

  // Fetch fresh contact data on every mount — always up-to-date with admin changes
  useEffect(() => {
    fetch(`${API_BASE}/contact`)
      .then(r => r.json())
      .then(setContact)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contact/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <SectionReveal>
        <div className={styles.formGrid}>
          {/* Left Side: Info */}
          <div className={styles.infoSide}>
            <div className={styles.contactHeader}>
              <h1 className={styles.pageTitle}>
                <ScaleBlur text="Contact Us" stagger={0.05} />
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className={styles.pageSubtitle}
              >
                Reach out to us—we&apos;d love to hear from you!
              </motion.p>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <h4>Call us</h4>
                <p>{contact?.phone || '+1 123 456 78 90'}</p>
              </div>
              <div className={styles.infoItem}>
                <h4>General inquiries</h4>
                <p>{contact?.email || 'hello@jadespaces.com'}</p>
              </div>
              <div className={styles.infoItem}>
                <h4>Locations</h4>
                <div className={styles.addressList}>
                  <p className={styles.addressText}>No.17 Jalan USJ 1/33 Taman<br />Perindustrian Subang Permai, 47500<br />Subang Jaya Selangor. Malaysia</p>
                  <p className={styles.addressText}>263B Spencer Road,<br />Thornlie 6108 WA, Australia</p>
                  <p className={styles.addressText}>139 Lord Roberts DR,<br />Scarborough On, M1K 3W5, Canada</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <h4>Social</h4>
                <div className={styles.socialList}>
                  {contact?.socials?.map((s: any) => (
                    <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className={styles.formSide}>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.formSuccess}>
                  <TitleReveal><h3>Message Sent!</h3></TitleReveal>
                  <p>We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input type="text" placeholder="Jane Smith" required value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" placeholder="jane@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Message</label>
                    <textarea placeholder="Type something..." required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
