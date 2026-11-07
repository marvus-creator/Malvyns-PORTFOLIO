import { useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from 'react';
import { gsap, finePointer, reducedMotion, ScrollTrigger } from '../lib/motion';

export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}

export function Arrow({ className = 'size-4', dir = 'right' }: { className?: string; dir?: 'right' | 'left' | 'up' | 'down' | 'ne' }) {
  const rot = { right: 0, down: 90, left: 180, up: -90, ne: -45 }[dir];
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ transform: `rotate(${rot}deg)` }} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function SplitLines({
  lines,
  className = '',
  as: Tag = 'h2',
  stagger = 0.08,
  delay = 0,
  scroll = true,
  style,
}: {
  lines: string[];
  className?: string;
  as?: ElementType;
  stagger?: number;
  delay?: number;
  scroll?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const inner = el.querySelectorAll('.mask > span');
    gsap.set(inner, { yPercent: 110, rotation: 4 });
    const anim = () =>
      gsap.to(inner, { yPercent: 0, rotation: 0, duration: 1.1, ease: 'expo.out', stagger, delay });
    if (!scroll) {
      const t = anim();
      return () => {
        t.kill();
      };
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => anim() });
    return () => st.kill();
  }, [stagger, delay, scroll]);
  return (
    <Tag ref={ref} className={className} style={style}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          <span className="mask">
            <span>{l}</span>
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({ children, className = '', y = 40, delay = 0 }: { children: ReactNode; className?: string; y?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    gsap.set(el, { y, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay }),
    });
    return () => st.kill();
  }, [y, delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function ScrubWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const words = el.querySelectorAll('span');
    const tween = gsap.fromTo(
      words,
      { opacity: 0.16 },
      { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </p>
  );
}

export function GitHubIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function useKigaliTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Kigali', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const tick = () => {
      if (ref.current) ref.current.textContent = fmt();
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return ref;
}
