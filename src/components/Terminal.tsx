import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'system-init',
      output: (
        <div className="text-emerald-400 font-mono text-xs sm:text-sm">
          [OK] Malvyn Kernel loaded successfully.<br />
          [OK] Type <span className="text-fuchsia-400 font-bold">help</span> or click the chips below to explore!
        </div>
      ),
    },
  ]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-scroll to bottom on history change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Matrix screensaver code rain
  useEffect(() => {
    if (!isMatrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = 350;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabet = katakana.split('');

    const fontSize = 12;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 12, 12, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrixActive]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    let response: React.ReactNode = null;

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      setIsMatrixActive(false);
      return;
    }

    if (trimmed === 'matrix') {
      setIsMatrixActive(true);
      setHistory((prev) => [
        ...prev,
        {
          command: cmdText,
          output: <span className="text-emerald-400 font-mono">[Matrix digital rain initialized. Click close/clear to exit]</span>,
        },
      ]);
      setInput('');
      return;
    }

    setIsMatrixActive(false);

    switch (trimmed) {
      case 'help':
        response = (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#D7E2EA]/80 mt-1">
            <div><span className="text-fuchsia-400">about</span> - Detailed bio & core philosophy</div>
            <div><span className="text-fuchsia-400">skills</span> - Renders skill expertise levels</div>
            <div><span className="text-fuchsia-400">neofetch</span> - System profile & specs</div>
            <div><span className="text-fuchsia-400">matrix</span> - Digital rain screen saver</div>
            <div><span className="text-fuchsia-400">clear</span> - Resets the terminal logs</div>
          </div>
        );
        break;
      case 'about':
        response = (
          <p className="text-xs sm:text-sm font-mono text-left leading-relaxed text-[#D7E2EA]/80 mt-1">
            Hi, I&apos;m Malvyn, a creative software engineer dedicated to designing high-performance architecture, clean microservices, and immersive interactive graphics. I balance robust engineering principles with cutting-edge front-end design to build products that stand out.
          </p>
        );
        break;
      case 'skills':
        response = (
          <div className="flex flex-col gap-1.5 font-mono text-xs sm:text-sm mt-1">
            <div>Frontend:  [████████████████████] 98%</div>
            <div>Backend:   [██████████████████░░] 88%</div>
            <div>Shaders/3D:[████████████████░░░░] 80%</div>
            <div>DevOps/K8s:[██████████████░░░░░░] 70%</div>
          </div>
        );
        break;
      case 'neofetch':
        response = (
          <div className="flex flex-row gap-6 font-mono text-xs sm:text-sm mt-2 items-start text-left">
            <div className="text-fuchsia-400 hidden sm:block font-bold">
              /\/\<br />
              \ \ \<br />
              / / /<br />
              \/\/<br />
            </div>
            <div>
              <span className="text-fuchsia-400 font-bold">malvyn@root</span><br />
              -----------------------<br />
              <span className="text-cyan-400">OS:</span> MalvynOS v2026.1<br />
              <span className="text-cyan-400">Shell:</span> ReactTS Terminal v1.4<br />
              <span className="text-cyan-400">Uptime:</span> 5 Years of Development<br />
              <span className="text-cyan-400">Tech Stack:</span> React, Go, Node, Three.js, Docker<br />
              <span className="text-cyan-400">Focus:</span> Immersive Web Apps & Cloud Scaling
            </div>
          </div>
        );
        break;
      default:
        response = (
          <span className="text-rose-400 font-mono">
            Command not found: &apos;{cmdText}&apos;. Type &apos;help&apos; for list.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <div className="w-full max-w-xl bg-[#0D0D0D] border border-[#D7E2EA]/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left">
      {/* Top Header / Bar */}
      <div className="flex justify-between items-center bg-[#151515] px-4 py-3 border-b border-[#D7E2EA]/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#D7E2EA]/50 font-mono">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>malvyn_terminal.sh</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Terminal Display */}
      <div className="relative p-4 h-[300px] sm:h-[350px] overflow-y-auto flex flex-col gap-3 font-mono no-scrollbar bg-black/40">
        {/* Interactive Matrix Layer */}
        {isMatrixActive && (
          <div className="absolute inset-0 z-10 bg-black">
            <canvas ref={matrixCanvasRef} className="w-full h-full block" />
            <button
              onClick={() => {
                setIsMatrixActive(false);
                setHistory((prev) => [...prev, { command: 'exit-matrix', output: <span className="text-emerald-400 font-mono">Matrix rain disabled.</span> }]);
              }}
              className="absolute top-4 right-4 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500 text-emerald-400 text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Close Matrix
            </button>
          </div>
        )}

        {/* History Logs */}
        {history.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#D7E2EA]/70 text-xs sm:text-sm">
              <ChevronRight className="w-3.5 h-3.5 text-fuchsia-400" />
              <span className="font-semibold text-cyan-400">malvyn@root</span>
              <span className="opacity-50">~$</span>
              <span className="font-bold">{item.command}</span>
            </div>
            <div className="pl-5">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Access Chips */}
      <div className="bg-[#151515] p-3 border-t border-[#D7E2EA]/10 flex flex-wrap gap-2 items-center select-none">
        <span className="text-[10px] uppercase font-bold tracking-wider opacity-50 pr-1 text-[#D7E2EA]">
          Quick:
        </span>
        {['about', 'skills', 'neofetch', 'matrix', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="text-[11px] font-mono bg-black/40 hover:bg-[#B600A8]/20 border border-[#D7E2EA]/15 hover:border-[#B600A8]/50 text-[#D7E2EA]/80 hover:text-white px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-1.5 bg-[#080808] px-4 py-3 border-t border-[#D7E2EA]/10 font-mono text-xs sm:text-sm">
        <ChevronRight className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
        <span className="font-semibold text-cyan-400 flex-shrink-0">malvyn@root</span>
        <span className="opacity-50 flex-shrink-0">~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command and press Enter..."
          className="flex-1 bg-transparent border-none outline-none text-[#D7E2EA] placeholder-[#D7E2EA]/30 caret-fuchsia-400 font-bold"
        />
      </div>
    </div>
  );
};

export default Terminal;
