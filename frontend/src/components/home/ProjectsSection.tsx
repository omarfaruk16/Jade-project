import { getProjects } from '@/lib/data';
import ProjectsSectionClient from './ProjectsSectionClient';

const FALLBACK_PROJECTS = [
  { id: '1', title: 'Studio Earth', coverImage: '/images/f1.webp', date: 'Jul 9, 2025' },
  { id: '2', title: 'Coastal Retreat', coverImage: '/images/home-hero.webp', date: 'Jun 13, 2025' },
  { id: '3', title: 'Modern Nest', coverImage: '/images/f1.webp', date: 'Jun 4, 2025' },
  { id: '4', title: 'The Greenhouse', coverImage: '/images/home-hero.webp', date: 'Jun 1, 2025' },
  { id: '5', title: 'Desert Light', coverImage: '/images/f1.webp', date: 'May 20, 2025' },
];

export default async function ProjectsSection() {
  const projects = await getProjects();
  const displayProjects = Array.isArray(projects) && projects.length > 0 ? projects : FALLBACK_PROJECTS;
  return <ProjectsSectionClient projects={displayProjects} />;
}
