import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { gsap, ScrollTrigger, reducedMotion, lockScroll, unlockScroll, scrollToTarget } from '../lib/motion';
import { doors } from '../data/doors';
import { navigate, setDoorRect } from '../lib/route';
import Door from './Door';

export interface ExitDetail {
  slug: string;
  rect: DOMRect | null;
}

const OPEN_ANGLE = 84;
const HOVER_ANGLE = 17;

export default function Corridor() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const unitRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trigger = useRef<ScrollTrigger | null>(null);
  const opening = useRef<string | null>(null);
  const openSlug = useRef<string | null>(null);
  const holdingLock = useRef(false);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  const leafOf = (i: number) => unitRefs.current[i]?.querySelector<HTMLElement>('.door-leaf') ?? null;
  const indexOf = (slug: string) => doors.findIndex((d) => d.slug === slug);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const tr = track.current!;
      const distance = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const mid = self.progress * distance() + window.innerWidth / 2;
            let best = 0;
            let bestD = Infinity;
            unitRefs.current.forEach((u, i) => {
              if (!u) return;
              const host = u.parentElement as HTMLElement;
              const d = Math.abs(host.offsetLeft + host.offsetWidth / 2 - mid);
              if (d < bestD) {
                bestD = d;
                best = i;
              }
            });
            setActive(best);
          },
        },
      });
      const wallTween = gsap.to(section.current!.querySelector('.wall'), {
        backgroundPositionX: '-30vw',
        ease: 'none',
        scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
      });
      trigger.current = tween.scrollTrigger ?? null;
      setPinned(true);
      return () => {
        trigger.current = null;
        setPinned(false);
        wallTween.scrollTrigger?.kill();
        wallTween.kill();
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (pinned) return;
    const tr = track.current!;
    const onScroll = () => {
      const mid = tr.getBoundingClientRect().left + tr.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      unitRefs.current.forEach((u, i) => {
        if (!u) return;
        const r = u.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    tr.addEventListener('scroll', onScroll, { passive: true });
    return () => tr.removeEventListener('scroll', onScroll);
  }, [pinned]);

  const hover = useCallback((i: number, on: boolean) => {
    const slug = doors[i].slug;
    if (opening.current || openSlug.current === slug) return;
    const unit = unitRefs.current[i];
    gsap.to(leafOf(i), { rotateY: on ? HOVER_ANGLE : 0, duration: on ? 0.7 : 0.55, ease: on ? 'power3.out' : 'power2.inOut' });
    gsap.to(unit, { '--glow': on ? 0.75 : 0.25, duration: 0.5 });
  }, []);

  const bringIntoView = useCallback(
    (i: number) => {
      const unit = unitRefs.current[i];
      if (!unit) return;
      const st = trigger.current;
      if (st) {
        const tr = track.current!;
        const distance = tr.scrollWidth - window.innerWidth;
        const center = unit.offsetLeft + unit.offsetWidth / 2 - window.innerWidth / 2;
        const p = Math.min(1, Math.max(0, center / distance));
        scrollToTarget(st.start + p * (st.end - st.start));
      } else {
        unit.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
      }
    },
    [],
  );

  const open = useCallback((i: number) => {
    if (opening.current) return;
    const door = doors[i];
    const unit = unitRefs.current[i]!;
    const portal = unit.querySelector<HTMLElement>('.door-portal')!;
    const rect = portal.getBoundingClientRect();
    setDoorRect(rect);
    opening.current = door.slug;
    openSlug.current = door.slug;
    lockScroll();
    holdingLock.current = true;
    const rm = reducedMotion();
    const st = stage.current!;
    const sr = st.getBoundingClientRect();
    const ox = rect.left + rect.width / 2 - sr.left;
    const oy = rect.top + rect.height / 2 - sr.top;
    const tl = gsap.timeline({
      onComplete: () => {
        opening.current = null;
      },
    });
    tl.to(unit, { '--glow': 1, duration: 0.4 }, 0)
      .to(leafOf(i), { rotateY: OPEN_ANGLE, duration: rm ? 0 : 0.95, ease: 'power2.inOut' }, 0)
      .to(st, { scale: rm ? 1 : 1.85, transformOrigin: `${ox}px ${oy}px`, duration: rm ? 0 : 1.15, ease: 'power2.in' }, 0.28)
      .add(() => navigate({ room: door.slug }), rm ? 0.05 : 0.62);
  }, []);

  useEffect(() => {
    const onEntered = () => {
      if (holdingLock.current) {
        holdingLock.current = false;
        unlockScroll();
      }
    };
    const onExiting = (e: Event) => {
      const detail = (e as CustomEvent<ExitDetail>).detail;
      const i = indexOf(detail.slug);
      if (i < 0) return;
      const st = stage.current!;
      unitRefs.current.forEach((_, j) => {
        if (j !== i) {
          gsap.set(leafOf(j), { rotateY: 0 });
          gsap.set(unitRefs.current[j], { '--glow': 0.25 });
        }
      });
      gsap.set(leafOf(i), { rotateY: OPEN_ANGLE });
      gsap.set(unitRefs.current[i], { '--glow': 1 });
      gsap.killTweensOf(st);
      gsap.set(st, { scale: 1 });
      const portal = unitRefs.current[i]!.querySelector<HTMLElement>('.door-portal')!;
      const r = portal.getBoundingClientRect();
      const visible = r.right > 0 && r.left < window.innerWidth && r.bottom > 0 && r.top < window.innerHeight;
      detail.rect = visible ? r : null;
      if (visible && !reducedMotion()) {
        const sr = st.getBoundingClientRect();
        const ox = r.left + r.width / 2 - sr.left;
        const oy = r.top + r.height / 2 - sr.top;
        gsap.fromTo(st, { scale: 1.85, transformOrigin: `${ox}px ${oy}px` }, { scale: 1, duration: 1, ease: 'power3.out' });
      }
      openSlug.current = detail.slug;
    };
    const onExited = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      const i = indexOf(slug);
      openSlug.current = null;
      opening.current = null;
      if (i < 0) return;
      const rm = reducedMotion();
      gsap
        .timeline()
        .to(leafOf(i), { rotateY: 0, duration: rm ? 0 : 0.75, ease: 'power2.in' })
        .to(unitRefs.current[i], { '--glow': 0.25, duration: 0.4 }, '<0.2')
        .fromTo(unitRefs.current[i]!.querySelector('.door-frame'), { x: 0 }, { x: rm ? 0 : 2, duration: 0.05, repeat: 3, yoyo: true, ease: 'none' })
        .add(() => unitRefs.current[i]?.focus({ preventScroll: true }));
    };
    window.addEventListener('room:entered', onEntered);
    window.addEventListener('room:exiting', onExiting);
    window.addEventListener('room:exited', onExited);
    return () => {
      window.removeEventListener('room:entered', onEntered);
      window.removeEventListener('room:exiting', onExiting);
      window.removeEventListener('room:exited', onExited);
    };
  }, []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = Math.min(doors.length - 1, Math.max(0, active + (e.key === 'ArrowRight' ? 1 : -1)));
    unitRefs.current[next]?.focus({ preventScroll: true });
    bringIntoView(next);
  };

  const d = doors[active];

  return (
    <section ref={section} id="corridor" className="corridor overflow-clip" aria-labelledby="corridor-title" onKeyDown={onKey}>
      <div ref={stage} className="corridor-stage">
        <div className="wall" aria-hidden="true" />
        <div className="floor" aria-hidden="true" />
        <div className="skirting" aria-hidden="true" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden items-start justify-between px-[var(--gutter)] pt-[calc(var(--nav-h)+1rem)] min-[900px]:flex">
          <div />
          <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-paper/80 px-4 py-2 text-xs backdrop-blur">
            <span className="font-mono tabular-nums">
              {d.no} <span className="text-mute">/ 0{doors.length}</span>
            </span>
            <span className="flex gap-1.5">
              {doors.map((x, i) => (
                <button
                  key={x.slug}
                  onClick={() => bringIntoView(i)}
                  aria-label={`Walk to door ${x.no}: ${x.title}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-clay' : 'w-1.5 bg-ink/25 hover:bg-ink/50'}`}
                />
              ))}
            </span>
            <span className="hidden font-medium xl:inline">{d.short}</span>
          </div>
        </div>

        <div className="px-[var(--gutter)] pb-2 pt-24 min-[900px]:hidden">
          <p className="eyebrow mb-3 text-clay">The corridor</p>
          <p className="font-display text-[2.6rem] font-bold leading-[0.95] tracking-tight">Five doors. One developer.</p>
          <p className="mt-3 text-ink-2">Each door opens into a part of my world. Swipe along the wall, then tap a door to step inside.</p>
          <div className="mt-5 flex items-center gap-3 text-xs text-mute">
            <span className="font-mono tabular-nums text-ink">
              {d.no} / 0{doors.length}
            </span>
            <span className="flex gap-1.5">
              {doors.map((x, i) => (
                <button key={x.slug} onClick={() => bringIntoView(i)} aria-label={`Show door ${x.no}: ${x.title}`} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-clay' : 'w-1.5 bg-ink/25'}`} />
              ))}
            </span>
            <span>{d.short}</span>
          </div>
        </div>
        <div ref={track} className="track">
          <div className="relative flex w-[min(86vw,460px)] flex-none flex-col justify-end self-stretch pb-[6vh] pl-[var(--gutter)] pr-[6vw] max-[899px]:hidden">
            <p className="eyebrow mb-4 text-clay">The corridor</p>
            <h2 id="corridor-title" className="font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-bold leading-[0.95] tracking-tight">
              Five doors.
              <br />
              One developer.
            </h2>
            <p className="mt-5 max-w-sm text-ink-2">
              Each door opens into a part of my world. {pinned ? 'Scroll to walk the corridor' : 'Swipe along the wall'}, then step inside.
            </p>
            <p className="mt-6 hidden items-center gap-2 text-xs text-mute min-[900px]:flex">
              <kbd className="rounded border border-ink/20 px-1.5 py-0.5 font-mono">←</kbd>
              <kbd className="rounded border border-ink/20 px-1.5 py-0.5 font-mono">→</kbd> to walk ·
              <kbd className="rounded border border-ink/20 px-1.5 py-0.5 font-mono">Enter</kbd> to open
            </p>
          </div>

          {doors.map((door, i) => (
            <div key={door.slug} className="flex flex-none items-end min-[900px]:mx-[4.5vw]">
              <Door
                ref={(el) => void (unitRefs.current[i] = el)}
                door={door}
                active={i === active}
                onOpen={() => open(i)}
                onHover={(on) => hover(i, on)}
                onFocus={() => setActive(i)}
              />
            </div>
          ))}

          <div className="flex w-[min(80vw,420px)] flex-none flex-col justify-end self-stretch pb-[6vh] pl-[6vw] pr-[var(--gutter)] max-[899px]:w-[70vw] max-[899px]:self-end max-[899px]:pb-0">
            <p className="eyebrow mb-3 text-mute">End of the corridor</p>
            <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-tight">
              Behind every door is real work you can open, read and run.
            </p>
            <button onClick={() => scrollToTarget('work')} className="mt-5 self-start text-sm font-semibold text-clay link-u">
              Keep walking ↓
            </button>
          </div>
        </div>

        <div className="theme-fixed absolute inset-x-0 bottom-[7svh] z-10 hidden justify-center min-[900px]:flex" aria-live="polite">
          <p className="max-w-xl px-6 text-center text-sm italic text-paper/75">“{d.tagline}”</p>
        </div>
      </div>
    </section>
  );
}
