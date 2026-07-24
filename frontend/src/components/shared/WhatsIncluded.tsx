'use client';

import { motion } from 'framer-motion';

export const QuoteIcon = () => (
  <svg className="jade-quote-icon" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V11.5H5.5V6H2.5C2.5 4.89543 3.39543 4 4.5 4V0Z" fill="currentColor" />
    <path d="M13 0C10.5147 0 8.5 2.01472 8.5 4.5V11.5H14V6H11C11 4.89543 11.8954 4 13 4V0Z" fill="currentColor" />
  </svg>
);

const DEFAULT_QUOTES = [
  'Our products are crafted under strict international quality standards, combining premium materials, skilled craftsmanship, and rigorous quality control to ensure lasting performance and exceptional value.',
  'With flexible manufacturing capabilities and tailored production solutions, we deliver customized furniture and interior products that meet the unique requirements of diverse global projects.',
  'Supported by efficient logistics and professional coordination, we ensure seamless export operations and reliable delivery for clients, distributors, and partners around the world.',
  'We build long-term relationships through trust, consistency, and dedicated support, creating sustainable partnerships that help our clients and dealers grow with confidence.',
];

interface WhatsIncludedProps {
  quotes?: string[];
}

export default function WhatsIncluded({ quotes = DEFAULT_QUOTES }: WhatsIncludedProps) {
  return (
    <div className="jade-quotes-grid">
      {quotes.map((text, i) => (
        <motion.div
          key={i}
          className={`jade-quote-card ${i === 0 ? 'orange' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.1 }}
        >
          <QuoteIcon />
          <p className="jade-quote-text">{text}</p>
        </motion.div>
      ))}
    </div>
  );
}
