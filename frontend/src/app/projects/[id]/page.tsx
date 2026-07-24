import { getProjectById, getProjects } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import styles from './ProjectDetails.module.css';
import ProjectDetailsClient from './ProjectDetailsClient';

interface ProcessStep {
  title: string;
  desc: string;
}

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project || project.error) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#888' }}>Project not found.</div>
    );
  }

  let gallery: string[] = [];
  try { gallery = JSON.parse(project.galleryJson || '[]'); } catch { gallery = []; }

  let processSteps: ProcessStep[] = [];
  try { processSteps = JSON.parse(project.processStepsJson || '[]'); } catch { processSteps = []; }
  if (!processSteps.length) {
    if (project.p1Title) processSteps.push({ title: project.p1Title, desc: project.p1Desc });
    if (project.p2Title) processSteps.push({ title: project.p2Title, desc: project.p2Desc });
    if (project.p3Title) processSteps.push({ title: project.p3Title, desc: project.p3Desc });
  }

  const allProjects = await getProjects();
  const relatedProjects = Array.isArray(allProjects)
    ? allProjects.filter((p: any) => p.id !== id).slice(0, 3)
    : [];

  return (
    <SmoothScroll>
    <div className={styles.pageWrapper}>
      <Navbar />
      <ProjectDetailsClient
        project={project}
        gallery={gallery}
        processSteps={processSteps}
        relatedProjects={relatedProjects}
      />
      <Footer />
    </div>
    </SmoothScroll>
  );
}
