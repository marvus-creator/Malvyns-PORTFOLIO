import React from 'react';
import { ArrowUp, Ghost } from 'lucide-react';
import { Magnet } from './Magnet';
import { FadeIn } from './FadeIn';

const socials = {
  instagram: 'https://www.instagram.com/itsm4rvus',
  snapchat: 'https://www.snapchat.com/add/marvus_333',
  github: 'https://github.com/marvus-creator',
  linkedin: 'https://www.linkedin.com/in/nkusi-malvyn-bb218b3a6',
};

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-10 py-12 md:py-16 border-t border-[#D7E2EA]/10 z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 md:gap-14">
        {/* Top Row: Call to Action & Scroll to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 border-b border-[#D7E2EA]/10 pb-10 md:pb-14">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <FadeIn delay={0} y={15} duration={0.8}>
              <span className="text-xs uppercase tracking-widest opacity-60 font-semibold">
                Available for Freelance & Contract
              </span>
            </FadeIn>
            <FadeIn delay={0.1} y={15} duration={0.8}>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Let&apos;s start a project
              </h3>
            </FadeIn>
            <FadeIn delay={0.2} y={15} duration={0.8} className="mt-2">
              <button
                onClick={onContactClick}
                className="text-xs uppercase tracking-widest font-bold border-b-2 border-white pb-1 hover:opacity-75 transition-opacity cursor-pointer"
              >
                Inquire Now
              </button>
            </FadeIn>
            <FadeIn delay={0.3} y={15} duration={0.8} className="mt-1">
              <a
                href="mailto:malvyn304@gmail.com"
                className="text-sm tracking-wider opacity-60 hover:opacity-100 transition-opacity"
              >
                malvyn304@gmail.com
              </a>
            </FadeIn>
          </div>

          {/* Scroll to Top Button */}
          <FadeIn delay={0.3} y={15} duration={0.8} className="flex-shrink-0">
            <Magnet
              padding={60}
              strength={2}
              className="flex items-center justify-center cursor-pointer"
            >
              <button
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-[#D7E2EA]" />
              </button>
            </Magnet>
          </FadeIn>
        </div>

        {/* Middle Row: Big Name & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Big Name */}
          <FadeIn delay={0} y={20} duration={0.8}>
            <h2 className="hero-heading font-black text-6xl sm:text-7xl tracking-tighter uppercase select-none">
              Malvyn
            </h2>
          </FadeIn>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-wider font-medium">
            {/* Instagram */}
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="hidden sm:inline">Instagram</span>
            </a>

            {/* Snapchat */}
            <a
              href={socials.snapchat}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Ghost className="w-4 h-4" strokeWidth={2} />
              <span className="hidden sm:inline">Snapchat</span>
            </a>

            {/* GitHub */}
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-50 tracking-wider text-center sm:text-left">
          <span>&copy; {currentYear} MALVYN. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED & DEVELOPED WITH PASSION</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
