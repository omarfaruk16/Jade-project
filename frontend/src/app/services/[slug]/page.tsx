import { getServiceChildBySlug, getServices, getProductCategories } from '@/lib/data';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ServiceChildClient from './ServiceChildClient';
import styles from './ServiceChild.module.css';

export default async function ServiceChildPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getServiceChildBySlug(slug);

  if (!data || data.error) {
    return <div className={styles.loading}>Service not found.</div>;
  }

  const [services, products] = await Promise.all([getServices(), getProductCategories()]);

  return (
    <SmoothScroll>
    <div className={styles.pageWrapper}>
      <ServiceChildClient data={data} services={services} products={products} />
      <Footer />
    </div>
    </SmoothScroll>
  );
}
