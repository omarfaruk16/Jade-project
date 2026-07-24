import { getTestimonials } from '@/lib/data';
import TestimonialsSectionClient from './TestimonialsSectionClient';

const fallbackTestimonials = [
  { id: '1', name: 'Amelia Hart', role: 'Vale Studio', rating: 5, review: 'Their work brought our entire brand to life subtle, thoughtful, and timeless. Every element felt carefully crafted, both visually and emotionally.', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: '2', name: 'Daniel Rees', role: 'Rees & Co', rating: 5, review: 'The team captured our vision better than we imagined. From mood boards to final space, everything felt clear, smooth, and perfectly on-brand.', avatar: 'https://i.pravatar.cc/100?img=8' },
  { id: '3', name: 'Sophie Lang', role: 'Atelier Nine', rating: 5, review: 'We felt heard and understood at every step. Their design choices not only impressed but told our story in ways we never could with words.', avatar: 'https://i.pravatar.cc/100?img=9' },
];

export default async function TestimonialsSection() {
  const data = await getTestimonials();

  let testimonials = data && data.length > 0 ? [...data] : fallbackTestimonials.slice(0, 3);
  if (data && data.length > 0 && testimonials.length < 3) {
    let i = 0;
    while (testimonials.length < 3 && i < fallbackTestimonials.length) {
      if (!testimonials.find((t: any) => t.id === fallbackTestimonials[i].id)) {
        testimonials.push(fallbackTestimonials[i]);
      }
      i++;
    }
  }
  testimonials = testimonials.slice(0, 3);

  return <TestimonialsSectionClient testimonials={testimonials} />;
}
