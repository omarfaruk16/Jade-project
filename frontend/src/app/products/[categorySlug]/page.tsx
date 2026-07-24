import { getProductCategoryBySlug } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ProductCategoryClient from './ProductCategoryClient';

export default async function ProductCategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = await getProductCategoryBySlug(categorySlug);

  if (!category || category.error) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c', color: '#fff' }}>Category not found</div>;
  }

  return (
    <SmoothScroll>
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <Navbar />
      <ProductCategoryClient category={category} />
      <Footer />
    </div>
    </SmoothScroll>
  );
}
