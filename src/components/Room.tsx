import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { gsap, reducedMotion, lockScroll, unlockScroll } from '../lib/motion';
import { doors, doorBySlug, type Door } from '../data/doors';
import { projects, projectBySlug, type Project, type DoorSlug } from '../data/projects';
import { getDoorRect, setDoorRect, navigate } from '../lib/route';
import type { ExitDetail } from './Corridor';
import ProjectCover from './ProjectCover';
import Pipeline from './Pipeline';
import { Arrow, GitHubIcon, Magnetic } from './ui';

const insetFrom = (r: DOMRect | null) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (!r) return `inset(${vh * 0.42}px ${vw * 0.42}px ${vh * 0.42}px ${vw * 0.42}px)`;
  return `inset(${r.top}px ${vw - r.right}px ${vh - r.bottom}px ${r.left}px)`;
};

export function useRevealIn(root: RefObject<HTMLElement | null>, dep: unknown) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { root: el, threshold: 0.12 },
    );
    el.querySelectorAll('.room-reveal').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [root, dep]);
}

export function ProjectLinks({ project, dark = true }: { project: Project; dark?: boolean }) {
  const base = dark ? 'border-white/25 hover:bg-white hover:text-ink' : 'border-ink/20 hover:bg-ink hover:text-paper';
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer" className={`chip h-10 gap-2 px-4 transition-colors ${base}`}>
          <GitHubIcon className="size-3.5" /> Code
        </a>
      )}
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" className={`chip h-10 gap-2 px-4 transition-colors ${base}`}>
          Live site <Arrow dir="ne" className="size-3.5" />
        </a>
      )}
      {project.note && <span className={`text-xs ${dark ? 'text-white/50' : 'text-mute'}`}>{project.note}</span>}
    </div>
  );
}

function ProjectRow({ project, i, room }: { project: Project; i: number; room: string }) {
  const flip = i % 2 === 1;
  return (
    <article className="room-reveal grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <button
        onClick={() => navigate({ room, work: project.slug })}
        className={`group relative aspect-[16/10] overflow-hidden rounded-[18px] bg-black/30 shadow-2xl lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
        data-cursor="View"
        aria-label={`Open the ${project.name} case study`}
      >
        <ProjectCover project={project} className="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>
      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <p className="eyebrow flex flex-wrap gap-x-3 text-white/55">
          <span>{String(i + 1).padStart(2, '0')}</span>
          <span>{project.kind}</span>
          <span>· {project.status}</span>
        </p>
        <h3 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight">{project.name}</h3>
        <p className="mt-3 text-lg text-white/85">{project.headline}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">{project.problem}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <span key={s} className="chip border-white/20 text-white/75">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button onClick={() => navigate({ room, work: project.slug })} className="btn btn-light">
              Read the case study
              <span className="btn-dot">
                <Arrow />
              </span>
            </button>
          </Magnetic>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

const filters: { id: 'all' | DoorSlug; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'full-stack', label: 'Full-stack' },
  { id: 'systems', label: 'Systems' },
  { id: 'ai', label: 'AI & innovation' },
  { id: 'embedded', label: 'Embedded' },
];

function Archive() {
  const [f, setF] = useState<(typeof filters)[number]['id']>('all');
  const list = useMemo(() => projects.filter((p) => p.repo || p.live || p.note).filter((p) => f === 'all' || p.doors.includes(f)), [f]);
  return (
    <div>
      <div className="room-reveal mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((x) => (
          <button
            key={x.id}
            onClick={() => setF(x.id)}
            aria-pressed={f === x.id}
            className={`chip h-10 px-4 transition-colors ${f === x.id ? 'border-transparent bg-white text-ink' : 'border-white/25 text-white/80 hover:border-white/60'}`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p, i) => (
          <li key={p.slug} className="room-reveal is-in" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
            <button onClick={() => navigate({ room: 'projects', work: p.slug })} className="group block w-full text-left" data-cursor="View">
              <span className="block aspect-[4/3] overflow-hidden rounded-2xl bg-black/30">
                <ProjectCover project={p} className="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl font-bold tracking-tight">{p.name}</span>
                <span className="font-mono text-xs text-white/50">{p.year}</span>
              </span>
              <span className="mt-1 block text-sm text-white/65">{p.headline}</span>
              <span className="eyebrow mt-3 block text-[0.62rem] text-white/45">
                {p.kind} · {p.status}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Room({ slug, closing, onExited, onClose }: { slug: string; closing: boolean; onExited: () => void; onClose: () => void }) {
  const door = doorBySlug(slug) as Door;
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const locked = useRef(false);
  const idx = doors.findIndex((d) => d.slug === slug);
  const next = doors[(idx + 1) % doors.length];
  const list = door.projects.map((s) => projectBySlug(s)).filter(Boolean) as Project[];

  useRevealIn(root, slug);

  useEffect(() => {
    const el = root.current!;
    lockScroll();
    locked.current = true;
    window.dispatchEvent(new CustomEvent('room:entered', { detail: slug }));
    const rect = getDoorRect();
    const clear = window.setTimeout(() => setDoorRect(null), 0);
    el.scrollTop = 0;
    const rm = reducedMotion();
    const ins = el.querySelectorAll('.room-in');
    const masks = el.querySelectorAll('.room-title .mask > span');
    const tl = gsap.timeline({ onComplete: () => heading.current?.focus({ preventScroll: true }) });
    if (rm) {
      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    } else {
      tl.fromTo(el, { clipPath: insetFrom(rect) }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1.05, ease: 'expo.inOut' })
        .fromTo(el.querySelector('.room-bg'), { scale: 1.3 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0)
        .fromTo(masks, { yPercent: 115 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07 }, 0.55)
        .fromTo(ins, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.06 }, 0.7);
    }
    return () => {
      window.clearTimeout(clear);
      tl.kill();
      if (locked.current) {
        locked.current = false;
        unlockScroll();
      }
    };
  }, [slug]);

  useEffect(() => {
    if (!closing) return;
    const el = root.current!;
    const detail: ExitDetail = { slug, rect: null };
    window.dispatchEvent(new CustomEvent('room:exiting', { detail }));
    const done = () => {
      window.dispatchEvent(new CustomEvent('room:exited', { detail: slug }));
      if (locked.current) {
        locked.current = false;
        unlockScroll();
      }
      onExited();
    };
    if (reducedMotion()) {
      gsap.to(el, { opacity: 0, duration: 0.2, onComplete: done });
      return;
    }
    const tl = gsap
      .timeline({ onComplete: done })
      .to(el.querySelector('.room-content'), { opacity: 0, y: -30, duration: 0.35, ease: 'power2.in' }, 0)
      .to(el, { clipPath: insetFrom(detail.rect), duration: 0.85, ease: 'expo.inOut' }, 0.1);
    return () => {
      tl.kill();
    };
  }, [closing, slug, onExited]);

  const style = { '--c': door.color, '--deep': door.deep, '--light': door.light } as CSSProperties;

  return (
    <div ref={root} className="room theme-fixed" style={style} role="dialog" aria-modal="true" aria-labelledby="room-title" data-lenis-prevent>
      <div className="room-bg" aria-hidden="true" />
      <div className="room-content relative">
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-[var(--gutter)] py-4 backdrop-blur-md" style={{ background: 'color-mix(in oklab, var(--deep) 70%, transparent)' }}>
          <Magnetic>
            <button onClick={onClose} className="btn btn-light h-11 pl-2 pr-5 text-sm" data-cursor="Back">
              <span className="btn-dot size-8 rotate-180">
                <Arrow />
              </span>
              Back to the corridor
            </button>
          </Magnetic>
          <p className="eyebrow hidden text-white/60 md:block">
            Door {door.no} / 0{doors.length} · {door.short}
          </p>
          <button
            onClick={() => navigate({ room: next.slug }, { replace: true })}
            className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            <span className="hidden sm:inline">Next door: {next.short}</span>
            <span className="sm:hidden">Next</span> <Arrow className="size-4" />
          </button>
        </div>

        <header className="mx-auto max-w-[1400px] px-[var(--gutter)] pb-16 pt-[8vh]">
          <p className="room-in eyebrow mb-6 flex items-center gap-3" style={{ color: 'var(--light)' }}>
            <span className="inline-block h-px w-10 bg-current" />
            Door {door.no}
          </p>
          <h1 id="room-title" ref={heading} tabIndex={-1} className="room-title font-display font-bold leading-[0.9] tracking-[-0.03em] outline-none" style={{ fontSize: 'clamp(3rem, 8.5vw, 8.5rem)' }}>
            {door.title.split(' ').map((w, i) => (
              <span key={i} className="mask mr-[0.22em]">
                <span>{w}</span>
              </span>
            ))}
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="room-in font-display text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium leading-snug">{door.tagline}</p>
              <p className="room-in mt-5 max-w-xl leading-relaxed text-white/70">{door.intro}</p>
            </div>
            {door.abilities.length > 0 && (
              <ul className="lg:col-span-5 lg:col-start-8">
                {door.abilities.map((a, i) => (
                  <li key={a} className="room-in flex items-baseline gap-4 border-t border-white/15 py-3.5 text-white/85">
                    <span className="font-mono text-xs" style={{ color: 'var(--light)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        {slug === 'embedded' && (
          <section className="mx-auto max-w-[1400px] px-[var(--gutter)] pb-20" aria-label="How the greenhouse monitor works">
            <Pipeline />
          </section>
        )}

        <section className="mx-auto max-w-[1400px] px-[var(--gutter)] pb-24" aria-label={`${door.title} projects`}>
          <p className="room-reveal eyebrow mb-10 border-b border-white/15 pb-4 text-white/55">
            {slug === 'projects' ? `All work · ${projects.filter((p) => p.repo || p.live || p.note).length} projects` : `Inside this room · ${list.length} ${list.length === 1 ? 'project' : 'projects'}`}
          </p>
          {slug === 'projects' ? (
            <Archive />
          ) : (
            <div className="space-y-24 lg:space-y-32">
              {list.map((p, i) => (
                <ProjectRow key={p.slug} project={p} i={i} room={slug} />
              ))}
            </div>
          )}
        </section>

        <footer className="border-t border-white/10">
          <button
            onClick={() => navigate({ room: next.slug }, { replace: true })}
            className="group mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-[var(--gutter)] py-16 text-left"
            data-cursor="Next"
          >
            <span>
              <span className="eyebrow block text-white/50">Next door · {next.no}</span>
              <span className="mt-2 block font-display text-[clamp(2rem,6vw,5.5rem)] font-bold leading-none tracking-tight transition-transform duration-700 group-hover:translate-x-3">
                {next.title}
              </span>
            </span>
            <span className="grid size-16 flex-none place-items-center rounded-full border border-white/30 transition-colors group-hover:bg-white group-hover:text-ink sm:size-24">
              <Arrow className="size-6" />
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
}
