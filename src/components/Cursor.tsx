import { useEffect, useRef } from 'react';
import { gsap, finePointer, reducedMotion } from '../lib/motion';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const d = dot.current!;
    const r = ring.current!;
    d.style.display = r.style.display = '';
    const dx = gsap.quickTo(d, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(d, 'y', { duration: 0.08 });
    const rx = gsap.quickTo(r, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(r, 'y', { duration: 0.45, ease: 'power3.out' });
    let current = '';
    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      const next = target?.dataset.cursor ?? '';
      if (next !== current) {
        current = next;
        r.classList.toggle('has-label', !!next);
        if (label.current) label.current.textContent = next;
        gsap.to(d, { scale: next ? 0 : 1, duration: 0.25 });
      }
    };
    const down = () => gsap.to(r, { scale: 0.85, duration: 0.15 });
    const up = () => gsap.to(r, { scale: 1, duration: 0.3 });
    const out = () => gsap.to([d, r], { opacity: 0, duration: 0.2 });
    const over = () => gsap.to([d, r], { opacity: 1, duration: 0.2 });
    const reset = () => {
      current = '';
      r.classList.remove('has-label');
      if (label.current) label.current.textContent = '';
      gsap.to(d, { scale: 1, duration: 0.25 });
    };
    window.addEventListener('hashchange', reset);
    window.addEventListener('room:exited', reset);
    window.addEventListener('cursor:reset', reset);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', out);
    document.documentElement.addEventListener('pointerenter', over);
    return () => {
      window.removeEventListener('hashchange', reset);
      window.removeEventListener('room:exited', reset);
      window.removeEventListener('cursor:reset', reset);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', out);
      document.documentElement.removeEventListener('pointerenter', over);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ display: 'none' }} aria-hidden="true" />
      <div ref={ring} className="cursor-ring" style={{ display: 'none' }} aria-hidden="true">
        <span ref={label} />
      </div>
    </>
  );
}
