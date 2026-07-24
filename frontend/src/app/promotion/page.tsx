import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import styles from './Promotion.module.css';
import { getPromotions } from '@/lib/data';
import PromotionPageClient from './PromotionPageClient';

export default async function PromotionPage() {
  const promotions = await getPromotions();
  return (
    <SmoothScroll>
    <div className={styles.pageWrapper}>
      <Navbar />
      <PromotionPageClient promotions={Array.isArray(promotions) ? promotions : []} />
      <Footer />
    </div>
    </SmoothScroll>
  );
}
