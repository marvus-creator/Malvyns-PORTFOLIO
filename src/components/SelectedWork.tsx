import { useEffect, useRef, useState } from 'react';
import { gsap, finePointer, reducedMotion } from '../lib/motion';
import { flagships } from '../data/projects';
import { navigate } from '../lib/route';
import { Arrow, SplitLines, Reveal } from './ui';

export default function SelectedWork() {
  const list = useRef<HTMLUListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const pv = preview.current!;
    gsap.set(pv, { scale: 0 });
    const xTo = gsap.quickTo(pv, 'x', { duration: 0.7, ease: 'power3.out' });
    const yTo = gsap.quickTo(pv, 'y', { duration: 0.7, ease: 'power3.out' });
    const rTo = gsap.quickTo(pv, 'rotation', { duration: 0.9, ease: 'power3.out' });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rTo(Math.max(-12, Math.min(12, (e.clientX - lastX) * 0.6)));
      lastX = e.clientX;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    gsap.to(preview.current, { scale: hover === null ? 0 : 1, opacity: hover === null ? 0 : 1, duration: 0.5, ease: 'expo.out' });
    if (hover !== null) {
      preview.current!.querySelectorAll<HTMLElement>('.pv-img').forEach((img, i) => {
        gsap.to(img, { yPercent: (i - hover) * 100, duration: 0.7, ease: 'expo.inOut' });
      });
    }
  }, [hover]);

  return (
    <section id="work" className="relative bg-paper px-[var(--gutter)] py-[clamp(6rem,12vw,10rem)]" aria-labelledby="work-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3 text-clay">
              <span className="inline-block h-px w-8 bg-current" /> Selected work
            </p>
            <SplitLines
              lines={['Products, not', 'repositories.']}
              className="font-display text-[clamp(2.6rem,6.4vw,6rem)] font-bold leading-[0.92] tracking-[-0.03em]"
            />
            <span id="work-title" className="sr-only">
              Selected work
            </span>
          </div>
          <Reveal>
            <button onClick={() => navigate({ room: 'projects' })} className="btn btn-ghost">
              Open the full archive
            </button>
          </Reveal>
        </div>

        <ul ref={list} onPointerLeave={() => setHover(null)} className="border-t border-ink/15">
          {flagships.map((p, i) => (
            <li key={p.slug} className="border-b border-ink/15">
              <button
                onClick={() => navigate({ work: p.slug })}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(null)}
                className="group grid w-full grid-cols-12 items-center gap-4 py-6 text-left md:py-8"
                data-cursor="View"
              >
                <span className="col-span-2 font-mono text-xs text-mute md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="col-span-10 md:col-span-6">
                  <span className="block font-display text-[clamp(2rem,5.4vw,4.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] transition-[transform,color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 group-hover:text-clay">
                    {p.name}
                  </span>
                </span>
                <span className="col-span-10 col-start-3 text-sm text-ink-2 md:col-span-3 md:col-start-auto">{p.headline}</span>
                <span className="col-span-12 flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
                  <span className="eyebrow text-[0.62rem] text-mute md:hidden lg:inline">{p.kind}</span>
                  <span className="grid size-11 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:-rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <Arrow />
                  </span>
                </span>
                <span className="col-span-12 mt-2 block aspect-[16/9] overflow-hidden rounded-xl md:hidden">
                  <img src={p.images[0]} alt="" className="size-full object-cover object-top" loading="lazy" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[260px] w-[380px] overflow-hidden rounded-2xl opacity-0 shadow-2xl md:block"
        style={{ marginLeft: -190, marginTop: -130 }}
      >
        {flagships.map((p, i) => (
          <img key={p.slug} src={p.images[0]} alt="" className="pv-img absolute inset-0 size-full object-cover object-top" style={{ transform: `translateY(${i * 100}%)` }} loading="lazy" />
        ))}
      </div>
    </section>
  );
}
