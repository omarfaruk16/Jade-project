import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogsClientPage from './BlogsClientPage';
import SmoothScroll from '@/components/layout/SmoothScroll';

export const metadata = {
  title: 'Our Insights | Jade',
  description: 'Explore ideas, trends, and behind-the-scenes stories from our studio.'
};

export default function BlogsPage() {
  return (
    <SmoothScroll>
    <>
      <Navbar />
      <BlogsClientPage />
      <Footer />
    </>
    </SmoothScroll>
  );
}
