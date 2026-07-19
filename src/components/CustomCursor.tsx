import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { AccentTheme } from './ThemeAccentWidget';

interface CustomCursorProps {
  currentTheme: AccentTheme;
}

const themeColors: Record<AccentTheme, string> = {
  pink: '#B600A8',
  cyan: '#00b6a3',
  emerald: '#00b615',
  orange: '#b65f00',
};

export const CustomCursor: React.FC<CustomCursorProps> = ({ currentTheme }) => {
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Position motion values with spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or ancestor has data-cursor attributes
      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const color = themeColors[currentTheme];

  return (
    <motion.div
      ref={cursorRef}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: '-50%',
        y: '-50%',
        borderColor: color,
        boxShadow: cursorText ? `0 0 20px ${color}55` : 'none',
      }}
      className={`fixed top-0 left-0 z-50 pointer-events-none rounded-full border flex items-center justify-center transition-all duration-300 ${
        cursorText 
          ? 'w-16 h-16 bg-black/60 border-2 scale-100' 
          : 'w-6 h-6 bg-transparent border border-white/30 scale-100'
      }`}
      animate={{
        scale: cursorText ? 1.1 : 1,
      }}
    >
      {cursorText && (
        <span className="text-[9px] font-bold font-mono tracking-wider text-white uppercase select-none">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
