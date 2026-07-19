import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Custom scroll listener targeting the paragraph element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center`} style={style}>
      {characters.map((char, i) => (
        <Character
          key={i}
          char={char}
          index={i}
          total={characters.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
};

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const Character: React.FC<CharacterProps> = ({ char, index, total, progress }) => {
  // Distribute the characters' scroll ranges across the scroll progress.
  // We use a slight overlap to make the transition look fluid and organic.
  const start = index / total;
  const end = Math.min(1, (index + 2) / total); 

  // Map the scroll progress from 0.2 opacity to 1.0 opacity
  const opacity = useTransform(progress, [0, start, end, 1], [0.2, 0.2, 1, 1]);

  // Uses invisible placeholder + absolute positioned animated span to prevent layout shifting
  return (
    <span className="relative inline-block select-none whitespace-pre">
      <span className="opacity-0">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        {char}
      </motion.span>
    </span>
  );
};

export default AnimatedText;
