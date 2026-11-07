import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, reducedMotion } from '../lib/motion';
import { journey } from '../data/journey';
import SplitFlap from './SplitFlap';
import { SplitLines } from './ui';

const months = journey.map((m) => m.month);

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current!;
    const items = el.querySelectorAll<HTMLElement>('.ms');
    const triggers = Array.from(items).map((item, i) =>
      ScrollTrigger.create({
        trigger: item,
        start: 'top 60%',
        end: 'bottom 60%',
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      }),
    );
    let fill: gsap.core.Tween | null = null;
    if (!reducedMotion()) {
      fill = gsap.fromTo(
        line.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el.querySelector('.ms-list'), start: 'top 60%', end: 'bottom 60%', scrub: true } },
      );
      items.forEach((item) => {
        gsap.fromTo(
          item.querySelectorAll('.ms-in'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: item, start: 'top 82%', once: true } },
        );
      });
    }
    return () => {
      triggers.forEach((t) => t.kill());
      fill?.scrollTrigger?.kill();
      fill?.kill();
    };
  }, []);

  const m = journey[active];

  return (
    <section ref={root} id="journey" className="relative bg-paper px-[var(--gutter)] py-[clamp(6rem,12vw,10rem)]" aria-labelledby="journey-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4 flex items-center gap-3 text-clay">
              <span className="inline-block h-px w-8 bg-current" /> Experience & journey
            </p>
            <SplitLines lines={['Ten months,', 'one direction.']} className="font-display text-[clamp(2.4rem,5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.03em]" />
            <span id="journey-title" className="sr-only">
              Experience and journey
            </span>
            <div className="mt-10 hidden items-end gap-4 lg:flex" aria-hidden="true">
              <span className="text-[3.4rem] leading-none">
                <SplitFlap words={months} at={active} />
              </span>
              <span className="font-display text-[5.5rem] font-bold leading-[0.8] tracking-tight text-ink/15">{m.year}</span>
            </div>
            <p className="mt-6 hidden max-w-sm text-sm text-mute lg:block">Every date here comes from my GitHub history.</p>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-ink/15" aria-hidden="true">
            <div ref={line} className="size-full origin-top bg-clay" />
          </div>
          <ol className="ms-list space-y-16 sm:space-y-20">
            {journey.map((s, i) => (
              <li key={s.title} className="ms relative pl-10 sm:pl-14">
                <span
                  className={`absolute left-0 top-2 size-[15px] rounded-full border-2 transition-colors duration-500 ${i <= active ? 'border-clay bg-clay' : 'border-ink/30 bg-paper'}`}
                  aria-hidden="true"
                />
                <p className="ms-in eyebrow text-mute">
                  {s.month === 'NOW' ? 'Now' : `${s.month} ${s.year}`}
                </p>
                <h3 className="ms-in mt-2 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-tight tracking-tight">{s.title}</h3>
                <p className="ms-in mt-3 max-w-xl leading-relaxed text-ink-2">{s.body}</p>
                <p className="ms-in mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="chip text-ink-2">
                      {t}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
