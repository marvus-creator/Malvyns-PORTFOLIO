import React, { useState } from 'react';
import { Network, Server, Database, Globe, Play, Check } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface NodeInfo {
  title: string;
  role: string;
  tech: string;
  details: string;
}

const nodeDetails: Record<string, NodeInfo> = {
  cdn: {
    title: 'Global CDN / Edge Cache',
    role: 'Static Resource Delivery & TLS Offloading',
    tech: 'Cloudflare, AWS CloudFront',
    details: 'Caches static pages, assets, and images globally near users. Offloads TLS handshake processing and provides robust DDoS mitigation, maintaining sub-30ms load times worldwide.',
  },
  lb: {
    title: 'Load Balancer (Nginx/HAProxy)',
    role: 'Traffic Distribution & Health Checks',
    tech: 'Nginx, HAProxy, AWS ALB',
    details: 'Receives global traffic and routes requests dynamically to healthy API Gateway instances. Employs round-robin and least-connections algorithms for flawless request balancing.',
  },
  gateway: {
    title: 'API Gateway (Go Engine)',
    role: 'Routing, Auth & Rate Limiting',
    tech: 'Go, gRPC, JWT Tokens',
    details: 'Malvyn\'s custom high-throughput Go routing engine. Intercepts all incoming requests, validates tokens in 1ms via Redis Cache, and manages rate limiting before microservice delegation.',
  },
  services: {
    title: 'Microservices Cluster',
    role: 'Core Business Logic & Workflows',
    tech: 'Node.js, Docker, Kubernetes',
    details: 'Decoupled domain-driven microservices running inside containerized Docker pods. Scales horizontally with Kubernetes based on active CPU/memory consumption patterns.',
  },
  database: {
    title: 'Postgres & Redis Stack',
    role: 'Persistent Storage & Ultra-Fast Caching',
    tech: 'PostgreSQL, Redis Cluster',
    details: 'Dual-storage architecture: Redis handles hot session caches and rate limit counters in microseconds, while PostgreSQL securely manages persistent relational data with optimized indexing.',
  },
};

export const ArchitectureMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<keyof typeof nodeDetails>('gateway');
  const [isSimulating, setIsSimulating] = useState(false);

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    audioSynth.playClick();

    // Reset simulation after animation finishes
    setTimeout(() => {
      setIsSimulating(false);
    }, 2800);
  };

  const handleNodeClick = (node: keyof typeof nodeDetails) => {
    setSelectedNode(node);
    audioSynth.playTick();
  };

  return (
    <div className="w-full bg-[#0D0D0D] border border-[#D7E2EA]/25 rounded-[32px] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 font-mono text-left select-none relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Title & Controller */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#D7E2EA]/10 pb-4 z-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA] opacity-60">
            Interactive Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mt-0.5">
            Cloud Systems Blueprint
          </h3>
        </div>
        <button
          onClick={triggerSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 rounded-full border-2 border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500/10 active:scale-95 transition-all py-2 px-5 text-xs font-bold uppercase tracking-widest cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSimulating ? (
            <>
              <span>Data Flowing...</span>
              <div className="w-3 h-3 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              <span>Simulate Request</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </>
          )}
        </button>
      </div>

      {/* Microservices Visual Graph */}
      <div className="relative w-full h-44 sm:h-52 bg-black/40 border border-[#D7E2EA]/10 rounded-2xl flex items-center justify-around px-2 sm:px-4 overflow-hidden z-10">
        
        {/* Connection SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Static paths between nodes */}
          <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="rgba(215, 226, 234, 0.15)" strokeWidth="2" />
          <line x1="30%" y1="50%" x2="50%" y2="50%" stroke="rgba(215, 226, 234, 0.15)" strokeWidth="2" />
          <line x1="50%" y1="50%" x2="70%" y2="50%" stroke="rgba(215, 226, 234, 0.15)" strokeWidth="2" />
          <line x1="70%" y1="50%" x2="90%" y2="50%" stroke="rgba(215, 226, 234, 0.15)" strokeWidth="2" />

          {/* Simulated Glowing Data Packets */}
          {isSimulating && (
            <>
              <circle r="4" fill="#B600A8" className="shadow-lg">
                <animateMotion
                  dur="2.5s"
                  repeatCount="1"
                  path="M 70 100 L 210 100 L 350 100 L 490 100 L 630 100"
                  keyPoints="0;0.25;0.5;0.75;1"
                  keyTimes="0;0.25;0.5;0.75;1"
                  calcMode="linear"
                />
              </circle>
              <circle r="4" fill="#B600A8">
                <animateMotion
                  dur="2.5s"
                  repeatCount="1"
                  path="M 70 100 L 210 100 L 350 100 L 490 100 L 630 100"
                  keyPoints="0;0.25;0.5;0.75;1"
                  keyTimes="0;0.25;0.5;0.75;1"
                  calcMode="linear"
                  begin="0.3s"
                />
              </circle>
            </>
          )}
        </svg>

        {/* Node: CDN */}
        <button
          onClick={() => handleNodeClick('cdn')}
          className={`flex flex-col items-center gap-2 group transition-all relative z-10 cursor-pointer ${
            selectedNode === 'cdn' ? 'scale-110' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
              selectedNode === 'cdn' ? 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_15px_rgba(182,0,168,0.4)]' : 'bg-[#151515] border-[#D7E2EA]/15'
            }`}
          >
            <Globe className="w-5 h-5 text-[#D7E2EA]" />
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#D7E2EA]">
            Edge CDN
          </span>
        </button>

        {/* Node: Load Balancer */}
        <button
          onClick={() => handleNodeClick('lb')}
          className={`flex flex-col items-center gap-2 group transition-all relative z-10 cursor-pointer ${
            selectedNode === 'lb' ? 'scale-110' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
              selectedNode === 'lb' ? 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_15px_rgba(182,0,168,0.4)]' : 'bg-[#151515] border-[#D7E2EA]/15'
            }`}
          >
            <Network className="w-5 h-5 text-[#D7E2EA]" />
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#D7E2EA]">
            Load Bal.
          </span>
        </button>

        {/* Node: API Gateway */}
        <button
          onClick={() => handleNodeClick('gateway')}
          className={`flex flex-col items-center gap-2 group transition-all relative z-10 cursor-pointer ${
            selectedNode === 'gateway' ? 'scale-110' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
              selectedNode === 'gateway' ? 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_15px_rgba(182,0,168,0.4)]' : 'bg-[#151515] border-[#D7E2EA]/15'
            }`}
          >
            <Server className="w-5 h-5 text-[#D7E2EA]" />
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#D7E2EA]">
            API Gateway
          </span>
        </button>

        {/* Node: Microservices */}
        <button
          onClick={() => handleNodeClick('services')}
          className={`flex flex-col items-center gap-2 group transition-all relative z-10 cursor-pointer ${
            selectedNode === 'services' ? 'scale-110' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
              selectedNode === 'services' ? 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_15px_rgba(182,0,168,0.4)]' : 'bg-[#151515] border-[#D7E2EA]/15'
            }`}
          >
            <Server className="w-5 h-5 text-[#D7E2EA]" />
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#D7E2EA]">
            Services
          </span>
        </button>

        {/* Node: Databases */}
        <button
          onClick={() => handleNodeClick('database')}
          className={`flex flex-col items-center gap-2 group transition-all relative z-10 cursor-pointer ${
            selectedNode === 'database' ? 'scale-110' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
              selectedNode === 'database' ? 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_15px_rgba(182,0,168,0.4)]' : 'bg-[#151515] border-[#D7E2EA]/15'
            }`}
          >
            <Database className="w-5 h-5 text-[#D7E2EA]" />
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#D7E2EA]">
            DB Stack
          </span>
        </button>

      </div>

      {/* Node Detail Specifications Panel */}
      <div className="bg-[#080808] border border-[#D7E2EA]/10 rounded-2xl p-5 z-10 flex flex-col gap-3 min-h-[160px]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D7E2EA]/10 pb-2">
          <span className="text-sm font-black uppercase text-white flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            {nodeDetails[selectedNode].title}
          </span>
          <span className="text-[10px] bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            {nodeDetails[selectedNode].tech}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/50 font-bold">
            Primary Objective:
          </span>
          <p className="text-xs font-semibold text-[#D7E2EA]/85">
            {nodeDetails[selectedNode].role}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-[#D7E2EA]/50 font-bold">
            Architectural Detail:
          </span>
          <p className="text-xs font-light text-[#D7E2EA]/70 leading-relaxed">
            {nodeDetails[selectedNode].details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureMap;
