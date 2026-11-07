import { useEffect, useRef, useState } from 'react';
import { gsap, scrollToTarget, reducedMotion, lockScroll, unlockScroll } from '../lib/motion';
import { site } from '../data/site';
import { Magnetic, useKigaliTime } from './ui';

export const navItems = [
  { id: 'corridor', label: 'The Doors' },
  { id: 'work', label: 'Work' },
  { id: 'story', label: 'Story' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav({ hidden }: { hidden: boolean }) {
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const time = useKigaliTime();

  useEffect(() => {
    let last = window.scrollY;
    let shown = true;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last && y > 160;
      if (down === shown) {
        shown = !down;
        gsap.to(bar.current, { yPercent: down ? -120 : 0, duration: 0.5, ease: 'power3.out' });
      }
      bar.current?.classList.toggle('is-scrolled', y > 40);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const m = menu.current;
    if (!m) return;
    const panels = m.querySelectorAll('.menu-panel');
    const links = m.querySelectorAll('.menu-link > span');
    const rm = reducedMotion();
    if (open) {
      lockScroll();
      m.style.visibility = 'visible';
      gsap.timeline()
        .fromTo(panels[0], { xPercent: -100 }, { xPercent: 0, duration: rm ? 0 : 0.7, ease: 'expo.inOut' }, 0)
        .fromTo(panels[1], { xPercent: 100 }, { xPercent: 0, duration: rm ? 0 : 0.7, ease: 'expo.inOut' }, 0)
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: rm ? 0 : 0.8, ease: 'expo.out', stagger: 0.06 }, 0.45)
        .fromTo(m.querySelector('.menu-foot'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.7);
      (m.querySelector('.menu-link') as HTMLElement | null)?.focus();
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    if (m.style.visibility === 'visible') {
      gsap.timeline({
        onComplete: () => {
          m.style.visibility = 'hidden';
        },
      })
        .to(links, { yPercent: -110, duration: rm ? 0 : 0.4, ease: 'power3.in', stagger: 0.03 })
        .to(m.querySelector('.menu-foot'), { opacity: 0, duration: 0.2 }, 0)
        .to(panels[0], { xPercent: -100, duration: rm ? 0 : 0.7, ease: 'expo.inOut' }, 0.2)
        .to(panels[1], { xPercent: 100, duration: rm ? 0 : 0.7, ease: 'expo.inOut' }, 0.2);
      unlockScroll();
    }
  }, [open]);

  const go = (id: string) => {
    if (open) {
      setOpen(false);
      window.setTimeout(() => scrollToTarget(id), 650);
    } else scrollToTarget(id);
  };

  return (
    <>
      <header
        ref={bar}
        className={`group fixed inset-x-0 top-0 z-[86] transition-opacity duration-500 ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        <div className="mx-auto flex h-[var(--nav-h)] items-center justify-between gap-6 pl-[var(--gutter)] pr-[max(var(--gutter),3.4rem)]">
          <button onClick={() => scrollToTarget(0)} className="flex items-center gap-3" aria-label="Back to top">
            <span className={`grid size-10 place-items-center rounded-full font-display text-sm font-bold tracking-tight transition-colors duration-500 ${open ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>
              NM
            </span>
            <span className={`hidden text-sm font-semibold tracking-tight transition-colors duration-500 sm:block ${open ? 'text-paper' : ''}`}>
              {site.name}
              <span className="font-normal text-mute"> · Portfolio</span>
            </span>
          </button>
          <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-ink/10 bg-paper/70 p-1 backdrop-blur-md lg:flex">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} className="rounded-full px-4 py-2 text-sm text-ink-2 transition-colors hover:bg-ink hover:text-paper">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className={`hidden items-center gap-2 rounded-full border border-ink/10 bg-paper/70 px-4 py-2 text-xs backdrop-blur-md md:flex ${open ? 'opacity-0' : ''}`}>
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
              </span>
              Kigali <span ref={time} className="font-mono font-medium tabular-nums" />
            </span>
            <Magnetic>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="site-menu"
                className={`flex h-11 items-center gap-3 rounded-full pl-5 pr-2 text-sm font-semibold transition-colors duration-500 lg:hidden ${open ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}
              >
                {open ? 'Close' : 'Menu'}
                <span className={`grid size-7 place-items-center rounded-full ${open ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}>
                  <span className="relative block h-2.5 w-3">
                    <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? 'top-1 rotate-45' : 'top-0'}`} />
                    <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? 'top-1 -rotate-45' : 'top-2'}`} />
                  </span>
                </span>
              </button>
            </Magnetic>
            <div className="hidden lg:block">
              <Magnetic>
                <button onClick={() => go('contact')} className="btn btn-dark h-11 text-sm" data-cursor="Say hi">
                  Let’s talk
                  <span className="btn-dot size-8">↗</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      <div id="site-menu" ref={menu} className="theme-fixed fixed inset-0 z-[78]" style={{ visibility: 'hidden' }} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="menu-panel left-0" />
        <div className="menu-panel right-0" />
        <div className="absolute inset-0 z-[80] flex flex-col justify-between px-[var(--gutter)] pb-8 pt-28 text-paper">
          <ul className="space-y-1">
            {navItems.map((n) => (
              <li key={n.id}>
                <button onClick={() => go(n.id)} className="menu-link mask flex items-baseline gap-4 text-left">
                  <span className="font-display text-[clamp(2.6rem,11vw,5rem)] font-semibold leading-[1.02] tracking-tight">
                    {n.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="menu-foot flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/60">
            <a className="link-u" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            {site.socials.slice(0, 2).map((s) => (
              <a key={s.label} className="link-u" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
