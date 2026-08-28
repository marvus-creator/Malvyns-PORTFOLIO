import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, Clock, Layers, Sliders, Image } from 'lucide-react';
import { PlaygroundIDE } from './PlaygroundIDE';
import { projectImages } from '../assets/projectImages';
import { audioSynth } from '../utils/audio';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

interface ProjectDetailContent {
  title: string;
  subtitle: string;
  description: string;
  software: string;
  duration: string;
  client: string;
  link: string;
  images: string[];
}

const detailsData: Record<string, ProjectDetailContent> = {
  GAIA: {
    title: 'GAIA',
    subtitle: 'Agri-Intelligence Operating System for Rwanda',
    description:
      'My flagship platform: an agricultural intelligence operating system that unifies five of my systems — satellite credit scoring (TERRA), real-time collaborative mapping (ATLAS), disaster early warning (SENTINEL), crop disease diagnosis (KANOPI), and farmer finance (Imbuto) — into one product. Farmers reach it through the web, mobile, and SMS/USSD, so it works even on feature phones with no internet. It ships with a marketplace, cooperative savings pools, and a Mission Control dashboard for operations. The 2026 web renewal added a full design system, a command palette, a live English/Kinyarwanda toggle, an animated 300–850 credit gauge, and a guided presenter tour that adapts to farmer, lender, and government personas.',
    software: 'TypeScript, React, NestJS, PostGIS, MapLibre, Turborepo, Docker, SMS/USSD',
    duration: 'Solo Build · 2026',
    client: 'Flagship Personal Venture',
    link: 'https://github.com/marvus-creator/GAIA',
    images: projectImages.GAIA,
  },
  'AgriConnect-RW': {
    title: 'AgriConnect-RW',
    subtitle: 'National Agricultural Exchange — Farm-to-Table Marketplace',
    description:
      'The project that started my agri-tech journey: a full marketplace connecting Rwandan farmers directly to urban buyers with no middlemen. Farmers list produce with transparent national pricing, buyers order through a secure escrow system paid via mobile money (MoMo), and verified local drivers bid on delivery routes with live order tracking. It also ships in-app farmer-buyer chat, an AI farming advisor, and USSD access so farmers on feature phones can participate. Imbuto is its fintech sequel.',
    software: 'PHP, MySQL, JavaScript, Mobile Money (MoMo), USSD',
    duration: 'Shipped · 2026',
    client: 'Agri-Commerce Venture',
    link: 'https://github.com/marvus-creator/AgriConnect-RW',
    images: projectImages['AgriConnect-RW'],
  },
  TERRA: {
    title: 'TERRA',
    subtitle: 'Satellite Credit Scoring for Smallholder Farmers',
    description:
      'TERRA scores farmer creditworthiness from space. It analyzes satellite imagery over a farmer’s plots — vegetation indices like NDVI across growing seasons — to build an alternative credit score, unlocking loans for smallholder farmers who have no collateral or formal financial history. Shipped as v1 and later integrated as the credit engine inside GAIA.',
    software: 'Python, Remote Sensing (NDVI), Machine Learning, React',
    duration: 'Shipped v1 · 2026',
    client: 'Open Source',
    link: 'https://github.com/marvus-creator/TERRA',
    images: projectImages.TERRA,
  },
  ATLAS: {
    title: 'ATLAS',
    subtitle: 'Figma for Maps — Real-Time Collaborative Mapping',
    description:
      'A multiplayer mapping studio where teams sketch, annotate, and plan over live maps together, with every cursor and edit synced in real time through CRDTs (Yjs). Built for planners, NGOs, and field teams who need to work on geography the way designers collaborate in Figma. Shipped as v1 and powering the mapping layer of GAIA.',
    software: 'Node.js, Yjs (CRDTs), React, WebSockets',
    duration: 'Shipped v1 · 2026',
    client: 'Open Source',
    link: 'https://github.com/marvus-creator/ATLAS',
    images: projectImages.ATLAS,
  },
  SENTINEL: {
    title: 'SENTINEL',
    subtitle: '3D Digital-Twin Early-Warning System for Rwanda',
    description:
      'A disaster early-warning platform that renders Rwanda as an interactive 3D digital twin and overlays flood and landslide risk, so responders can see danger before it strikes. Terrain, weather signals, and risk models come together in a deck.gl-powered 3D scene. Shipped as v1 and feeding the early-warning alerts inside GAIA.',
    software: 'Python, deck.gl, React, GIS',
    duration: 'Shipped v1 · 2026',
    client: 'Open Source',
    link: 'https://github.com/marvus-creator/SENTINEL',
    images: projectImages.SENTINEL,
  },
  KANOPI: {
    title: 'KANOPI',
    subtitle: 'On-Device Crop Disease Diagnosis from Leaf Photos',
    description:
      'Point a phone camera at a sick leaf and get a diagnosis in seconds — fully on-device. KANOPI runs a compressed vision model in the browser with ONNX Runtime, so it keeps working offline in the field, then gives farmers treatment guidance in plain language. Shipped as v1 and integrated as the crop-health brain of GAIA.',
    software: 'Python, ONNX Runtime, Computer Vision, React',
    duration: 'Shipped v1 · 2026',
    client: 'Open Source',
    link: 'https://github.com/marvus-creator/KANOPI',
    images: projectImages.KANOPI,
  },
  Imbuto: {
    title: 'Imbuto',
    subtitle: 'Agri-Fintech Credit Platform for Farmers',
    description:
      'Imbuto ("seed") turns everyday farm activity — sales, cooperative deliveries, mobile-money patterns — into a transparent, explainable credit score that unlocks input financing before planting season. One platform, seven purpose-built workspaces: farmer, lender, cooperative manager, field agent, buyer, support, and admin each get their own dashboard, from score trends and logging streaks to offer pipelines and portfolio analytics.',
    software: 'React, TypeScript, Vite, Tailwind CSS, Recharts',
    duration: 'In Development · 2026',
    client: 'Fintech Venture',
    link: 'https://github.com/marvus-creator/Imbuto',
    images: projectImages.Imbuto,
  },
};

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  projectName,
}) => {
  const project = detailsData[projectName];
  const [activeTab, setActiveTab] = useState<'gallery' | 'sandbox'>('gallery');

  if (!project) return null;

  const handleTabChange = (tab: 'gallery' | 'sandbox') => {
    setActiveTab(tab);
    audioSynth.playTick();
  };

  const handleCloseClick = () => {
    audioSynth.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseClick}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative w-full max-w-4xl bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[32px] sm:rounded-[48px] p-6 sm:p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] z-10 overflow-y-auto max-h-[90vh] text-[#D7E2EA] font-sans no-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseClick}
              className="absolute top-6 right-6 p-2 rounded-full border border-[#D7E2EA]/20 hover:bg-[#D7E2EA]/10 transition-colors text-[#D7E2EA] cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col gap-2 mb-8 pr-12 text-left">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60 font-bold">
                Project Detail Case Study
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
                {project.title}
              </h3>
              <p className="text-lg text-[#D7E2EA] opacity-85 font-light mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Side: Overview & Specifications (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-6 text-left">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm uppercase tracking-wider font-bold opacity-80 border-b border-[#D7E2EA]/10 pb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-[#D7E2EA]/70">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  <h4 className="text-sm uppercase tracking-wider font-bold opacity-80 border-b border-[#D7E2EA]/10 pb-2">
                    Specifications
                  </h4>

                  <div className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-[#B600A8] flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
                        Tools & Tech
                      </span>
                      <span className="text-sm font-light text-[#D7E2EA]/85">
                        {project.software}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#7621B0] flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
                        Project Duration
                      </span>
                      <span className="text-sm font-light text-[#D7E2EA]/85">
                        {project.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Layers className="w-5 h-5 text-[#BE4C00] flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
                        Client / Context
                      </span>
                      <span className="text-sm font-light text-[#D7E2EA]/85">
                        {project.client}
                      </span>
                    </div>
                  </div>
                </div>

                {/* External Link Button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-semibold uppercase tracking-widest text-xs py-3 px-6 hover:bg-[#D7E2EA]/15 transition-all mt-4 w-full md:w-auto"
                >
                  <span>View Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Right Side: Tabbed Interactive Panel (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-4 h-full">
                {/* Tab Controls */}
                <div className="flex border-b border-[#D7E2EA]/10 pb-2 gap-4">
                  <button
                    onClick={() => handleTabChange('gallery')}
                    className={`flex items-center gap-2 pb-2 text-sm uppercase font-bold tracking-wider relative transition-colors cursor-pointer ${
                      activeTab === 'gallery' ? 'text-white' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'
                    }`}
                  >
                    <Image className="w-4 h-4" />
                    <span>Visual Assets</span>
                    {activeTab === 'gallery' && (
                      <motion.div
                        layoutId="activeModalTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-fuchsia-500"
                      />
                    )}
                  </button>

                  <button
                    onClick={() => handleTabChange('sandbox')}
                    className={`flex items-center gap-2 pb-2 text-sm uppercase font-bold tracking-wider relative transition-colors cursor-pointer ${
                      activeTab === 'sandbox' ? 'text-white' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Interactive IDE</span>
                    {activeTab === 'sandbox' && (
                      <motion.div
                        layoutId="activeModalTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-fuchsia-500"
                      />
                    )}
                  </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === 'gallery' ? (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-2 no-scrollbar rounded-2xl"
                    >
                      {project.images.map((url, i) => (
                        <div
                          key={i}
                          className="overflow-hidden rounded-2xl border border-[#D7E2EA]/10 shadow-lg group"
                        >
                          <img
                            src={url}
                            alt={`${project.title} gallery ${i}`}
                            className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sandbox"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-full h-full"
                    >
                      <PlaygroundIDE />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
