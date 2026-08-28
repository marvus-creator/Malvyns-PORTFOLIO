import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { Tilt } from './Tilt';
import { projectImages } from '../assets/projectImages';

interface ProjectData {
  id: string;
  name: string;
  category: string;
  tech: string[];
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

const projectsList: ProjectData[] = [
  {
    id: '01',
    name: 'GAIA',
    category: 'Flagship · Agri-Intelligence OS',
    tech: ['React', 'TypeScript', 'NestJS', 'PostGIS'],
    images: { col1_1: projectImages.GAIA[0], col1_2: projectImages.GAIA[1], col2: projectImages.GAIA[2] },
  },
  {
    id: '02',
    name: 'AgriConnect-RW',
    category: 'Agri-Commerce Marketplace',
    tech: ['PHP', 'MySQL', 'MoMo', 'USSD'],
    images: { col1_1: projectImages['AgriConnect-RW'][0], col1_2: projectImages['AgriConnect-RW'][1], col2: projectImages['AgriConnect-RW'][2] },
  },
  {
    id: '03',
    name: 'TERRA',
    category: 'Satellite Credit Scoring',
    tech: ['Python', 'React', 'NDVI', 'ML'],
    images: { col1_1: projectImages.TERRA[0], col1_2: projectImages.TERRA[1], col2: projectImages.TERRA[2] },
  },
  {
    id: '04',
    name: 'ATLAS',
    category: 'Real-Time Collaboration',
    tech: ['Node.js', 'Yjs', 'React', 'WebSockets'],
    images: { col1_1: projectImages.ATLAS[0], col1_2: projectImages.ATLAS[1], col2: projectImages.ATLAS[2] },
  },
  {
    id: '05',
    name: 'SENTINEL',
    category: 'Disaster Early-Warning',
    tech: ['Python', 'deck.gl', 'React', 'GIS'],
    images: { col1_1: projectImages.SENTINEL[0], col1_2: projectImages.SENTINEL[1], col2: projectImages.SENTINEL[2] },
  },
  {
    id: '06',
    name: 'KANOPI',
    category: 'On-Device AI',
    tech: ['ONNX', 'React', 'Python', 'Vision'],
    images: { col1_1: projectImages.KANOPI[0], col1_2: projectImages.KANOPI[1], col2: projectImages.KANOPI[2] },
  },
  {
    id: '07',
    name: 'Imbuto',
    category: 'Agri-Fintech',
    tech: ['React', 'TypeScript', 'Recharts'],
    images: { col1_1: projectImages.Imbuto[0], col1_2: projectImages.Imbuto[1], col2: projectImages.Imbuto[2] },
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onLiveProjectClick: (name: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onLiveProjectClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const cardTop = index * 28;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[85vh] flex items-start justify-center"
      style={{
        position: 'sticky',
        top: `calc(5rem + ${cardTop}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
        }}
        className="w-full max-w-5xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-7 md:p-9 flex flex-col gap-5 sm:gap-7 md:gap-9 shadow-[0_25px_60px_rgba(0,0,0,0.9)] h-[72vh] md:h-[75vh]"
      >
        {/* Top Row */}
        <div className="flex flex-row justify-between items-center w-full border-b border-[#D7E2EA]/15 pb-4 sm:pb-5">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Huge Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 8vw, 110px)' }}
            >
              {project.id}
            </span>
            {/* Category & Name */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm uppercase tracking-widest opacity-60 text-[#D7E2EA]">
                  {project.category}
                </span>
                <span className="hidden sm:inline text-[#D7E2EA]/30">•</span>
                <div className="hidden sm:flex items-center gap-1.5">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono bg-[#151515] border border-[#D7E2EA]/10 px-1.5 py-0.5 rounded text-[#D7E2EA]/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="font-bold uppercase text-[#D7E2EA] tracking-wide text-sm sm:text-lg md:text-2xl lg:text-3xl leading-tight mt-1">
                {project.name}
              </h3>
            </div>
          </div>
          {/* Live Project Button */}
          <LiveProjectButton onClick={() => onLiveProjectClick(project.name)} />
        </div>

        {/* Bottom Row - Two Column Image Grid */}
        <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-6 flex-1 overflow-hidden min-h-0">
          {/* Left Column (40% width) - 2 stacked images */}
          <div className="col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-6 h-full min-h-0">
            <div
              className="w-full overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border border-[#D7E2EA]/10 flex-shrink-0"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.images.col1_1}
                alt={`${project.name} detail 1`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div
              className="w-full overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border border-[#D7E2EA]/10 flex-1"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.images.col1_2}
                alt={`${project.name} detail 2`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width) - 1 tall image with 3D tilt */}
          <Tilt
            className="col-span-6 w-full h-full overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border border-[#D7E2EA]/10 group"
            maxTilt={6}
            scale={1.02}
          >
            <img
              src={project.images.col2}
              alt={`${project.name} showcase`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          </Tilt>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onLiveProjectClick: (name: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onLiveProjectClick }) => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-24 pb-[15vh] z-20"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <FadeIn delay={0} y={40} duration={0.8} className="w-full text-center">
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky Cards Stack Container */}
        <div className="w-full flex flex-col gap-[8vh]">
          {projectsList.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projectsList.length}
              onLiveProjectClick={onLiveProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
