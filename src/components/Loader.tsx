import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import portrait from '../assets/portrait/portrait.webp';

export default function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current!;
    const seen = sessionStorage.getItem('nm-seen') === '1';
    if (reducedMotion()) {
      onReveal();
      gsap.to(el, { opacity: 0, duration: 0.3, onComplete: onDone });
      return;
    }
    const assets = Promise.all([
      document.fonts.ready,
      new Promise<void>((res) => {
        const img = new Image();
        img.onload = img.onerror = () => res();
        img.src = portrait;
      }),
    ]);
    const progress = { v: 0 };
    const minTime = seen ? 0.5 : 1.6;
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        sessionStorage.setItem('nm-seen', '1');
        onDone();
      },
    });
    tl.to(progress, {
      v: 100,
      duration: minTime,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(progress.v)).padStart(3, '0');
      },
    })
      .fromTo(el.querySelectorAll('.ld-draw'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: minTime * 0.9, ease: 'power2.inOut', stagger: 0.08 }, 0)
      .fromTo(el.querySelector('.ld-glow'), { opacity: 0 }, { opacity: 1, duration: minTime * 0.6 }, minTime * 0.4)
      .add('open')
      .to(el.querySelector('.ld-leaf'), { rotateY: 78, duration: 0.7, ease: 'power2.inOut' }, 'open')
      .to(el.querySelector('.ld-meta'), { opacity: 0, y: 12, duration: 0.35 }, 'open')
      .to(el.querySelector('.ld-door'), { scale: 9, opacity: 0, duration: 0.9, ease: 'power3.in' }, 'open+=0.3')
      .to(el.querySelector('.ld-left'), { xPercent: -100, duration: 0.95, ease: 'expo.inOut' }, 'open+=0.55')
      .to(el.querySelector('.ld-right'), { xPercent: 100, duration: 0.95, ease: 'expo.inOut' }, 'open+=0.55')
      .add(() => onReveal(), 'open+=0.6');

    let cancelled = false;
    Promise.race([assets, new Promise((r) => setTimeout(r, 4000))]).then(() => {
      if (!cancelled) tl.play();
    });
    return () => {
      cancelled = true;
      tl.kill();
    };
  }, [onReveal, onDone]);

  return (
    <div ref={root} className="theme-fixed fixed inset-0 z-[95] text-paper" aria-hidden="true">
      <div className="ld-left absolute inset-y-0 left-0 w-1/2 bg-night" />
      <div className="ld-right absolute inset-y-0 right-0 w-1/2 bg-night" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="ld-door relative" style={{ perspective: 600 }}>
          <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="overflow-visible">
            <defs>
              <radialGradient id="ldg" cx="50%" cy="60%" r="60%">
                <stop offset="0" stopColor="#ffd9a8" />
                <stop offset="1" stopColor="#a8471f" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect className="ld-glow" x="12" y="12" width="96" height="188" fill="url(#ldg)" />
            <path className="ld-draw" pathLength={1} strokeDasharray="1" d="M4 200V4h112v196" stroke="#eee8dd" strokeWidth="2" />
            <path className="ld-draw" pathLength={1} strokeDasharray="1" d="M0 200h120" stroke="#eee8dd" strokeWidth="2" />
          </svg>
          <div className="ld-leaf absolute origin-left" style={{ left: 12, top: 12, width: 96, height: 188, background: 'linear-gradient(90deg,#24262c,#1b1c21)', boxShadow: 'inset 0 0 0 1px rgba(238,232,221,.25)' }}>
            <span className="absolute right-3 top-1/2 h-8 w-1.5 rounded bg-brass" />
          </div>
        </div>
      </div>
      <div className="ld-meta absolute inset-x-0 bottom-0 flex items-end justify-between px-[var(--gutter)] pb-8">
        <div>
          <p className="eyebrow text-paper/50">Opening the door</p>
          <p className="font-display text-[clamp(3.5rem,10vw,8rem)] font-bold leading-none tracking-tight">
            <span ref={count}>000</span>
          </p>
        </div>
        <p className="eyebrow pb-3 text-right text-paper/50">
          Nkusi Malvyn
          <br />
          Kigali, Rwanda
        </p>
      </div>
    </div>
  );
}
