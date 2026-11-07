import { skillGroups } from '../data/skills';
import AbilityCard from './AbilityCard';
import { Reveal, SplitLines } from './ui';

export default function Skills({ onOpenCard }: { onOpenCard: () => void }) {
  return (
    <section id="skills" className="relative bg-paper-2 px-[var(--gutter)] py-[clamp(6rem,12vw,10rem)]" aria-labelledby="skills-title">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div>
            <p className="eyebrow mb-4 flex items-center gap-3 text-clay">
              <span className="inline-block h-px w-8 bg-current" /> Technology & skills
            </p>
            <SplitLines lines={['Tools I have', 'shipped with.']} className="font-display text-[clamp(2.4rem,5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.03em]" />
            <span id="skills-title" className="sr-only">
              Technology and skills
            </span>
            <p className="mt-5 max-w-md text-ink-2">No percentage bars. Every tool below is tied to a project where I used it.</p>
            <div className="mt-10">
              <AbilityCard />
              <div className="mt-4 flex justify-center">
                <button onClick={onOpenCard} className="link-u text-sm font-semibold text-clay">
                  Open the full card ↗
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-14 lg:col-span-7">
          {skillGroups.map((g) => (
            <Reveal key={g.label}>
              <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-3">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{g.label}</h3>
                <span className="eyebrow text-[0.62rem] text-mute">{g.note}</span>
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {g.items.map((s) => (
                  <li
                    key={s.name}
                    className="group rounded-xl border border-ink/10 bg-paper px-4 py-3 transition-all duration-500 hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <p className="font-semibold leading-tight">{s.name}</p>
                    <p className="mt-1 font-mono text-[0.66rem] text-mute transition-colors group-hover:text-paper/60">{s.where}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
