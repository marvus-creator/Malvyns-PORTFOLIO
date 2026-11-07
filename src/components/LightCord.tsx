import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { gsap, reducedMotion } from '../lib/motion';
import { currentTheme, setTheme, type Theme } from '../lib/theme';

const MAX_PULL = 110;
const TRIGGER = 38;

export default function LightCord({ hidden }: { hidden: boolean }) {
  const swing = useRef<HTMLDivElement>(null);
  const rope = useRef<HTMLSpanElement>(null);
  const bob = useRef<HTMLButtonElement>(null);
  const [theme, setThemeState] = useState<Theme>(() => currentTheme());
  const pull = useRef({ v: 0 });
  const sway = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const on = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail);
    window.addEventListener('themechange', on);
    return () => window.removeEventListener('themechange', on);
  }, []);

  useEffect(() => {
    if (reducedMotion()) return;
    gsap.set(swing.current, { rotation: -1.4 });
    sway.current = gsap.to(swing.current, { rotation: 1.4, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    return () => {
      sway.current?.kill();
    };
  }, []);

  const render = () => {
    const v = pull.current.v;
    if (rope.current) rope.current.style.transform = `scaleY(${1 + v / 96})`;
    if (bob.current) bob.current.style.transform = `translateY(${v}px)`;
  };

  const toggle = () => {
    const b = bob.current!.getBoundingClientRect();
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next, { x: b.left + b.width / 2, y: b.top + b.height / 2 });
  };

  const release = (fired: boolean, kick = 0) => {
    const rm = reducedMotion();
    gsap.to(pull.current, { v: 0, duration: rm ? 0 : 1.1, ease: 'elastic.out(1, 0.32)', onUpdate: render });
    if (!rm) {
      sway.current?.pause();
      gsap.fromTo(
        swing.current,
        { rotation: kick || (fired ? 7 : 3) * (Math.random() > 0.5 ? 1 : -1) },
        { rotation: 0, duration: 1.8, ease: 'elastic.out(1, 0.25)', onComplete: () => void sway.current?.restart() },
      );
    }
  };

  useEffect(() => {
    const el = bob.current!;
    let startY = 0;
    let startX = 0;
    let t0 = 0;
    let active = false;
    const down = (e: PointerEvent) => {
      active = true;
      startY = e.clientY;
      startX = e.clientX;
      t0 = performance.now();
      gsap.killTweensOf(pull.current);
      el.setPointerCapture(e.pointerId);
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!active) return;
      const dy = Math.max(0, e.clientY - startY);
      pull.current.v = MAX_PULL * (1 - Math.exp(-dy / MAX_PULL));
      render();
      if (!reducedMotion()) gsap.set(swing.current, { rotation: Math.max(-8, Math.min(8, (startX - e.clientX) * 0.08)) });
    };
    const up = (e: PointerEvent) => {
      if (!active) return;
      active = false;
      const pulled = pull.current.v;
      const tap = pulled < 4 && performance.now() - t0 < 350;
      const fired = pulled > TRIGGER || tap;
      if (fired) toggle();
      release(fired, Math.max(-8, Math.min(8, (startX - e.clientX) * 0.08)));
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (reducedMotion()) {
      toggle();
      return;
    }
    gsap.to(pull.current, {
      v: 62,
      duration: 0.28,
      ease: 'power2.in',
      onUpdate: render,
      onComplete: () => {
        toggle();
        release(true);
      },
    });
  };

  const dark = theme === 'dark';

  return (
    <div
      className={`pointer-events-none fixed right-[12px] top-0 z-[55] w-8 transition-opacity duration-500 sm:right-[16px] ${hidden ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden={hidden || undefined}
    >
      <div ref={swing} className="relative flex origin-top flex-col items-center">
        <span ref={rope} className="cord-rope block h-[104px] w-[3px] origin-top max-sm:h-[92px]" />
        <button
          ref={bob}
          type="button"
          onKeyDown={onKey}
          tabIndex={hidden ? -1 : 0}
          aria-pressed={dark}
          aria-label={dark ? 'Pull the cord to switch on the lights (light mode)' : 'Pull the cord to switch off the lights (dark mode)'}
          title={dark ? 'Lights on' : 'Lights off'}
          data-cursor="Pull"
          className="cord-bob pointer-events-auto relative -mt-px block cursor-grab touch-none active:cursor-grabbing"
        >
          <span className="cord-cap block" />
          <span className="cord-wood block" />
        </button>
      </div>
    </div>
  );
}
