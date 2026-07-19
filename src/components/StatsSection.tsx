import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Code2, Users, Coffee } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: <Award className="w-5 h-5" />,
    value: 5,
    suffix: '+',
    label: 'Years Experience',
    description: 'Building production systems',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    value: 87,
    suffix: '',
    label: 'Projects Shipped',
    description: 'Across frontend & backend',
  },
  {
    icon: <Users className="w-5 h-5" />,
    value: 42,
    suffix: '',
    label: 'Happy Clients',
    description: 'From startups to enterprise',
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    value: 1340,
    suffix: '',
    label: 'Cups of Coffee',
    description: 'Fueling deep work sessions',
  },
];

const Counter: React.FC<{ target: number; isInView: boolean }> = ({ target, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(tick);
  }, [target, isInView]);

  return <>{count.toLocaleString()}</>;
};

export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-10 border-y border-[#D7E2EA]/10 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <div className="w-8 h-[1px] bg-fuchsia-500" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-bold font-mono">
            By the Numbers
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#D7E2EA]/10 rounded-3xl overflow-hidden">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-[#0C0C0C] p-6 sm:p-8 md:p-10 flex flex-col gap-3 hover:bg-[#151515] transition-colors duration-500 group cursor-default"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                {stat.icon}
              </div>

              {/* Number */}
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-black text-[#D7E2EA] tabular-nums leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                  <Counter target={stat.value} isInView={isInView} />
                </span>
                <span className="font-black text-fuchsia-400 leading-none" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <div className="flex flex-col gap-0.5">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D7E2EA]">
                  {stat.label}
                </span>
                <span className="text-[10px] sm:text-xs text-[#D7E2EA]/50 font-light">
                  {stat.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
