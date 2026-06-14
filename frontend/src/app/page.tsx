import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import HarmonySection from '@/components/home/HarmonySection';
import ProcessSection from '@/components/home/ProcessSection';
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
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroSection />
        <SectionReveal><AboutSection /></SectionReveal>
        <SectionReveal><PhilosophySection /></SectionReveal>
        <SectionReveal><ProjectsSection /></SectionReveal>
        <SectionReveal><CategoriesSection /></SectionReveal>
        <SectionReveal><HarmonySection /></SectionReveal>
        <SectionReveal><TestimonialsSection /></SectionReveal>
        <SectionReveal><AsSeenSection /></SectionReveal>
        <SectionReveal><BlogsSection /></SectionReveal>
        <SectionReveal><DreamSection /></SectionReveal>
        <SectionReveal><FaqSection /></SectionReveal>
        <SectionReveal><TeamSection /></SectionReveal>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
