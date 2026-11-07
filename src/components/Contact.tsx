import { useState, type FormEvent } from 'react';
import { site } from '../data/site';
import { scrollToTarget } from '../lib/motion';
import { navItems } from './Nav';
import { Arrow, Magnetic, Reveal, SplitLines, useKigaliTime } from './ui';

const kinds = ['A web platform', 'A management system', 'Something with hardware', 'Collaboration', 'Just saying hi'];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [kind, setKind] = useState(kinds[0]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const time = useKigaliTime();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = `${kind}${name ? ` from ${name}` : ''}`;
    const body = `${msg}\n\n${name ? `— ${name}` : ''}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="theme-fixed relative z-10 -mt-8 overflow-hidden rounded-t-[clamp(1.5rem,4vw,3rem)] bg-night text-paper" aria-labelledby="contact-title">
      <div className="pointer-events-none absolute -left-[20vw] -top-[20vw] size-[60vw] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(168,71,31,.55), transparent 65%)' }} aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-[var(--gutter)] pb-10 pt-[clamp(5rem,10vw,9rem)]">
        <p className="eyebrow flex items-center gap-3 text-paper/60">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Available for freelance & collaborations
        </p>
        <SplitLines
          as="h2"
          lines={['Got a problem', 'worth solving?']}
          className="mt-6 font-display text-[clamp(3rem,8.5vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.035em]"
        />
        <p id="contact-title" className="mt-3 font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-none tracking-tight text-paper/35">
          Let’s build it.
        </p>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-paper/50">Write to me</p>
            <a href={`mailto:${site.email}`} className="link-u mt-3 inline-block break-all font-display text-[clamp(1.5rem,3vw,2.4rem)] font-semibold">
              {site.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <a href={`mailto:${site.email}`} className="btn btn-light" data-cursor="Write">
                  Email me
                  <span className="btn-dot">
                    <Arrow dir="ne" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <button onClick={copy} className="btn btn-ghost text-paper" style={{ ['--btn-fill' as string]: '#eee8dd' }}>
                  <span className={copied ? 'text-emerald-300' : ''}>{copied ? 'Copied ✓' : 'Copy address'}</span>
                </button>
              </Magnetic>
            </div>
            <p className="sr-only" aria-live="polite">
              {copied ? 'Email address copied' : ''}
            </p>
            <ul className="mt-12 divide-y divide-paper/10 border-y border-paper/10">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-4">
                    <span className="font-display text-xl font-semibold">{s.label}</span>
                    <span className="flex items-center gap-3 text-sm text-paper/50 transition-colors group-hover:text-paper">
                      {s.handle}
                      <Arrow dir="ne" className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <form onSubmit={send} className="rounded-[22px] border border-paper/12 bg-night-2 p-6 sm:p-8">
              <p className="font-display text-2xl font-semibold">Start a conversation</p>
              <p className="mt-1 text-sm text-paper/50">This opens your email app with the message ready. Nothing is stored here.</p>
              <fieldset className="mt-6">
                <legend className="eyebrow text-[0.62rem] text-paper/50">What is it about?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {kinds.map((k) => (
                    <button
                      type="button"
                      key={k}
                      onClick={() => setKind(k)}
                      aria-pressed={kind === k}
                      className={`chip h-10 px-4 transition-colors ${kind === k ? 'border-transparent bg-paper text-ink' : 'border-paper/20 text-paper/75 hover:border-paper/50'}`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="mt-6 block">
                <span className="eyebrow text-[0.62rem] text-paper/50">Your name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="mt-2 w-full border-b border-paper/20 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-paper/25 focus:border-clay-2"
                  placeholder="Who’s writing?"
                />
              </label>
              <label className="mt-6 block">
                <span className="eyebrow text-[0.62rem] text-paper/50">Your message</span>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  required
                  rows={4}
                  className="mt-2 w-full resize-none border-b border-paper/20 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-paper/25 focus:border-clay-2"
                  placeholder="Tell me what you want to build."
                />
              </label>
              <button type="submit" className="btn btn-light mt-8 w-full justify-between">
                Compose email
                <span className="btn-dot">
                  <Arrow />
                </span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <footer className="relative border-t border-paper/10">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-[var(--gutter)] py-14 sm:grid-cols-3">
          <div>
            <p className="eyebrow text-[0.62rem] text-paper/40">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollToTarget(n.id)} className="link-u text-paper/75 hover:text-paper">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-[0.62rem] text-paper/40">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-u text-paper/75 hover:text-paper">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-[0.62rem] text-paper/40">Status</p>
            <ul className="mt-4 space-y-2 text-sm text-paper/75">
              <li>Available for freelance & collaborations</li>
              <li>{site.city}</li>
              <li>
                Local time <span ref={time} className="font-mono tabular-nums" /> CAT
              </li>
            </ul>
          </div>
        </div>
        <div className="overflow-hidden px-[var(--gutter)]" aria-hidden="true">
          <p className="footer-mark mx-auto max-w-[1400px] select-none whitespace-nowrap font-display font-bold uppercase leading-[0.78] tracking-[-0.05em]" style={{ fontSize: 'clamp(2.6rem, 12.4vw, 12.5rem)' }}>
            {'Nkusi Malvyn'.split('').map((c, i) => (
              <span key={i} className="inline-block transition-transform duration-500 ease-[cubic-bezier(.3,1.6,.5,1)] hover:-translate-y-[0.12em] hover:text-clay-2">
                {c === ' ' ? ' ' : c}
              </span>
            ))}
          </p>
        </div>
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-[var(--gutter)] py-6 text-xs text-paper/45">
          <span>© {new Date().getFullYear()} Nkusi Malvyn. Designed and built in Kigali.</span>
          <button onClick={() => scrollToTarget(0)} className="flex items-center gap-2 hover:text-paper">
            Back to top <Arrow dir="up" className="size-3.5" />
          </button>
        </div>
      </footer>
    </section>
  );
}
