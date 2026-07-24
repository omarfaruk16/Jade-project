import { getFaqs } from '@/lib/data';
import FaqSectionClient from './FaqSectionClient';

export default async function FaqSection() {
  const faqs = await getFaqs();
  return <FaqSectionClient faqs={Array.isArray(faqs) ? faqs : []} />;
}
