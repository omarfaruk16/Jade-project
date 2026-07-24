import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import TeamSection from '@/components/home/TeamSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import styles from './About.module.css';
import { getPartners } from '@/lib/data';
import AboutPageClient from './AboutPageClient';

export default async function AboutPage() {
  const partners = await getPartners('about');
  return (
    <SmoothScroll>
      <div className={styles.pageWrapper}>
        <Navbar />

        <main className={styles.container}>
          <AboutPageClient partners={Array.isArray(partners) ? partners : []} />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Shared Team Section */}
          <TeamSection />

        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
