import { getRecentBlogs } from '@/lib/data';
import BlogsSectionClient from './BlogsSectionClient';

const DEFAULT_BLOGS = [
  {
    id: 'default-1',
    title: 'The Art of Minimalist Living: Designing for Peace and Purpose',
    slug: 'art-of-minimalist-living',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000',
    description: 'How decluttering your space and focusing on essential elements can transform your daily life and productivity.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'default-2',
    title: 'Understanding Spatial Flow: Designing Intuitive Transitions',
    slug: 'understanding-spatial-flow',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
    description: 'Tips and techniques for organizing layout configurations to allow seamless movement and visual connections.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'default-3',
    title: 'Material Harmony: Blending Wood, Metal, and Stone',
    slug: 'material-harmony-wood-metal-stone',
    coverImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000',
    description: 'A guide on selecting contrasting textures to create warm, inviting, and layered high-end residential interiors.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'default-4',
    title: 'Lighting as an Experience: Sculpting with Illumination',
    slug: 'lighting-as-an-experience',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000',
    description: 'Explore the layers of ambient, task, and accent lighting that shape the perception of premium home environments.',
    createdAt: new Date().toISOString()
  }
];

export default async function BlogsSection() {
  const blogs = await getRecentBlogs(4);
  const displayBlogs = Array.isArray(blogs) && blogs.length > 0 ? blogs : DEFAULT_BLOGS;
  return <BlogsSectionClient blogs={displayBlogs} />;
}
