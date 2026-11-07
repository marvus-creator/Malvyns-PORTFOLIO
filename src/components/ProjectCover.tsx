import type { Project } from '../data/projects';

export default function ProjectCover({ project, index = 0, className = '', eager = false }: { project: Project; index?: number; className?: string; eager?: boolean }) {
  const src = project.images[index];
  if (src) {
    return (
      <img
        src={src}
        alt={`${project.name} screenshot ${index + 1}`}
        className={`size-full object-cover object-top ${className}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }
  return (
    <div
      className={`relative flex size-full flex-col justify-between overflow-hidden p-[6%] text-[#f4eee3] ${className}`}
      style={{ background: `radial-gradient(120% 90% at 0% 0%, color-mix(in oklab, ${project.tone} 70%, white), ${project.tone} 55%, color-mix(in oklab, ${project.tone} 55%, black))` }}
      role="img"
      aria-label={`${project.name} cover`}
    >
      <svg className="absolute inset-0 size-full opacity-[.18]" aria-hidden="true">
        <defs>
          <pattern id={`cv-${project.slug}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M14 2 L26 14 L14 26 L2 14 Z M14 8 L20 14 L14 20 L8 14 Z" fill="none" stroke="#fff" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cv-${project.slug})`} />
      </svg>
      <div className="relative flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-80">
        <span>{project.kind}</span>
        <span>{project.year}</span>
      </div>
      <div className="relative">
        <p className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.9] tracking-tight">{project.name}</p>
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.7rem] opacity-75">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
      </div>
    </div>
  );
}
