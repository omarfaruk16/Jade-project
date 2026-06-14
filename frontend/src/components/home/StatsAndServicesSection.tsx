'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './StatsAndServicesSection.module.css';

import TitleReveal from '@/components/layout/TitleReveal';

import SectionReveal from '@/components/layout/SectionReveal';

export default function StatsAndServicesSection() {
  return (
    <SectionReveal>
<section className={styles.section}>
      <div className="jade-container">
      <div className={styles.topContainer}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            We offer full scale architectural services based on local landscape
          </motion.h2>
          <motion.button 
            className={styles.moreBtn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            More about Jade Studio
          </motion.button>
        </div>
        
        <div className={styles.statsContainer}>
          {[
            { num: "75+", text: "Years of Experience" },
            { num: "8+", text: "Successful Projects" },
            { num: "1.2K+", text: "Client Base" },
            { num: "98%", text: "Positive Feedback" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              className={styles.statBox}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TitleReveal><h3>{stat.num}</h3></TitleReveal>
              <p>{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {[
          { img: "/images/home-1.avif", title: "Residential Construction", desc: "Crafting homes that blend form and function perfectly." },
          { img: "/images/home-2.avif", title: "Interior Design", desc: "Transforming spaces into beautiful, functional living areas." },
          { img: "/images/home-3.avif", title: "Architectural Planning", desc: "Designing functional blueprints for modern buildings." }
        ].map((card, idx) => (
          <motion.div 
            key={idx} 
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageWrapper}>
              <img src={card.img} alt={card.title} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <TitleReveal><h3>{card.title}</h3></TitleReveal>
                <ArrowRight size={20} className={styles.arrow} />
              </div>
              <p>{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
</SectionReveal>
  );
}
