import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { ThemeAccentWidget, AccentTheme } from './components/ThemeAccentWidget';
import { CustomCursor } from './components/CustomCursor';
import { PreLoader } from './components/PreLoader';
import { ScrollProgress } from './components/ScrollProgress';
import { StickyNav } from './components/StickyNav';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [currentTheme, setCurrentTheme] = useState<AccentTheme>('pink');

  const handleNavClick = (target: string) => {
    if (target === 'contact') {
      setIsContactOpen(true);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLiveProjectClick = (projectName: string) => {
    setSelectedProject(projectName);
    setIsProjectDetailsOpen(true);
  };

  return (
    <>
      {/* Cinematic Pre-loader */}
      {isLoading && <PreLoader onComplete={() => setIsLoading(false)} />}

      <div className="relative w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip select-none font-sans antialiased">
        {/* Top scroll progress bar */}
        <ScrollProgress />

        {/* Sticky mini-nav (appears on scroll past hero) */}
        <StickyNav
          onContactClick={() => setIsContactOpen(true)}
          onNavClick={handleNavClick}
        />

        {/* Custom physics cursor */}
        <CustomCursor currentTheme={currentTheme} />

        {/* 1. Hero */}
        <HeroSection
          currentTheme={currentTheme}
          onContactClick={() => setIsContactOpen(true)}
          onNavClick={handleNavClick}
        />

        {/* 2. Marquee */}
        <MarqueeSection />

        {/* 3. Stats counter band */}
        <StatsSection />

        {/* 4. About */}
        <AboutSection
          currentTheme={currentTheme}
          onContactClick={() => setIsContactOpen(true)}
        />

        {/* 5. Services */}
        <ServicesSection />

        {/* 6. Projects */}
        <ProjectsSection onLiveProjectClick={handleLiveProjectClick} />

        {/* 7. Testimonials carousel */}
        <TestimonialsSection />

        {/* 8. Footer */}
        <Footer onContactClick={() => setIsContactOpen(true)} />

        {/* Theme picker floating widget */}
        <ThemeAccentWidget
          currentTheme={currentTheme}
          onChangeTheme={(theme) => setCurrentTheme(theme)}
        />

        {/* Modals */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        <ProjectDetailsModal
          isOpen={isProjectDetailsOpen}
          onClose={() => setIsProjectDetailsOpen(false)}
          projectName={selectedProject}
        />
      </div>
    </>
  );
}

export { App };
