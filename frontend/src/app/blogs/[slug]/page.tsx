import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogDetailClient from './BlogDetailClient';
import SmoothScroll from '@/components/layout/SmoothScroll';
import TitleReveal from '@/components/layout/TitleReveal';
import { getBlogBySlug, getRecentBlogs } from '@/lib/data';
import styles from './BlogDetailClient.module.css';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.error) {
    return (
      <SmoothScroll>
      <>
        <Navbar />
        <main className={styles.notFound}>
          <div className={styles.notFoundContent}>
            <TitleReveal><h1 className={styles.notFoundTitle}>Blog not found</h1></TitleReveal>
            <Link href="/blogs" className={styles.notFoundLink}>← Back to Blogs</Link>
          </div>
        </main>
        <Footer />
      </>
      </SmoothScroll>
    );
  }

  const recent = await getRecentBlogs(4);
  const relatedBlogs = Array.isArray(recent) ? recent.filter((b: any) => b.slug !== slug).slice(0, 3) : [];

  return (
    <SmoothScroll>
    <>
      <Navbar />
      <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />
      <Footer />
    </>
    </SmoothScroll>
  );
}
