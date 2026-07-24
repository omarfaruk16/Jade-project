import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogsClientPage from './BlogsClientPage';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { getBlogs } from '@/lib/data';

export const metadata = {
  title: 'Our Insights | Jade',
  description: 'Explore ideas, trends, and behind-the-scenes stories from our studio.'
};

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return (
    <SmoothScroll>
    <>
      <Navbar />
      <BlogsClientPage blogs={Array.isArray(blogs) ? blogs : []} />
      <Footer />
    </>
    </SmoothScroll>
  );
}
