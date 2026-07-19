import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Code, Eye, Sparkles } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface Template {
  name: string;
  code: string;
  styles: string;
}

const templates: Record<string, Template> = {
  button: {
    name: 'Cyberpunk Button',
    code: `<button class="relative px-8 py-4 font-bold text-white uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(236,72,153,0.5)] overflow-hidden group" style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)">
  <span class="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
  <span class="relative flex items-center gap-2">
    <span>Launch Server</span>
    <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
  </span>
</button>`,
    styles: 'padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px;',
  },
  particles: {
    name: 'Orbiting Nodes',
    code: `<div class="relative w-36 h-36 border-2 border-dashed border-cyan-500/40 rounded-full flex items-center justify-center animate-spin-slow">
  <!-- Core Node -->
  <div class="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)]">
    <span class="text-[8px] font-mono font-bold text-black">CPU</span>
  </div>
  <!-- Orbiting Node 1 -->
  <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-fuchsia-500 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(217,70,239,0.8)]">
    <span class="text-[7px] text-white">API</span>
  </div>
  <!-- Orbiting Node 2 -->
  <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.8)]">
    <span class="text-[7px] text-white">DB</span>
  </div>
</div>`,
    styles: 'padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: #070707;',
  },
  neon: {
    name: 'Telemetry Bar',
    code: `<div class="w-full max-w-xs bg-black/60 border border-fuchsia-500/30 rounded-2xl p-4 font-mono shadow-[0_0_25px_rgba(182,0,168,0.15)]">
  <div class="flex justify-between text-[10px] text-fuchsia-400 mb-1">
    <span>SYSTEM OVERCLOCK</span>
    <span class="animate-pulse">98.4%</span>
  </div>
  <div class="w-full h-2 bg-zinc-850 rounded-full overflow-hidden border border-fuchsia-500/20">
    <div class="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full" style="width: 98%;"></div>
  </div>
  <div class="flex justify-between text-[8px] text-zinc-500 mt-2">
    <span>CORE TEMP: 42°C</span>
    <span>FAN SPEED: AUTO</span>
  </div>
</div>`,
    styles: 'padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px;',
  },
};

export const PlaygroundIDE: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<keyof typeof templates>('button');
  const [code, setCode] = useState(templates.button.code);
  const [compiledHtml, setCompiledHtml] = useState(templates.button.code);

  useEffect(() => {
    setCode(templates[activeTemplate].code);
    setCompiledHtml(templates[activeTemplate].code);
  }, [activeTemplate]);

  const handleRun = () => {
    setCompiledHtml(code);
    audioSynth.playClick();
  };

  const handleReset = () => {
    setCode(templates[activeTemplate].code);
    setCompiledHtml(templates[activeTemplate].code);
    audioSynth.playTick();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    // Subtle typing audio feedback
    if (Math.random() > 0.4) {
      audioSynth.playTick();
    }
  };

  return (
    <div className="w-full bg-[#080808] border border-[#D7E2EA]/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-mono text-left select-none h-full">
      
      {/* IDE Top Bar */}
      <div className="bg-[#111] px-4 py-3 border-b border-[#D7E2EA]/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
        <span className="text-[10px] text-[#D7E2EA]/40 uppercase tracking-widest font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
          <span>Real-time Code Playground</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="p-1 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer"
            title="Reset Template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRun}
            className="p-1 rounded bg-fuchsia-600/20 hover:bg-fuchsia-600 border border-fuchsia-500 text-fuchsia-300 hover:text-white transition-all cursor-pointer"
            title="Run Compiler"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Template Selector */}
      <div className="bg-[#151515] px-4 py-2 border-b border-[#D7E2EA]/10 flex gap-2 overflow-x-auto no-scrollbar">
        {Object.keys(templates).map((key) => (
          <button
            key={key}
            onClick={() => {
              setActiveTemplate(key);
              audioSynth.playTick();
            }}
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded transition-all cursor-pointer ${
              activeTemplate === key
                ? 'bg-fuchsia-600/20 border border-fuchsia-500 text-fuchsia-400'
                : 'bg-black/40 border border-[#D7E2EA]/10 text-[#D7E2EA]/60 hover:text-white'
            }`}
          >
            {templates[key].name}
          </button>
        ))}
      </div>

      {/* Editor & Preview Split Screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-[300px]">
        
        {/* Editor Console */}
        <div className="flex flex-col border-r border-[#D7E2EA]/10 h-full">
          <div className="bg-[#111] px-4 py-1.5 border-b border-[#D7E2EA]/10 flex items-center gap-1.5 text-[9px] uppercase font-bold text-[#D7E2EA]/50">
            <Code className="w-3 h-3" />
            <span>Interactive HTML/Tailwind Editor</span>
          </div>
          <textarea
            value={code}
            onChange={handleInputChange}
            className="flex-1 w-full bg-[#080808] p-4 text-[11px] text-[#D7E2EA] font-mono leading-relaxed outline-none resize-none select-text focus:bg-[#0c0c0c] transition-colors"
            spellCheck={false}
          />
        </div>

        {/* Live Render Frame */}
        <div className="flex flex-col h-full bg-black/60">
          <div className="bg-[#111] px-4 py-1.5 border-b border-[#D7E2EA]/10 flex items-center gap-1.5 text-[9px] uppercase font-bold text-[#D7E2EA]/50">
            <Eye className="w-3 h-3" />
            <span>Live Compiler Preview</span>
          </div>
          <div
            className="flex-1 w-full overflow-auto flex justify-center items-center relative"
            style={{
              minHeight: '200px',
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
          >
            {/* Compiles and renders the html string dynamically */}
            <div
              className="w-full flex justify-center items-center"
              style={{
                all: 'unset',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
              dangerouslySetInnerHTML={{ __html: compiledHtml }}
            />
          </div>
        </div>

      </div>

    </div>
  );
};

export default PlaygroundIDE;
