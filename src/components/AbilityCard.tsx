import { useEffect, useRef, type KeyboardEvent } from 'react';
import { gsap, reducedMotion, finePointer } from '../lib/motion';
import cardPhoto from '../assets/portrait/portrait-card.webp';
import { abilities } from '../data/skills';

export default function AbilityCard({ scale = 1, hint = true, className = '' }: { scale?: number; hint?: boolean; className?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const spin = useRef({ y: 0 });
  const flipTo = useRef<(deg: number) => void>(() => {});

  useEffect(() => {
    const st = stage.current!;
    const c = card.current!;
    const rm = reducedMotion();
    const tiltX = gsap.quickTo(c, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const tiltZ = gsap.quickTo(c, 'rotation', { duration: 0.6, ease: 'power3.out' });
    const turnY = gsap.quickTo(c, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const setY = (v: number) => {
      spin.current.y = v;
      turnY(v, v);
      c.style.setProperty('--rot', String(v));
    };
    flipTo.current = (deg: number) => {
      gsap.to(spin.current, {
        y: deg,
        duration: rm ? 0 : 1.1,
        ease: 'elastic.out(1, 0.6)',
        onUpdate: () => setY(spin.current.y),
      });
    };
    let dragging = false;
    let moved = 0;
    let startX = 0;
    let startY = 0;
    let lastTap = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      startX = e.clientX;
      startY = spin.current.y;
      gsap.killTweensOf(spin.current);
      st.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      const r = st.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', `${nx * 100}%`);
      c.style.setProperty('--my', `${ny * 100}%`);
      if (!rm) {
        tiltX((0.5 - ny) * 18);
        tiltZ((nx - 0.5) * 3);
      }
      if (dragging) {
        const dx = e.clientX - startX;
        moved = Math.max(moved, Math.abs(dx));
        if (moved > 6) setY(startY + dx * 0.7);
      } else if (!rm) {
        if (!gsap.isTweening(spin.current)) turnY(spin.current.y + (nx - 0.5) * 22);
      }
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      if (moved > 6) {
        flipTo.current(Math.round(spin.current.y / 180) * 180);
        return;
      }
      const now = performance.now();
      if (now - lastTap < 340) {
        lastTap = 0;
        flipTo.current(Math.round(spin.current.y / 180) * 180 + 180);
      } else lastTap = now;
    };
    const leave = () => {
      tiltX(0);
      tiltZ(0);
      if (!dragging && !gsap.isTweening(spin.current)) turnY(spin.current.y);
    };
    st.addEventListener('pointerdown', down);
    st.addEventListener('pointermove', move);
    st.addEventListener('pointerup', up);
    st.addEventListener('pointercancel', up);
    st.addEventListener('pointerleave', leave);
    return () => {
      st.removeEventListener('pointerdown', down);
      st.removeEventListener('pointermove', move);
      st.removeEventListener('pointerup', up);
      st.removeEventListener('pointercancel', up);
      st.removeEventListener('pointerleave', leave);
    };
  }, []);

  const flipKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipTo.current(Math.round(spin.current.y / 180) * 180 + 180);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        ref={stage}
        className="relative touch-pan-y select-none py-6"
        style={{ perspective: 1400, transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: '50% 50%' }}
        data-cursor="Drag"
        role="button"
        tabIndex={0}
        aria-label="Ability card of Nkusi Malvyn. Press Enter to flip it over."
        onKeyDown={flipKey}
      >
        <div ref={card} className="theme-fixed ability-card relative h-[min(124vw,470px)] w-[min(86vw,330px)]">
          <div className="ability-face bg-night text-paper shadow-[0_50px_80px_-30px_rgba(0,0,0,.6)]">
            <img src={cardPhoto} alt="Portrait of Nkusi Malvyn" className="absolute inset-x-0 top-0 h-[64%] w-full object-cover object-[50%_20%]" draggable={false} />
            <div className="absolute inset-x-0 top-[34%] h-[31%] bg-gradient-to-b from-transparent to-night" />
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-full bg-night/80 font-display text-xs font-bold backdrop-blur">NM</span>
              <span className="rounded-full bg-night/70 px-3 py-1 font-mono text-[0.6rem] tracking-[0.2em] backdrop-blur">ABILITY CARD</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-[1.9rem] font-bold leading-none tracking-tight">Nkusi Malvyn</p>
              <p className="mt-1 text-sm text-paper/60">Software developer</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-paper/15 pt-3 text-[0.7rem]">
                <div>
                  <dt className="font-mono text-[0.55rem] tracking-[0.18em] text-paper/45">CLASS</dt>
                  <dd className="mt-0.5 font-semibold">Systems builder</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.55rem] tracking-[0.18em] text-paper/45">BASE</dt>
                  <dd className="mt-0.5 font-semibold">Kigali, RW</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.55rem] tracking-[0.18em] text-paper/45">SINCE</dt>
                  <dd className="mt-0.5 font-semibold">Jan 2026</dd>
                </div>
              </dl>
            </div>
            <div className="imigongo-band absolute bottom-0 left-0 right-0 h-1.5 opacity-90" />
            <div className="holo" />
          </div>
          <div className="ability-face bg-clay text-paper" style={{ transform: 'rotateY(180deg)' }}>
            <div className="imigongo-band absolute inset-0 opacity-[.13]" />
            <div className="relative flex h-full flex-col p-6">
              <p className="font-mono text-[0.6rem] tracking-[0.22em] text-paper/70">ABILITIES</p>
              <ul className="mt-4 flex-1 space-y-4">
                {abilities.map((a) => (
                  <li key={a.name}>
                    <p className="font-display text-lg font-bold leading-tight">{a.name}</p>
                    <p className="mt-0.5 text-[0.82rem] leading-snug text-paper/80">{a.text}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-night/25 p-3 text-[0.78rem] leading-snug">
                <span className="font-mono text-[0.55rem] tracking-[0.2em] text-paper/60">SIGNATURE MOVE</span>
                <p className="mt-1 font-semibold">Five systems, one platform: GAIA.</p>
              </div>
            </div>
            <div className="holo" />
          </div>
        </div>
      </div>
      {hint && (
        <p className="eyebrow mt-2 text-center text-[0.62rem] text-mute">
          {finePointer() ? 'Hover to tilt · Drag to rotate · Double-click to flip' : 'Drag to rotate · Double-tap to flip'}
        </p>
      )}
    </div>
  );
}
