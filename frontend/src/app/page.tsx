
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import HarmonySection from '@/components/home/HarmonySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AsSeenSection from '@/components/home/AsSeenSection';
import BlogsSection from '@/components/home/BlogsSection';
import FaqSection from '@/components/home/FaqSection';
import TeamSection from '@/components/home/TeamSection';
import DreamSection from '@/components/home/DreamSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import SectionReveal from '@/components/layout/SectionReveal';

export default function Home() {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <main>
          <HeroSection />
          <SectionReveal><AboutSection /></SectionReveal>
          <PhilosophySection />
          <SectionReveal><ProjectsSection /></SectionReveal>

          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <CategoriesSection />
          </Suspense>

          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <HarmonySection />
          </Suspense>

          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <TestimonialsSection />
          </Suspense>

          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <AsSeenSection />
          </Suspense>

          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <BlogsSection />
          </Suspense>

          <DreamSection />
          <FaqSection />
          <TeamSection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
