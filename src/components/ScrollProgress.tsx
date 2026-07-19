import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-500 z-[60] origin-left shadow-[0_0_10px_rgba(182,0,168,0.5)]"
    />
  );
};

export default ScrollProgress;
