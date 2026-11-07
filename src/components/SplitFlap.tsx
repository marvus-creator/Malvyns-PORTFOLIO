import { useEffect, useRef, useState } from 'react';
import { reducedMotion } from '../lib/motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function SplitFlap({ words, interval = 3400, start = true, at }: { words: string[]; interval?: number; start?: boolean; at?: number }) {
  const [auto, setIndex] = useState(0);
  const index = at ?? auto;
  const [chars, setChars] = useState<string[]>(() => words[0].toUpperCase().split(''));
  const tiles = useRef<(HTMLSpanElement | null)[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!start || at !== undefined || reducedMotion()) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [start, interval, words.length, at]);

  useEffect(() => {
    const target = words[index].toUpperCase().split('');
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (reducedMotion()) {
      setChars(target);
      return;
    }
    setChars((prev) => {
      const len = target.length;
      return Array.from({ length: len }, (_, i) => (target[i] === ' ' ? ' ' : prev[i] && prev[i] !== ' ' ? prev[i] : GLYPHS[i % GLYPHS.length]));
    });
    target.forEach((ch, i) => {
      if (ch === ' ') return;
      const spins = 2 + Math.floor(Math.random() * 4);
      for (let s = 0; s <= spins; s++) {
        const t = window.setTimeout(() => {
          const el = tiles.current[i];
          if (el) {
            el.classList.remove('flip');
            void el.offsetWidth;
            el.classList.add('flip');
          }
          setChars((prev) => {
            const next = [...prev];
            next[i] = s === spins ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            return next;
          });
        }, i * 28 + s * 75);
        timers.current.push(t);
      }
    });
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, [index, words]);

  const groups: { ch: string; i: number }[][] = [[]];
  chars.forEach((ch, i) => {
    if (words[index][i] === ' ') groups.push([]);
    else groups[groups.length - 1].push({ ch, i });
  });

  return (
    <span className="inline-flex flex-wrap gap-x-[0.38em] gap-y-[0.18em]">
      <span className="sr-only">{words[index]}</span>
      {groups.map((g, gi) => (
        <span key={gi} className="inline-flex gap-[0.07em]" aria-hidden="true">
          {g.map(({ ch, i }) => (
            <span key={i} ref={(el) => void (tiles.current[i] = el)} className="flap">
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
