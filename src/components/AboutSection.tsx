import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { TelemetryDashboard } from './TelemetryDashboard';
import { AccentTheme } from './ThemeAccentWidget';
import { audioSynth } from '../utils/audio';

interface AboutSectionProps {
  currentTheme: AccentTheme;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentTheme, onContactClick }) => {
  const handleContactHover = () => {
    audioSynth.playTick();
  };

  const handleContactClick = () => {
    audioSynth.playClick();
    onContactClick();
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* 4 Decorative 3D images in corners with gentle floating animations */}
      {/* Top-left Moon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Decor"
            className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
            draggable="false"
          />
        </motion.div>
      </FadeIn>

      {/* Bottom-left 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Abstract Shape Decor"
            className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
            draggable="false"
          />
        </motion.div>
      </FadeIn>

      {/* Top-right Lego Icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Decor"
            className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
            draggable="false"
          />
        </motion.div>
      </FadeIn>

      {/* Bottom-right 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:left-auto md:right-[10%] z-0 w-[130px] sm:w-[220px] pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Decor"
            className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
            draggable="false"
          />
        </motion.div>
      </FadeIn>

      {/* Content Container */}
      <div className="flex flex-col items-center text-center z-10 max-w-5xl w-full px-4 gap-12 sm:gap-16">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Dynamic Split Layout: Bio + Telemetry Dashboard */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 xl:gap-16 w-full justify-between mt-4">
          {/* Bio text block with scroll reveal */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left flex-1 max-w-[500px]">
            <AnimatedText
              text="I'm Malvyn, a software developer from Rwanda building technology that solves real problems — satellite credit scoring for farmers, real-time collaborative maps, disaster early-warning digital twins, and on-device AI that works offline in the field. I care about software that performs beautifully and reaches everyone, from flagship browsers to feature phones. Let's build something incredible together!"
              className="text-[#D7E2EA] font-medium leading-relaxed text-center lg:text-left"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            />

            <FadeIn
              delay={0.4}
              y={20}
              duration={0.8}
              className="mt-10 sm:mt-12 hidden lg:block"
            >
              <div onMouseEnter={handleContactHover}>
                <ContactButton onClick={handleContactClick} theme={currentTheme} />
              </div>
            </FadeIn>
          </div>

          {/* Interactive Live Telemetry Console */}
          <FadeIn
            delay={0.2}
            y={30}
            duration={0.9}
            className="w-full lg:w-auto flex justify-center items-center"
          >
            <TelemetryDashboard />
          </FadeIn>
        </div>

        {/* Mobile Contact Button */}
        <FadeIn delay={0.4} y={20} duration={0.8} className="block lg:hidden mt-4">
          <div onMouseEnter={handleContactHover}>
            <ContactButton onClick={handleContactClick} theme={currentTheme} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
