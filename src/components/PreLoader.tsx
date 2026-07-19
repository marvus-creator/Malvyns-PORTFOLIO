import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreLoaderProps {
  onComplete: () => void;
}

export const PreLoader: React.FC<PreLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 900);
        }, 250);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0C0C0C] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Center reveal block */}
          <div className="relative flex flex-col items-center gap-8 z-10">
            {/* Brand mark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#D7E2EA]/50 font-bold"
            >
              <span className="w-8 h-[1px] bg-[#D7E2EA]/30" />
              <span>Initializing Workspace</span>
              <span className="w-8 h-[1px] bg-[#D7E2EA]/30" />
            </motion.div>

            {/* Name reveal with mask */}
            <div className="relative overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="hero-heading font-black uppercase leading-none tracking-tighter text-[18vw] sm:text-[14vw] md:text-[10rem]"
              >
                MALVYN
              </motion.h1>
              {/* Sliding overlay bar */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '110%' }}
                transition={{ duration: 1, delay: 1.0, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-fuchsia-500/40 mix-blend-overlay"
              />
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D7E2EA]/60 font-medium"
            >
              Software Developer · Creative Engineer
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-12 left-0 right-0 px-8 md:px-16 flex flex-col gap-3 z-10"
          >
            <div className="flex justify-between items-end text-[10px] uppercase tracking-[0.3em] font-bold text-[#D7E2EA]/60 font-mono">
              <span>Loading Assets</span>
              <span className="text-2xl md:text-3xl text-white font-black tabular-nums">
                {String(progress).padStart(3, '0')}%
              </span>
            </div>
            <div className="w-full h-[2px] bg-[#D7E2EA]/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Top status text */}
          <div className="absolute top-8 left-8 text-[10px] uppercase tracking-[0.3em] font-bold text-[#D7E2EA]/40 font-mono flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>system_online</span>
          </div>
          <div className="absolute top-8 right-8 text-[10px] uppercase tracking-[0.3em] font-bold text-[#D7E2EA]/40 font-mono">
            v2026.1.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;
