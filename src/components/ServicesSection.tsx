import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { ChevronRight } from 'lucide-react';
import { ArchitectureMap } from './ArchitectureMap';
import { audioSynth } from '../utils/audio';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

const servicesList: ServiceItem[] = [
  {
    id: '01',
    title: 'Frontend Architecture',
    description:
      'Engineered React, Next.js, and Vue web applications focused on sub-second load times, modular architecture, state machines, and flawless fluid transitions.',
  },
  {
    id: '02',
    title: 'Backend & Systems',
    description:
      'Designing robust, distributed backend microservices utilizing Go and Node.js, combined with low-latency Redis caching and reliable relational databases (Postgres).',
  },
  {
    id: '03',
    title: 'Creative Engineering',
    description:
      'Fusing physics and math to build 3D layouts, custom shaders (GLSL), canvas dynamics, and stunning interactive animations that run at a lockstep 60FPS.',
  },
  {
    id: '04',
    title: 'DevOps & Cloud',
    description:
      'Configuring serverless cloud deployments (AWS/GCP), containerizing environments via Docker, and automating pipelines using Kubernetes and CI/CD workflows.',
  },
  {
    id: '05',
    title: 'UI/UX Crafting',
    description:
      'Bridging design systems with core engineering. Transforming motion prototypes into rich layouts with careful typography, spacing, and user journeys.',
  },
];

export const ServicesSection: React.FC = () => {
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);

  const handleServiceMouseEnter = (index: number) => {
    setActiveServiceIdx(index);
    audioSynth.playTick();
  };

  return (
    <section
      id="services"
      className="relative w-full bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10 select-none"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.8} className="w-full text-center">
          <h2
            className="font-black uppercase text-[#0C0C0C] tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Dynamic Split Layout: Services List + Interactive Blueprint map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full">
          {/* Services List (7 columns) */}
          <div className="lg:col-span-7 flex flex-col w-full">
            {servicesList.map((item, index) => (
              <div
                key={item.id}
                onMouseEnter={() => handleServiceMouseEnter(index)}
                className={`w-full border-b border-[rgba(12,12,12,0.15)] last:border-b-0 cursor-pointer transition-all duration-300 group ${
                  activeServiceIdx === index
                    ? 'opacity-100 bg-[#0C0C0C]/5 rounded-xl px-4'
                    : 'opacity-70 px-0'
                }`}
              >
                <div className="flex flex-row items-center gap-6 sm:gap-10 py-8 sm:py-10">
                  {/* Large Number on Left */}
                  <span
                    className="font-black text-[#0C0C0C] leading-none select-none flex-shrink-0 tracking-tighter"
                    style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
                  >
                    {item.id}
                  </span>

                  {/* Name & Description Stacked on Right */}
                  <div className="flex flex-col gap-2 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3
                        className="font-semibold uppercase text-[#0C0C0C] tracking-wide"
                        style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)' }}
                      >
                        {item.title}
                      </h3>
                      <ChevronRight
                        className={`w-5 h-5 text-fuchsia-600 transition-transform duration-300 ${
                          activeServiceIdx === index
                            ? 'translate-x-1 opacity-100'
                            : 'opacity-0 -translate-x-1'
                        }`}
                      />
                    </div>
                    <p
                      className="font-light text-[#0C0C0C] opacity-80 leading-relaxed"
                      style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Cloud Architecture Blueprint (5 columns) */}
          <div className="lg:col-span-5 w-full sticky top-28 hidden lg:block">
            <ArchitectureMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
