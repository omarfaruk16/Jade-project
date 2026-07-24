import { getServices, getProductCategories } from '@/lib/data';
import NavbarClient from './NavbarClient';

export default async function Navbar({ visible = true }: { visible?: boolean }) {
  const [services, products] = await Promise.all([getServices(), getProductCategories()]);
  return <NavbarClient visible={visible} services={services} products={products} />;
}
