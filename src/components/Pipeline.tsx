import { reducedMotion } from '../lib/motion';

const nodes = [
  { x: 70, title: 'DHT11', sub: 'temperature + humidity' },
  { x: 260, title: 'ESP32', sub: 'reads every 5 s' },
  { x: 450, title: 'Wi-Fi · HTTPS', sub: 'REST insert' },
  { x: 640, title: 'Supabase', sub: 'Postgres + realtime' },
  { x: 830, title: 'Dashboard', sub: 'charts + fan rules' },
];

export default function Pipeline() {
  const rm = reducedMotion();
  return (
    <figure className="room-reveal overflow-hidden rounded-[22px] border border-white/15 bg-black/25 p-5 sm:p-8">
      <figcaption className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-display text-2xl font-semibold">How the greenhouse talks</span>
        <span className="eyebrow text-white/50">Live data path</span>
      </figcaption>
      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <svg viewBox="0 0 900 250" className="min-w-[640px]" role="img" aria-label="Sensor data flows from a DHT11 sensor to an ESP32, over Wi-Fi and HTTPS into Supabase, and on to a live dashboard. Failed readings go to a separate error table.">
          <defs>
            <linearGradient id="pl" x1="0" x2="1">
              <stop offset="0" stopColor="#b6ffcf" stopOpacity=".2" />
              <stop offset="1" stopColor="#b6ffcf" stopOpacity=".8" />
            </linearGradient>
          </defs>
          <path id="pipe" d="M70 90 H830" stroke="url(#pl)" strokeWidth="2" strokeDasharray="6 8" fill="none" />
          <path id="err" d="M260 90 V190 H640 V90" stroke="#ffb98f" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />
          {!rm &&
            [0, 1.3, 2.6].map((b) => (
              <circle key={b} r="5" fill="#b6ffcf">
                <animateMotion dur="3.9s" begin={`${b}s`} repeatCount="indefinite" path="M70 90 H830" />
              </circle>
            ))}
          {!rm && (
            <circle r="4" fill="#ffb98f">
              <animateMotion dur="5s" begin="1s" repeatCount="indefinite" path="M260 90 V190 H640 V90" />
            </circle>
          )}
          {nodes.map((n) => (
            <g key={n.title} transform={`translate(${n.x} 90)`}>
              <circle r="26" fill="#18291e" stroke="#b6ffcf" strokeOpacity=".7" strokeWidth="1.5" />
              <circle r="6" fill="#b6ffcf" />
              <text y="-42" textAnchor="middle" fill="#f4eee3" fontSize="15" fontWeight="600" fontFamily="Inter Variable, sans-serif">
                {n.title}
              </text>
              <text y="52" textAnchor="middle" fill="#f4eee3" fillOpacity=".55" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
                {n.sub}
              </text>
            </g>
          ))}
          <text x="450" y="212" textAnchor="middle" fill="#ffb98f" fillOpacity=".85" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
            failed read → sensor_errors table (RLS + realtime)
          </text>
        </svg>
      </div>
      <p className="mt-4 text-sm text-white/60">
        The dashboard switches the fan and air inlet on when the greenhouse goes above 30 °C or 80 % humidity.
      </p>
    </figure>
  );
}
