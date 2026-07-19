import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface StickyNavProps {
  onContactClick: () => void;
  onNavClick: (target: string) => void;
}

const sections = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
];

export const StickyNav: React.FC<StickyNavProps> = ({ onContactClick, onNavClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight * 0.8);

      // Detect active section
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const sectionEls = sections
        .map((s) => ({ id: s.id, el: s.id === 'top' ? null : document.getElementById(s.id) }))
        .filter((s) => s.el || s.id === 'top');

      let current = 'top';
      sectionEls.forEach((s) => {
        if (s.el) {
          const rect = s.el.getBoundingClientRect();
          const absTop = rect.top + window.scrollY;
          if (scrollPos >= absTop) {
            current = s.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavClick(id);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-[#0C0C0C]/90 backdrop-blur-xl border border-[#D7E2EA]/15 rounded-full pl-3 pr-1.5 py-1.5 shadow-2xl"
        >
          {/* Brand */}
          <button
            onClick={() => handleClick('top')}
            className="text-xs font-black uppercase tracking-widest text-[#D7E2EA] hover:text-fuchsia-400 transition-colors px-2 cursor-pointer"
          >
            M.
          </button>

          <div className="w-px h-5 bg-[#D7E2EA]/15" />

          {/* Section links */}
          <div className="hidden sm:flex items-center gap-1">
            {sections.slice(1).map((s) => (
              <button
                key={s.id}
                onClick={() => handleClick(s.id)}
                className={`relative text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  activeSection === s.id
                    ? 'text-white'
                    : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'
                }`}
              >
                {activeSection === s.id && (
                  <motion.div
                    layoutId="stickyNavActive"
                    className="absolute inset-0 bg-fuchsia-500/20 border border-fuchsia-500/40 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px h-5 bg-[#D7E2EA]/15" />

          {/* CTA */}
          <button
            onClick={onContactClick}
            className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-white bg-fuchsia-600 hover:bg-fuchsia-500 px-3 py-1.5 rounded-full transition-all cursor-pointer group"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyNav;
