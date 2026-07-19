import React from 'react';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export type AccentTheme = 'pink' | 'emerald' | 'cyan' | 'orange';

interface ThemeAccentWidgetProps {
  currentTheme: AccentTheme;
  onChangeTheme: (theme: AccentTheme) => void;
}

export const ThemeAccentWidget: React.FC<ThemeAccentWidgetProps> = ({
  currentTheme,
  onChangeTheme,
}) => {
  const themesList: { key: AccentTheme; label: string; color: string; gradient: string }[] = [
    {
      key: 'pink',
      label: 'Nebula Pink',
      color: '#B600A8',
      gradient: 'linear-gradient(135deg, #18011F 0%, #B600A8 100%)',
    },
    {
      key: 'cyan',
      label: 'Cyber Cyan',
      color: '#00b6a3',
      gradient: 'linear-gradient(135deg, #011f1c 0%, #00b6a3 100%)',
    },
    {
      key: 'emerald',
      label: 'Matrix Emerald',
      color: '#00b615',
      gradient: 'linear-gradient(135deg, #011f05 0%, #00b615 100%)',
    },
    {
      key: 'orange',
      label: 'Volcanic Gold',
      color: '#b65f00',
      gradient: 'linear-gradient(135deg, #1f0c01 0%, #b65f00 100%)',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#151515]/90 backdrop-blur-md border border-[#D7E2EA]/15 px-3 py-2.5 rounded-full shadow-2xl select-none"
    >
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/70 pl-2">
        <Palette className="w-3.5 h-3.5" />
        <span className="hidden md:inline">Theme:</span>
      </div>

      <div className="flex gap-2">
        {themesList.map((t) => (
          <button
            key={t.key}
            onClick={() => onChangeTheme(t.key)}
            className={`w-6 h-6 rounded-full cursor-pointer relative transition-all duration-300 hover:scale-110 flex items-center justify-center`}
            style={{
              background: t.gradient,
              boxShadow: currentTheme === t.key ? `0 0 12px ${t.color}` : 'none',
              border: currentTheme === t.key ? '2px solid white' : '1px solid rgba(215, 226, 234, 0.2)',
            }}
            title={t.label}
          >
            {currentTheme === t.key && (
              <motion.div
                layoutId="activeThemeDot"
                className="w-1.5 h-1.5 rounded-full bg-white"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ThemeAccentWidget;
