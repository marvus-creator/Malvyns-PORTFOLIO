import { Reveal, ScrubWords, SplitLines } from './ui';

const facts = [
  { k: 'Based in', v: 'Kigali, Rwanda' },
  { k: 'Studying', v: 'ICT' },
  { k: 'Building since', v: 'January 2026' },
  { k: 'Interfaces in', v: 'English · Kinyarwanda · French' },
];

const chapters = [
  {
    n: '01',
    t: 'What I build',
    b: 'Platforms people can actually use: a marketplace with mobile-money escrow, a credit score read from satellite images, a map a whole team edits at once, a vision model that diagnoses a leaf offline.',
  },
  {
    n: '02',
    t: 'Why I build it',
    b: 'Rwanda is where I test my ideas: farmers with basic phones, hillside districts that flood, cooperatives with no credit history. Those limits taught me offline-first design, SMS/USSD fallbacks, and Kinyarwanda in the interface.',
  },
  {
    n: '03',
    t: 'How I build it',
    b: 'I like the whole stack, from an ESP32 reading a sensor to a PostGIS query to the easing on a button. Most of my products are solo builds, and I am learning to do the same inside team codebases.',
  },
];

export default function About() {
  return (
    <section id="story" className="relative px-[var(--gutter)] py-[clamp(6rem,14vw,12rem)]" aria-labelledby="story-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow sticky top-28 flex items-center gap-3 text-clay">
              <span className="inline-block h-px w-8 bg-current" /> My story
            </p>
          </div>
          <div className="lg:col-span-9">
            <SplitLines
              as="h2"
              lines={['I opened my first repo', 'in January 2026.']}
              className="font-display text-[clamp(2.4rem,5.6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            />
            <span id="story-title" className="sr-only">
              My story
            </span>
            <ScrubWords
              className="mt-10 max-w-4xl font-display text-[clamp(1.4rem,2.5vw,2.25rem)] font-medium leading-[1.25] tracking-tight"
              text="By July I had shipped six platforms: a satellite credit-scoring engine, a real-time collaborative map, a 3D disaster early-warning twin, an offline crop-disease doctor, an agri-fintech credit app, and GAIA, the system that joins them together."
            />
            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((f, i) => (
                <Reveal key={f.k} delay={i * 0.06} y={20} className="bg-paper p-5">
                  <p className="eyebrow text-[0.62rem] text-mute">{f.k}</p>
                  <p className="mt-2 font-display text-lg font-semibold leading-snug">{f.v}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
              {chapters.map((c, i) => (
                <Reveal key={c.n} delay={i * 0.1}>
                  <p className="font-mono text-xs text-clay">{c.n}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{c.t}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{c.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
