'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API_BASE from '@/lib/api';

export default function ProductsOverviewPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/products/categories`)
      .then(r => r.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) {
          router.replace(`/products/${data[0].slug}`);
        }
      })
      .catch(e => console.error(e));
  }, [router]);

  if (categories.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#000' }}>
        Loading...
      </div>
    );
  }

  return null;
}
