import { getPartners } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FaqSection from '@/components/home/FaqSection';
import SmoothScroll from '@/components/layout/SmoothScroll';
import styles from './Dealer.module.css';
import DealerPageClient from './DealerPageClient';

export default async function DealerPage() {
  const partners = await getPartners('dealer');
  return (
    <SmoothScroll>
      <main className={styles.dealerPage}>
        <Navbar />
        <DealerPageClient partners={Array.isArray(partners) ? partners : []} faqSection={<FaqSection />} />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
