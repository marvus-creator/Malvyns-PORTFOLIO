import { forwardRef, type CSSProperties } from 'react';
import type { Door as DoorData, Pattern } from '../data/doors';

function ReliefPattern({ id, pattern }: { id: string; pattern: Pattern }) {
  const shapes: Record<Pattern, { w: number; h: number; d: string; dots?: [number, number][] }> = {
    chevron: { w: 20, h: 14, d: 'M0 11 L5 3 L10 11 L15 3 L20 11' },
    diamond: { w: 20, h: 20, d: 'M10 1 L19 10 L10 19 L1 10 Z M10 6 L14 10 L10 14 L6 10 Z' },
    lozenge: { w: 24, h: 24, d: 'M12 1 L23 12 L12 23 L1 12 Z M12 5 L19 12 L12 19 L5 12 Z M12 9 L15 12 L12 15 L9 12 Z' },
    grid: { w: 22, h: 22, d: 'M0 11 H7 V4 H22 M11 22 V15 H18 V11', dots: [[7, 11], [18, 11], [11, 15]] },
    triangle: { w: 20, h: 18, d: 'M0 17 L10 1 L20 17 Z M10 17 L15 9 L5 9 Z' },
  };
  const s = shapes[pattern];
  return (
    <pattern id={id} width={s.w} height={s.h} patternUnits="userSpaceOnUse">
      <g fill="none" strokeWidth="1.6" strokeLinejoin="round">
        <path d={s.d} stroke="rgba(0,0,0,.45)" transform="translate(.9 .9)" />
        <path d={s.d} stroke="rgba(255,255,255,.2)" />
      </g>
      {s.dots?.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="rgba(255,240,200,.35)" />
      ))}
    </pattern>
  );
}

interface Props {
  door: DoorData;
  active: boolean;
  onOpen: () => void;
  onHover: (on: boolean) => void;
  onFocus: () => void;
}

const Door = forwardRef<HTMLButtonElement, Props>(function Door({ door, active, onOpen, onHover, onFocus }, ref) {
  const style = { '--c': door.color, '--deep': door.deep, '--light': door.light } as CSSProperties;
  const pid = `relief-${door.slug}`;
  return (
    <button
      ref={ref}
      type="button"
      className={`door-unit ${active ? 'is-active' : ''}`}
      style={style}
      data-door={door.slug}
      data-cursor="Enter"
      onClick={onOpen}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onFocus={onFocus}
      aria-label={`Door ${door.no}: ${door.title}. ${door.tagline} Open this door.`}
    >
      <span className="sconce" aria-hidden="true" />
      <span className="sconce-lamp" aria-hidden="true" />
      <span className="door-frame block" aria-hidden="true">
        <span className="door-transom">
          <span className="mx-auto">N° {door.no}</span>
        </span>
        <span className="door-portal block" data-door-portal={door.slug}>
          <span className="door-leaf block">
            <span className="leaf-face block">
              <span className="relief block">
                <svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <ReliefPattern id={pid} pattern={door.pattern} />
                  </defs>
                  <rect width="100" height="160" fill={`url(#${pid})`} />
                </svg>
              </span>
              <span className="plate">{door.plate}</span>
              <span className="handle" />
              <span className="kick" />
            </span>
            <span className="leaf-edge block" />
            <span className="leaf-back block" />
          </span>
        </span>
        <span className="spill" />
      </span>
      <span className="door-caption theme-fixed" aria-hidden="true">
        <span className="eyebrow block text-[0.62rem] text-paper/55">Door {door.no}</span>
        <span className="mt-1 block font-display text-[clamp(1rem,1.3vw,1.25rem)] font-semibold leading-tight">{door.title}</span>
      </span>
    </button>
  );
});

export default Door;
