import { useEffect, useRef } from 'react';
import { gsap, reducedMotion, lockScroll, unlockScroll } from '../lib/motion';
import { projectBySlug, projects, flagships, type Project } from '../data/projects';
import { navigate } from '../lib/route';
import ProjectCover from './ProjectCover';
import { ProjectLinks, useRevealIn } from './Room';
import { Arrow, Magnetic } from './ui';

export default function WorkPanel({ slug, room, closing, onExited, onClose }: { slug: string; room?: string; closing: boolean; onExited: () => void; onClose: () => void }) {
  const p = projectBySlug(slug) as Project;
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const pool = flagships.some((f) => f.slug === slug) ? flagships : projects;
  const next = pool[(pool.findIndex((x) => x.slug === slug) + 1) % pool.length];

  useRevealIn(root, slug);

  useEffect(() => {
    const el = root.current!;
    lockScroll();
    el.scrollTop = 0;
    const rm = reducedMotion();
    const tl = gsap.timeline({ onComplete: () => heading.current?.focus({ preventScroll: true }) });
    if (rm) tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    else
      tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
        .fromTo(el.querySelectorAll('.wk-title .mask > span'), { yPercent: 115 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06 }, 0.45)
        .fromTo(el.querySelectorAll('.wk-in'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.05 }, 0.6)
        .fromTo(el.querySelector('.wk-hero img, .wk-hero [role=img]'), { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0.3);
    return () => {
      tl.kill();
      unlockScroll();
    };
  }, [slug]);

  useEffect(() => {
    if (!closing) return;
    const el = root.current!;
    const tl = reducedMotion()
      ? gsap.to(el, { opacity: 0, duration: 0.2, onComplete: onExited })
      : gsap.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut', onComplete: onExited });
    return () => {
      tl.kill();
    };
  }, [closing, onExited]);

  const title = p.name.split(/(?<=-)|\s/).filter(Boolean);

  return (
    <div ref={root} className="work-panel" role="dialog" aria-modal="true" aria-labelledby="work-title" data-lenis-prevent>
      <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-ink/10 bg-paper/85 px-[var(--gutter)] py-3 backdrop-blur-md">
        <Magnetic>
          <button onClick={onClose} className="btn btn-dark h-11 pl-2 pr-5 text-sm" data-cursor="Back">
            <span className="btn-dot size-8 rotate-180">
              <Arrow />
            </span>
            {room ? 'Back to the room' : 'Close'}
          </button>
        </Magnetic>
        <p className="eyebrow hidden text-mute sm:block">Case study · {p.name}</p>
        <ProjectLinks project={p} dark={false} />
      </div>

      <header className="mx-auto max-w-[1400px] px-[var(--gutter)] pb-10 pt-[7vh]">
        <p className="wk-in eyebrow flex flex-wrap gap-x-4 gap-y-1 text-mute">
          <span style={{ color: p.tone }}>● {p.kind}</span>
          <span>{p.year}</span>
          <span>{p.status}</span>
        </p>
        <h1 id="work-title" ref={heading} tabIndex={-1} className="wk-title mt-5 font-display font-bold uppercase leading-[0.86] tracking-[-0.035em] outline-none" style={{ fontSize: 'clamp(3.2rem, 11vw, 10.5rem)' }}>
          {title.map((w, i) => (
            <span key={i} className="mask mr-[0.15em]">
              <span>{w}</span>
            </span>
          ))}
        </h1>
        <p className="wk-in mt-6 max-w-3xl font-display text-[clamp(1.4rem,2.6vw,2.3rem)] font-medium leading-tight">{p.headline}</p>
      </header>

      <div className="wk-hero mx-auto max-w-[1400px] px-[var(--gutter)]">
        <div className="aspect-[16/9] overflow-hidden rounded-[22px] bg-paper-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,.5)]">
          <ProjectCover project={p} eager />
        </div>
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-[var(--gutter)] py-20 lg:grid-cols-12">
        <dl className="room-reveal space-y-6 lg:col-span-4">
          <div>
            <dt className="eyebrow text-mute">My part</dt>
            <dd className="mt-2 leading-relaxed">{p.role}</dd>
          </div>
          <div>
            <dt className="eyebrow text-mute">Stack</dt>
            <dd className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <div className="space-y-12 lg:col-span-7 lg:col-start-6">
          <div className="room-reveal">
            <h2 className="eyebrow text-clay">The problem</h2>
            <p className="mt-3 text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed">{p.problem}</p>
          </div>
          <div className="room-reveal">
            <h2 className="eyebrow text-clay">What I built</h2>
            <p className="mt-3 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-ink-2">{p.approach}</p>
          </div>
          <div className="room-reveal">
            <h2 className="eyebrow text-clay">Highlights</h2>
            <ul className="mt-4">
              {p.features.map((f, i) => (
                <li key={f} className="flex gap-5 border-t border-ink/10 py-4">
                  <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, '0')}</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {p.images.length > 1 && (
        <section className="mx-auto grid max-w-[1400px] gap-6 px-[var(--gutter)] pb-24 md:grid-cols-2" aria-label={`${p.name} screenshots`}>
          {p.images.slice(1).map((_, i) => (
            <div key={i} className="room-reveal aspect-[16/10] overflow-hidden rounded-[18px] bg-paper-3">
              <ProjectCover project={p} index={i + 1} />
            </div>
          ))}
        </section>
      )}

      <footer className="border-t border-ink/10">
        <button
          onClick={() => navigate({ room, work: next.slug }, { replace: true })}
          className="group mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-[var(--gutter)] py-16 text-left"
          data-cursor="Next"
        >
          <span>
            <span className="eyebrow block text-mute">Next case study</span>
            <span className="mt-2 block font-display text-[clamp(2.4rem,7vw,6rem)] font-bold uppercase leading-none tracking-tight transition-transform duration-700 group-hover:translate-x-3">
              {next.name}
            </span>
          </span>
          <span className="grid size-16 flex-none place-items-center rounded-full border border-ink/25 transition-colors group-hover:bg-ink group-hover:text-paper sm:size-24">
            <Arrow className="size-6" />
          </span>
        </button>
      </footer>
    </div>
  );
}
