import { getServiceChildren } from '@/lib/data';
import CategoriesSectionClient from './CategoriesSectionClient';

const defaultServices = [
  {
    id: "01",
    title: "Residential Interior Design",
    subtitle: "Elegant, livable spaces",
    image: "/images/bg-2.avif",
    number: "80+",
    label: "Tailored home environments",
    desc: "We create refined, functional interiors that reflect your lifestyle—balancing comfort, sophistication, and thoughtful material choices.",
    slug: "residential-interior-design",
  },
  {
    id: "02",
    title: "Commercial Interior Design",
    subtitle: "Branded environments that work",
    image: "/images/home-2.avif",
    number: "50+",
    label: "Commercial spaces",
    desc: "We design productive, premium business environments for offices, showrooms, restaurants, and retail spaces.",
    slug: "commercial-interior-design",
  },
  {
    id: "03",
    title: "Custom Furniture & OEM Solutions",
    subtitle: "Structural design with depth",
    image: "/images/home-3.avif",
    number: "120+",
    label: "Custom furniture pieces",
    desc: "From concept to production, we create furniture solutions tailored to your space and brand identity.",
    slug: "custom-furniture-oem-solutions",
  },
];

export default async function CategoriesSection() {
  const data = await getServiceChildren();

  const services = data && data.length > 0
    ? data.map((c: any, index: number) => ({
      id: String(index + 1).padStart(2, '0'),
      title: c.name,
      subtitle: c.subtitle || "",
      image: c.coverImage || "",
      number: c.statsNumber || "",
      label: c.statsText ? c.statsText.replace(/^\/\s*/, '') : "",
      desc: c.description || "",
      slug: c.slug || `service-${index + 1}`,
    }))
    : defaultServices;

  return <CategoriesSectionClient services={services} />;
}
