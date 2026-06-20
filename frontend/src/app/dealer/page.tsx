'use client';

import { useState, useEffect } from 'react';
import API_BASE from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Dealer.module.css';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/layout/SectionReveal';
import CeoBadge from '@/components/shared/CeoBadge';
import WhatsIncluded from '@/components/shared/WhatsIncluded';
import FaqSection from '@/components/home/FaqSection';
import '@/app/jade-shared.css';
import DreamSection from '@/components/home/DreamSection';

import TitleReveal from '@/components/layout/TitleReveal';
import ScaleBlur from '@/components/layout/ScaleBlur';
import SmoothScroll from '@/components/layout/SmoothScroll';

interface Partner {
  id: string;
  logo: string;
  name: string;
}

const dealerBenefits = [
  {
    title: 'Exclusive Product Access',
    description:
      'Gain access to our complete portfolio of premium furniture and interior solutions designed for residential, commercial, and hospitality projects worldwide.',
  },
  {
    title: 'Dedicated Business Support',
    description:
      'Our team provides continuous guidance, technical assistance, and responsive communication to help partners operate efficiently and confidently.',
  },
  {
    title: 'Flexible Supply & Logistics',
    description:
      'With reliable production capabilities and organized export processes, we ensure timely deliveries and seamless order fulfillment for every market.',
  },
  {
    title: 'Long-Term Growth Opportunities',
    description:
      'We believe in building sustainable partnerships through trust, collaboration, and shared success, creating opportunities for continuous business expansion.',
  },
];

const dealerWhatsIncluded = [
  'Our Malaysia-based interior company delivers premium solutions with exceptional craftsmanship, quality materials, and lasting value.',
  'We provide customized furniture and interior solutions tailored to the needs of residential and commercial projects.',
  'Efficient logistics and organized export operations ensure reliable delivery for partners worldwide.',
  'We build long-term partnerships through trust, dedicated support, and continuous collaboration.',
];
export default function DealerPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
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

  useEffect(() => {
    // Fixed: was fetching /contact (returns object), now /partners (returns array)
    fetch(`${API_BASE}/partners`)
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setPartners(data) : setPartners([]))
      .catch(err => console.error(err));
  }, []);

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
    <SmoothScroll>
    <main className={styles.dealerPage}>
      <Navbar />

      {/* Hero */}
      <SectionReveal>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              <ScaleBlur text="Become an Authorized Jade Partner" stagger={0.04} />
            </h1>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              Partner with Jade to access world-class furniture collections, professional business support, and a proven supply network. Together, we create exceptional spaces while building sustainable growth across regional and international markets.
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
                <span>Insights</span>
              </div>
              <div className={styles.introInfo}>
                <h4>We view every dealer as a valued long-term partner. Through quality craftsmanship, dependable service, and mutual trust, we work together to create meaningful growth and deliver exceptional furniture solutions to customers around the world. Our success is measured by the success of the partners who represent our brand.</h4>
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
              <TitleReveal><h2 className={styles.officeTitle}>Office Design</h2></TitleReveal>
              <div className={styles.officeHeaderRight}>
                <p>Learn more about our practice, or read<br />stories from our studio.</p>
                <button className={styles.contactNowBtn} onClick={() => window.location.href = '/contact'}>Contact now</button>
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
                <span>What&apos;s included</span>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/boltshift.svg" className={styles.partnerLogo} alt="Boltshift" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/logoipsum.svg" className={styles.partnerLogo} alt="Logoipsum" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/extrahop.svg" className={styles.partnerLogo} alt="Extrahop" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/framer.svg" className={styles.partnerLogo} alt="Framer" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://svgl.app/library/vercel_wordmark_dark.svg" className={styles.partnerLogo} alt="Vercel" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <DreamSection />
      </SectionReveal>
      {/* Shared FAQ Section */}

      <SectionReveal>
        <FaqSection />
      </SectionReveal>

      {/* Partners */}
      {partners.length > 0 && (
        <SectionReveal>
          <section className={styles.partnersSection}>
            <div className={styles.container}>
              <TitleReveal><h3 className={styles.sectionTitle}>Meet our export partners</h3></TitleReveal>
              <div className={styles.partnersGrid}>
                {partners.map(p => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p.id} src={p.logo} alt={p.name} className={styles.partnerLogo} />
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      )}

      {/* Dealer Form */}
      <SectionReveal>
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
                <TitleReveal><h2>Become a dealer</h2></TitleReveal>
                <p>You can become a part of our world!</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/be_a_dealer_handshack.avif" alt="Handshake" className={styles.handshakeImage} />
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
      </SectionReveal>

      <Footer />
    </main>
    </SmoothScroll>
  );
}
