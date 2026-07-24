import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FaqSection from '@/components/home/FaqSection';
import SmoothScroll from '@/components/layout/SmoothScroll';
import styles from './ImportExport.module.css';
import { getPartners } from '@/lib/data';
import ImportExportClient from './ImportExportClient';

export default async function ImportExportPage() {
  const partners = await getPartners('export-import');
  return (
    <SmoothScroll>
      <div className={styles.pageWrapper}>
        <Navbar />
        <ImportExportClient partners={Array.isArray(partners) ? partners : []} />

        {/* Shared FAQ Section */}
        <FaqSection />

        <Footer />
      </div>
    </SmoothScroll>
  );
}
