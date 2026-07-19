import React, { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  scrambleChars?: string;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  duration = 1500,
  delay = 0,
  scrambleChars = DEFAULT_CHARS,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = Date.now() + delay;
    const finalChars = text.split('');
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = finalChars.map((c) => {
      const charStart = Math.floor(Math.random() * (duration * 0.4));
      const charEnd = charStart + Math.floor(Math.random() * (duration * 0.4)) + duration * 0.2;
      return {
        from: scrambleChars[Math.floor(Math.random() * scrambleChars.length)],
        to: c,
        start: charStart,
        end: charEnd,
      };
    });

    // Initialize with random scramble
    setDisplayText(finalChars.map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]).join(''));

    const tick = () => {
      const elapsed = Date.now() - start;
      let output = '';
      let complete = 0;

      queue.forEach((entry) => {
        if (elapsed < entry.start) {
          output += entry.from;
        } else if (elapsed >= entry.end) {
          complete++;
          output += entry.to;
        } else {
          // Re-scramble while in transition
          if (!entry.char || Math.random() < 0.28) {
            entry.char = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
          output += entry.char;
        }
      });

      setDisplayText(output);

      if (complete < queue.length) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, Math.max(0, delay));

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, duration, delay, scrambleChars]);

  return <span className={className}>{displayText}</span>;
};

export default ScrambleText;
