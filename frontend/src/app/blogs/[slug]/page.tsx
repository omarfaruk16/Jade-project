import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogDetailClient from './BlogDetailClient';
import SmoothScroll from '@/components/layout/SmoothScroll';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <SmoothScroll>
    <>
      <Navbar />
      <BlogDetailClient slug={slug} />
      <Footer />
    </>
    </SmoothScroll>
  );
}
