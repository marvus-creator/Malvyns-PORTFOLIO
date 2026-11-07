import { useEffect, useRef } from 'react';
import { gsap, reducedMotion, finePointer, scrollToTarget } from '../lib/motion';
import { heroRoles, site } from '../data/site';
import portrait from '../assets/portrait/portrait.webp';
import SplitFlap from './SplitFlap';
import { Arrow, Magnetic, useKigaliTime } from './ui';

export default function Hero({ ready, onAbilityCard }: { ready: boolean; onAbilityCard: () => void }) {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const time = useKigaliTime();

  useEffect(() => {
    const el = root.current!;
    if (reducedMotion()) {
      gsap.set(el.querySelectorAll('[data-hero]'), { opacity: 1 });
      return;
    }
    gsap.set(el.querySelectorAll('.hero-letter'), { yPercent: 115 });
    gsap.set(el.querySelectorAll('[data-hero]'), { opacity: 0, y: 24 });
    gsap.set(frame.current, { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)' });
    gsap.set(photo.current, { scale: 1.25 });
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion()) return;
    const el = root.current!;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to(frame.current, { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)', duration: 1.6, ease: 'expo.inOut' }, 0)
      .to(photo.current, { scale: 1, duration: 2.2 }, 0.2)
      .to(el.querySelectorAll('.hero-letter'), { yPercent: 0, duration: 1.3, stagger: 0.035 }, 0.25)
      .to(el.querySelectorAll('[data-hero]'), { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.7);
    return () => {
      tl.kill();
    };
  }, [ready]);

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const el = root.current!;
    const px = gsap.quickTo(photo.current, 'x', { duration: 1.2, ease: 'power3.out' });
    const py = gsap.quickTo(photo.current, 'y', { duration: 1.2, ease: 'power3.out' });
    const fr = gsap.quickTo(frame.current, 'rotationY', { duration: 1.2, ease: 'power3.out' });
    const fx = gsap.quickTo(frame.current, 'rotationX', { duration: 1.2, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      px(nx * -18);
      py(ny * -12);
      fr(nx * 6);
      fx(ny * -4);
    };
    el.addEventListener('pointermove', move);
    const st = gsap.to(el.querySelector('.hero-art'), {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    });
    return () => {
      el.removeEventListener('pointermove', move);
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  const letters = (word: string) =>
    word.split('').map((c, i) => (
      <span key={i} className="mask">
        <span className="hero-letter">{c}</span>
      </span>
    ));

  return (
    <section ref={root} id="top" className="relative min-h-[100svh] overflow-hidden pt-[var(--nav-h)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18vw] top-[8vh] size-[70vw] max-w-[980px] rounded-full opacity-70 lg:right-[-6vw] lg:size-[52vw]"
        style={{ background: 'radial-gradient(circle at 40% 40%, rgba(201,104,61,.35), rgba(201,104,61,0) 62%)' }}
      />
      <div className="relative mx-auto grid min-h-[calc(100svh-var(--nav-h))] max-w-[1600px] grid-cols-1 items-center gap-10 px-[var(--gutter)] pb-28 pt-6 lg:grid-cols-12 lg:gap-6 lg:pb-24">
        <div className="relative z-10 order-2 lg:order-1 lg:col-span-7">
          <p data-hero className="eyebrow mb-6 flex items-center gap-3 text-ink-2">
            <span className="inline-block size-1.5 rounded-full bg-clay" />
            Software developer · {site.city}
          </p>
          <h1 className="font-display font-bold uppercase leading-[0.84] tracking-[-0.035em] text-ink" style={{ fontSize: 'clamp(3.6rem, 11.2vw, 11.5rem)' }}>
            <span className="sr-only">{site.name}</span>
            <span aria-hidden="true" className="block">
              {letters('Nkusi')}
            </span>
            <span aria-hidden="true" className="block pl-[0.6em] text-clay">
              {letters('Malvyn')}
            </span>
          </h1>
          <p data-hero className="mt-8 max-w-[34rem] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-relaxed text-ink-2">
            I don’t just write code. I design and build <strong className="font-semibold text-ink">systems that solve real problems</strong>, from
            satellite credit scores to sensors in a greenhouse.
          </p>
          <div data-hero className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-3 text-[clamp(1rem,1.7vw,1.45rem)]">
            <span className="font-display font-semibold">I build</span>
            <SplitFlap words={heroRoles} start={ready} />
          </div>
          <div data-hero className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button className="btn btn-dark" onClick={() => scrollToTarget('corridor')} data-cursor="Enter">
                Explore my work
                <span className="btn-dot">
                  <Arrow dir="down" />
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <button className="btn btn-ghost" onClick={() => scrollToTarget('contact')}>
                Let’s build something
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="hero-art relative order-1 mx-auto w-[min(78vw,430px)] lg:order-2 lg:col-span-5 lg:w-full lg:max-w-[500px]" style={{ perspective: 1200 }}>
          <div ref={frame} className="arch arch-casing relative p-[14px] pb-0 [transform-style:preserve-3d]">
            <div className="arch imigongo-band p-[10px] pb-0">
              <div className="arch relative aspect-[0.74] overflow-hidden bg-paper-3">
                <div ref={photo} className="absolute -inset-[4%]">
                  <img
                    src={portrait}
                    alt="Nkusi Malvyn in a light-blue shirt and grey cap"
                    width={915}
                    height={1270}
                    className="size-full object-cover object-[50%_18%]"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(22,23,27,.25)]" />
              </div>
            </div>
            <div className="absolute -bottom-px left-0 right-0 h-3 translate-y-full rounded-b-sm bg-gradient-to-b from-[#d4c8b3] to-[#bfb197] shadow-[0_18px_30px_-10px_rgba(0,0,0,.35)]" />
          </div>
          <button
            data-hero
            onClick={onAbilityCard}
            className="group absolute -left-3 bottom-[22%] flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-sm font-semibold text-paper shadow-xl sm:-left-10"
            data-cursor="Flip"
          >
            <span className="grid size-9 place-items-center rounded-full bg-clay transition-transform duration-500 group-hover:rotate-180">✦</span>
            My ability card
          </button>
          <div data-hero className="absolute -right-3 bottom-[4%] rounded-2xl sm:-right-8 lg:bottom-auto lg:top-[14%] bg-paper/85 px-4 py-3 text-xs shadow-xl backdrop-blur">
            <p className="eyebrow text-[0.6rem] text-mute">Shipping since</p>
            <p className="font-display text-lg font-bold leading-tight">Jan 2026</p>
          </div>
        </div>
      </div>

      <div data-hero className="absolute inset-x-0 bottom-0 z-10 border-t border-ink/10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-[var(--gutter)] py-4 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-2">
          <span>
            Kigali · <span ref={time} className="font-mono tabular-nums" /> CAT
          </span>
          <span className="hidden md:inline">40+ public repositories</span>
          <button onClick={() => scrollToTarget('corridor')} className="flex items-center gap-2 hover:text-clay">
            Scroll to enter the corridor <Arrow dir="down" className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
