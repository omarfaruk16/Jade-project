import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogDetailClient from './BlogDetailClient';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <BlogDetailClient slug={slug} />
      <Footer />
    </>
  );
}
