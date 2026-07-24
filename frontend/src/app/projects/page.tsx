import { getProjects } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import styles from './ProjectsArchive.module.css';
import ProjectsArchiveClient from './ProjectsArchiveClient';

export default async function ProjectsArchive() {
  const projects = await getProjects();
  return (
    <SmoothScroll>
    <div className={styles.pageWrapper}>
      <Navbar />
      <ProjectsArchiveClient projects={Array.isArray(projects) ? projects : []} />
      <Footer />
    </div>
    </SmoothScroll>
  );
}
