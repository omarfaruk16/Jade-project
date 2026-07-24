'use client';

import { ReactNode, useState } from 'react';
import API_BASE from '@/lib/api';
import styles from './Dealer.module.css';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import CeoBadge from '@/components/shared/CeoBadge';
import WhatsIncluded from '@/components/shared/WhatsIncluded';
import '@/app/jade-shared.css';
import DreamSection from '@/components/home/DreamSection';

import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';

interface Partner {
  id: string;
  logo: string;
  name: string;
}

const dealerBenefits = [
  {
    title: 'Total design care & system',
    description:
      'We empower your team with comprehensive product expertise and premium design guidance, ensuring you serve clients with absolute confidence and consistency.',
  },
  {
    title: 'Expert marketing direction',
    description:
      'We advance your retail market presence through strategic campaign direction and collaborative growth plans built on trust, clarity, and true excellence.',
  },
  {
    title: 'Secure warranty assurances',
    description:
      'Our professional responsibility is providing complete structural reliability and reliable product protection to safeguard all elite consumer investments.',
  },
  {
    title: 'Reliable after sales cares',
    description:
      'We extend a dedicated ecosystem of post-purchase assistance and steady operational maintenance to ensure long-term brand growth alongside global partners.',
  },
];

const dealerWhatsIncluded = [
  'We deliver premium interior solutions with exceptional craftsmanship, top-tier quality materials, and true value. ',
  'We provide customized furniture and interior solutions tailored to the needs of residential and commercial projects.',
  'We secure seamless global logistics, agile production setups, and reliable ontime delivery for partners.',
  'We build enduring business alliances rooted in absolute trust, shared clarity, and dedicated systems.',
];

export default function DealerPageClient({ partners, faqSection }: { partners: Partner[]; faqSection: ReactNode }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    location: '',
    budget: '',
    interest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/dealer/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', phone: '', businessName: '', location: '', budget: '', interest: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        {/* Hero */}
        <SectionReveal>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.title}>
                <ScaleBlur text="Become a Jade Partner" stagger={0.04} />
              </h1>
              <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                Partner with Jade to unlock a complete ecosystem of premium support, driving shared global growth
              </motion.p>
            </div>
          </section>
        </SectionReveal>

        {/* Intro */}
        <SectionReveal>
          <section className={styles.intro}>
            <div className={styles.container}>
              <div className={styles.featureRow}>
                <div className={styles.featureLabel}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="6" r="2.5" fill="#000" />
                    <circle cx="12" cy="18" r="2.5" fill="#000" />
                    <circle cx="6" cy="12" r="2.5" fill="#000" />
                    <circle cx="18" cy="12" r="2.5" fill="#000" />
                  </svg>
                  <span>Pledge</span>
                </div>
                <div className={styles.introInfo}>
                  <h4>In Jade we build long-term partners. We extend a complete ecosystem of support, covering product expertise, design guidance, marketing direction, warranty assurance, and after-sales care. Our responsibility is to ensure our partners are fully equipped to serve clients with confidence and consistency. We believe strong partnerships are built on trust, clarity, and shared standards of excellence. When our partners grow, the brand grows with them. We invite those who value quality, integrity, and ambition to grow alongside us and shape a stronger presence in the market together.</h4>
                  <CeoBadge />
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Office Design */}
        <SectionReveal>
          <section className={styles.officeDesignDetailed}>
            <div className={styles.container}>
              <div className={styles.officeHeader}>
                <TitleReveal><h2 className={styles.officeTitle}>Shaping the Future of Design Together</h2></TitleReveal>
                <div className={styles.officeHeaderRight}>
                  <p>Empowering partners with design<br />guidance, trust & support.</p>
                  <button className={styles.contactNowBtn} onClick={() => window.open('https://wa.me/60196449447', '_blank')}>Contact now</button>
                </div>
              </div>

              {/* Concept blocks */}
              <div className={styles.featureRow}>
                <div className={styles.featureLabel}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="6" r="2.5" fill="#000" />
                    <circle cx="12" cy="18" r="2.5" fill="#000" />
                    <circle cx="6" cy="12" r="2.5" fill="#000" />
                    <circle cx="18" cy="12" r="2.5" fill="#000" />
                  </svg>
                  <span>Dealer Benefits</span>
                </div>
                <div className={styles.featureGridText}>
                  {dealerBenefits.map((item, i) => (
                    <motion.div
                      key={i}
                      className={styles.conceptBlock}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                    >
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quote cards */}
              <div className={styles.featureRow} style={{ marginTop: '5rem', paddingTop: '5rem', paddingBottom: 0, marginBottom: 0 }}>
                <div className={styles.featureLabel}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="6" r="2.5" fill="#000" />
                    <circle cx="12" cy="18" r="2.5" fill="#000" />
                    <circle cx="6" cy="12" r="2.5" fill="#000" />
                    <circle cx="18" cy="12" r="2.5" fill="#000" />
                  </svg>
                  <span>Values</span>
                </div>
                <WhatsIncluded quotes={dealerWhatsIncluded} />
              </div>

              {/* Partners Section (New) */}
              <div className={styles.featureRow} style={{ marginTop: 0, paddingTop: '8rem' }}>
                <div className={styles.featureLabel}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="6" r="2.5" fill="#000" />
                    <circle cx="12" cy="18" r="2.5" fill="#000" />
                    <circle cx="6" cy="12" r="2.5" fill="#000" />
                    <circle cx="18" cy="12" r="2.5" fill="#000" />
                  </svg>
                  <span>Partners</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <TitleReveal><h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>Our export import partners</h3></TitleReveal>
                  <div className={styles.partnersGrid}>
                    {partners.length > 0 ? (
                      partners.map(p => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={p.id} src={p.logo} alt={p.name} className={styles.partnerLogo} />
                      ))
                    ) : (
                      <p style={{ color: '#999', fontSize: '0.95rem' }}>No partners added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        <DreamSection />
        {/* Shared FAQ Section */}

        {faqSection}



        {/* Dealer Form */}
        <section className={styles.dealerFormSection}>
            <div className={styles.container}>
              <div className={styles.formSplit}>
                <motion.div
                  className={styles.formInfo}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                >
                  <h2>Become a dealer</h2>
                  <p>You can become a part of our world!</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/be-a-dealer.webp" alt="Handshake" className={styles.handshakeImage} />
                </motion.div>

                <motion.div
                  className={styles.formCard}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                >
                  {submitted ? (
                    <div className={styles.success}>
                      <TitleReveal><h3>Application Received!</h3></TitleReveal>
                      <p>Our team will review your application and contact you shortly.</p>
                      <button onClick={() => setSubmitted(false)} className={styles.submitBtn}>New Application</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                          <label>Full Name</label>
                          <input type="text" placeholder="Your Full Name" required value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                        </div>
                        <div className={styles.inputGroup}>
                          <label>Email</label>
                          <input type="email" placeholder="email@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                      </div>

                      <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                          <label>Phone Number</label>
                          <input type="tel" placeholder="+1 (555) 000-0000" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div className={styles.inputGroup}>
                          <label>Business Name</label>
                          <input type="text" placeholder="Company Name" required value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label>Business Location</label>
                        <input type="text" placeholder="City, Country" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                      </div>


                      <div className={styles.inputGroup}>
                        <label>Budget of your deal</label>
                        <select required value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })}>
                          <option value="">Select...</option>
                          <option value="500,000-700,000 RM">500,000-700,000 RM</option>
                          <option value="700,000-1,000,000 RM">700,000-1,000,000 RM</option>
                          <option value="1,000,000 and above RM">1,000,000 and above RM</option>
                        </select>
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Why are you interested to become a dealer?</label>
                        <select required value={formData.interest} onChange={e => setFormData({ ...formData, interest: e.target.value })}>
                          <option value="">Select...</option>
                          <option value="Want to be an entrepreneur with jade">Want to be an entrepreneur with jade</option>
                          <option value="Expand my current business">Expand my current business</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div className={styles.inputGroup}>
                        <label>Message</label>
                        <textarea placeholder="Tell us more about your business..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                      </div>

                      <button type="submit" className={styles.submitBtn}>Submit</button>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
    </>
  );
}
