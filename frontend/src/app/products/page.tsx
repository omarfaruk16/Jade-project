import { redirect } from 'next/navigation';
import { getProductCategories } from '@/lib/data';

export default async function ProductsOverviewPage() {
  const categories = await getProductCategories();
  if (Array.isArray(categories) && categories.length > 0) {
    redirect(`/products/${categories[0].slug}`);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#000' }}>
      No products available.
    </div>
  );
}
