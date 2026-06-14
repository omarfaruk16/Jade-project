import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogsClientPage from './BlogsClientPage';

export const metadata = {
  title: 'Our Insights | Jade',
  description: 'Explore ideas, trends, and behind-the-scenes stories from our studio.'
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <BlogsClientPage />
      <Footer />
    </>
  );
}
