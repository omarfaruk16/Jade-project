import { getProductById } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ProductDetailsClient from './ProductDetailsClient';
import styles from './ProductDetails.module.css';

export default async function ProductDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product || product.error) {
    return <div className={styles.loading}>Product not found.</div>;
  }

  return (
    <SmoothScroll>
    <div className={styles.pageWrapper}>
      <Navbar />
      <ProductDetailsClient product={product} />
      <Footer />
    </div>
    </SmoothScroll>
  );
}
