import React from 'react';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { InteractiveCanvas } from './InteractiveCanvas';
import { SoundToggle } from './SoundToggle';
import { ScrambleText } from './ScrambleText';
import { AccentTheme } from './ThemeAccentWidget';
import { audioSynth } from '../utils/audio';

interface HeroSectionProps {
  currentTheme: AccentTheme;
  onContactClick: () => void;
  onNavClick: (target: string) => void;
}

const themeColors: Record<AccentTheme, string> = {
  pink: '#B600A8',
  cyan: '#00b6a3',
  emerald: '#00b615',
  orange: '#b65f00',
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  onContactClick,
  onNavClick,
}) => {
  const accentColor = themeColors[currentTheme];

  const handleNavHover = () => {
    audioSynth.playTick();
  };

  const handleNavClick = (target: string) => {
    audioSynth.playClick();
    onNavClick(target);
  };

  const handleContactClick = () => {
    audioSynth.playClick();
    onContactClick();
  };

  const handlePortraitHover = () => {
    audioSynth.playTick();
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-[#0C0C0C]">
      {/* Interactive Background Particles */}
      <InteractiveCanvas accentColor={accentColor} />

      {/* Navbar */}
      <FadeIn delay={0} y={-20} duration={0.8} as="header" className="z-30 w-full">
        <nav className="w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <div className="flex gap-6 sm:gap-10">
            <button
              onClick={() => handleNavClick('about')}
              onMouseEnter={handleNavHover}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
              data-cursor="ABOUT"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('services')}
              onMouseEnter={handleNavHover}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
              data-cursor="SERVICES"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              onMouseEnter={handleNavHover}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
              data-cursor="PROJECTS"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              onMouseEnter={handleNavHover}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
              data-cursor="CONTACT"
            >
              Contact
            </button>
          </div>

          {/* Sound Synthesizer Controller Toggle */}
          <SoundToggle />
        </nav>
      </FadeIn>

      {/* Hero Portrait - Absolute Positioned */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] pointer-events-none">
        <FadeIn delay={0.6} y={30} duration={0.9} className="w-full h-full">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="pointer-events-auto w-full h-full flex justify-center items-end"
          >
            <div 
              onMouseEnter={handlePortraitHover}
              className="w-full h-full"
              data-cursor="MALVYN"
            >
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Malvyn Portrait"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_15px_45px_rgba(0,0,0,0.6)] contrast-[1.05] saturate-[1.1]"
                draggable="false"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Hero Heading */}
      <div className="flex-1 flex items-center justify-center z-0 px-4 select-none pointer-events-none">
        <div className="overflow-hidden w-full text-center">
          <FadeIn delay={0.15} y={40} duration={0.9} as="div">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
              i&apos;m malvyn
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20 relative">
        <FadeIn delay={0.35} y={20} duration={0.8} className="max-w-[160px] sm:max-w-[240px] md:max-w-[300px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <ScrambleText
              text="AVAILABLE FOR HIRE · Q2 2026"
              className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400"
              duration={1800}
              delay={1200}
            />
          </div>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-left" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            a software developer driven by crafting striking, high-performance, and unforgettable digital architectures
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} duration={0.8}>
          <div onMouseEnter={handleNavHover}>
            <ContactButton onClick={handleContactClick} theme={currentTheme} className="cursor-pointer" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
