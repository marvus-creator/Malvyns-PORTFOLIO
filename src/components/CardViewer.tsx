import { useEffect, useRef, useState } from 'react';
import { gsap, reducedMotion, lockScroll, unlockScroll, finePointer } from '../lib/motion';
import cardPhoto from '../assets/portrait/portrait-card.webp';
import portrait from '../assets/portrait/portrait.webp';
import AbilityCard from './AbilityCard';

function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    const rm = reducedMotion();
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const count = Math.round(Math.min(90, (w * h) / 16000));
    const parts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.6 + 0.6,
      vy: Math.random() * 0.35 + 0.08,
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.6 + 0.2,
      p: Math.random() * Math.PI * 2,
      warm: Math.random() > 0.25,
    }));
    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const pt of parts) {
        if (!rm) {
          pt.y -= pt.vy;
          pt.x += pt.vx + Math.sin(t / 1400 + pt.p) * 0.12;
          if (pt.y < -10) {
            pt.y = h + 10;
            pt.x = Math.random() * w;
          }
        }
        const flicker = rm ? 1 : 0.65 + Math.sin(t / 300 + pt.p) * 0.35;
        const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.r * 4);
        const c = pt.warm ? '232,138,64' : '201,161,90';
        g.addColorStop(0, `rgba(${c},${pt.a * flicker})`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!rm) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden="true" />;
}

export default function CardViewer({ closing, onClose, onExited }: { closing: boolean; onClose: () => void; onExited: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => setScale(Math.max(0.8, Math.min(1.35, (window.innerHeight * 0.66) / 470, (window.innerWidth * 0.86) / 330)));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    const el = root.current!;
    lockScroll();
    window.dispatchEvent(new Event('cursor:reset'));
    closeBtn.current?.focus({ preventScroll: true });
    const rm = reducedMotion();
    const imgs = [cardPhoto, portrait].map(
      (src) =>
        new Promise<void>((res) => {
          const i = new Image();
          i.onload = i.onerror = () => res();
          i.src = src;
        }),
    );
    const state = { v: 0 };
    const tl = gsap.timeline({ paused: true });
    tl.to(state, {
      v: 100,
      duration: rm ? 0.2 : 1.7,
      ease: 'power1.inOut',
      onUpdate: () => {
        const v = Math.round(state.v);
        if (pct.current) pct.current.textContent = `${v}%`;
        if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})`;
      },
    })
      .to(el.querySelector('.cv-loader'), { opacity: 0, y: -16, duration: rm ? 0 : 0.45, ease: 'power2.in' }, '+=0.15')
      .add(() => setLoaded(true));
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: rm ? 0 : 0.5, ease: 'power2.out' });
    gsap.fromTo(el.querySelectorAll('.cv-name span'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.035, ease: 'power3.out', delay: 0.15 });
    let cancelled = false;
    Promise.all(imgs).then(() => {
      if (!cancelled) tl.play();
    });
    return () => {
      cancelled = true;
      tl.kill();
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = root.current!;
    const rm = reducedMotion();
    gsap.fromTo(
      el.querySelector('.cv-card'),
      { opacity: 0, scale: 0.6, rotateY: -200, y: 60 },
      { opacity: 1, scale: 1, rotateY: 0, y: 0, duration: rm ? 0 : 1.6, ease: 'expo.out' },
    );
    gsap.fromTo(el.querySelector('.cv-glow'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: rm ? 0 : 1.8, ease: 'expo.out' });
    gsap.fromTo(el.querySelectorAll('.cv-chrome'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, delay: rm ? 0 : 0.6, ease: 'power3.out' });
  }, [loaded]);

  useEffect(() => {
    if (!closing) return;
    const t = gsap.to(root.current, { opacity: 0, duration: reducedMotion() ? 0 : 0.45, ease: 'power2.in', onComplete: onExited });
    return () => {
      t.kill();
    };
  }, [closing, onExited]);

  return (
    <div
      ref={root}
      className="theme-fixed fixed inset-0 z-[75] overflow-hidden text-paper"
      style={{ background: 'radial-gradient(60% 55% at 50% 45%, #2a1e17 0%, #120d0a 55%, #050404 100%)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Nkusi Malvyn's ability card"
      data-lenis-prevent
    >
      <Embers />

      <button
        ref={closeBtn}
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-11 items-center gap-2 rounded-full border border-paper/15 bg-black/50 px-5 text-sm font-semibold backdrop-blur transition-colors hover:bg-paper hover:text-ink sm:right-6 sm:top-6"
      >
        <span aria-hidden="true">✕</span> Close
      </button>

      {!loaded && (
        <div className="cv-loader absolute inset-0 grid place-items-center">
          <div className="w-[min(78vw,340px)]">
            <p className="cv-name text-center font-display text-lg font-semibold tracking-[0.42em]" aria-label="Nkusi Malvyn">
              {'NKUSI MALVYN'.split('').map((c, i) => (
                <span key={i} className="inline-block" aria-hidden="true">
                  {c === ' ' ? ' ' : c}
                </span>
              ))}
            </p>
            <span className="mt-5 block h-px w-full bg-paper/15">
              <span ref={bar} className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-clay-2 to-brass" />
            </span>
            <p className="mt-3 flex items-center justify-between font-mono text-[0.68rem] tracking-[0.22em] text-paper/55">
              <span>LOADING THE CARD</span>
              <span ref={pct} className="text-brass tabular-nums">
                0%
              </span>
            </p>
          </div>
        </div>
      )}

      {loaded && (
        <>
          <div className="cv-chrome absolute left-5 top-5 z-10 sm:left-8 sm:top-7">
            <p className="font-display text-sm font-semibold tracking-[0.38em]">NKUSI MALVYN</p>
            <p className="mt-1 font-display text-sm italic text-paper/55">Ability card</p>
          </div>
          <div className="absolute inset-0 grid place-items-center pb-10" style={{ perspective: 1600 }}>
            <div className="cv-glow pointer-events-none absolute size-[min(90vw,620px)] rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,104,61,.35), rgba(201,161,90,.12) 40%, transparent 68%)' }} aria-hidden="true" />
            <div className="cv-card relative">
              <AbilityCard scale={scale} hint={false} />
            </div>
          </div>
          <p className="cv-chrome absolute inset-x-0 bottom-6 px-4 text-center font-mono text-[0.66rem] tracking-[0.28em] text-paper/60">
            {finePointer() ? 'HOVER TO TILT · DRAG TO ROTATE · DOUBLE-CLICK TO FLIP' : 'DRAG TO ROTATE · DOUBLE-TAP TO FLIP'}
          </p>
        </>
      )}
    </div>
  );
}
