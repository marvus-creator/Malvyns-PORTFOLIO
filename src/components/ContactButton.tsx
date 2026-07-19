import React from 'react';
import { AccentTheme } from './ThemeAccentWidget';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  theme?: AccentTheme;
}

const themeStyles: Record<
  AccentTheme,
  { gradient: string; shadow: string; outline: string }
> = {
  pink: {
    gradient: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    shadow: '0px 4px 15px rgba(181, 1, 167, 0.3), inset 4px 4px 12px #7721B1',
    outline: '2px solid white',
  },
  cyan: {
    gradient: 'linear-gradient(123deg, #011f1c 7%, #00b6a3 37%, #007bb0 72%, #00be6c 100%)',
    shadow: '0px 4px 15px rgba(0, 182, 163, 0.3), inset 4px 4px 12px #007bb0',
    outline: '2px solid white',
  },
  emerald: {
    gradient: 'linear-gradient(123deg, #011f05 7%, #00b615 37%, #5d9016 72%, #be6900 100%)',
    shadow: '0px 4px 15px rgba(0, 182, 21, 0.3), inset 4px 4px 12px #5d9016',
    outline: '2px solid white',
  },
  orange: {
    gradient: 'linear-gradient(123deg, #1f0c01 7%, #b65f00 37%, #b02121 72%, #be00a5 100%)',
    shadow: '0px 4px 15px rgba(182, 95, 0, 0.3), inset 4px 4px 12px #b02121',
    outline: '2px solid white',
  },
};

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  theme = 'pink',
}) => {
  const currentStyle = themeStyles[theme] || themeStyles.pink;

  return (
    <button
      onClick={onClick}
      className={`relative rounded-full font-medium uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
      style={{
        background: currentStyle.gradient,
        boxShadow: currentStyle.shadow,
        outline: currentStyle.outline,
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  );
};

export default ContactButton;
