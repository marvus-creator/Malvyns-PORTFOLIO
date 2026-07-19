import React, { useEffect, useRef, useState } from 'react';
import { Terminal as TerminalIcon, Cpu, Database, Activity, RefreshCw } from 'lucide-react';
import { audioSynth } from '../utils/audio';

export const TelemetryDashboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cpuLoad, setCpuLoad] = useState(32);
  const [memoryUsage, setMemoryUsage] = useState(4.2);
  const [requestsPerSecond, setRequestsPerSecond] = useState(240);
  const [systemSpeed, setSystemSpeed] = useState(1); // Overclock multiplier
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Telemetry Stream Online',
    '[OK] Connection established with US-East Edge Router',
    '[INFO] Redis cache warming complete (99.8% hit rate)',
  ]);

  const logsPool = [
    '[OK] gRPC Connection pool refreshed successfully',
    '[WARN] Memory spike detected in Auth Service (re-routing)',
    '[INFO] Kubernetes replica scaling triggered (+3 pods)',
    '[OK] PostgreSQL connection health check passed: 2ms',
    '[OK] Docker container garbage collector completed',
    '[INFO] Global CDN cached assets refreshed successfully',
    '[OK] TLS handshake established with EU-West Gateway',
    '[INFO] API latency optimization algorithm applied',
  ];

  // System status metrics loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomize values based on system speed
      const cpuChange = (Math.random() - 0.5) * 10 * systemSpeed;
      const memChange = (Math.random() - 0.5) * 0.4 * systemSpeed;
      const rpsChange = (Math.random() - 0.5) * 50 * systemSpeed;

      setCpuLoad((prev) => Math.max(10, Math.min(99, Math.round(prev + cpuChange))));
      setMemoryUsage((prev) => Math.max(2.1, Math.min(16.0, parseFloat((prev + memChange).toFixed(1)))));
      setRequestsPerSecond((prev) => Math.max(50, Math.min(1500, Math.round(prev + rpsChange))));

      // Randomly append logs
      if (Math.random() > 0.6) {
        const randomLog = logsPool[Math.floor(Math.random() * logsPool.length)];
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${time}] ${randomLog}`, ...prev.slice(0, 5)]);
      }
    }, 1000 / systemSpeed);

    return () => clearInterval(interval);
  }, [systemSpeed]);

  // Telemetry real-time scrolling canvas chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const dataPoints: number[] = Array(50).fill(50);

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add a new point based on current CPU load
      dataPoints.push(cpuLoad);
      if (dataPoints.length > 50) {
        dataPoints.shift();
      }

      // Draw grid lines
      ctx.strokeStyle = 'rgba(215, 226, 234, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.height; i += 25) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw line chart gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(182, 0, 168, 0.4)');
      gradient.addColorStop(1, 'rgba(182, 0, 168, 0)');

      ctx.beginPath();
      const step = canvas.width / 49;
      
      // Start line path
      ctx.moveTo(0, canvas.height);
      dataPoints.forEach((val, index) => {
        const x = index * step;
        // Map 0-100 to canvas height (inverted)
        const y = canvas.height - (val / 100) * (canvas.height - 10);
        ctx.lineTo(x, y);
      });
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw active stroke line
      ctx.beginPath();
      ctx.strokeStyle = '#B600A8';
      ctx.lineWidth = 2;
      dataPoints.forEach((val, index) => {
        const x = index * step;
        const y = canvas.height - (val / 100) * (canvas.height - 10);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [cpuLoad]);

  const handleOverclockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSystemSpeed(val);
    audioSynth.playTick();
  };

  return (
    <div className="w-full max-w-xl bg-[#0D0D0D] border border-[#D7E2EA]/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-left font-mono">
      {/* Top Console Bar */}
      <div className="flex justify-between items-center bg-[#151515] px-4 py-3 border-b border-[#D7E2EA]/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#D7E2EA]/50">
          <Activity className="w-3.5 h-3.5 text-fuchsia-500 animate-pulse" />
          <span>system_telemetry_live.dashboard</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Numerical Telemetry Cards */}
      <div className="grid grid-cols-3 border-b border-[#D7E2EA]/10 bg-black/40">
        <div className="flex flex-col gap-1 p-4 border-r border-[#D7E2EA]/10">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#D7E2EA]/50 font-bold">
            <Cpu className="w-3 h-3 text-fuchsia-500" />
            <span>CPU Load</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-white">{cpuLoad}%</span>
        </div>

        <div className="flex flex-col gap-1 p-4 border-r border-[#D7E2EA]/10">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#D7E2EA]/50 font-bold">
            <Database className="w-3 h-3 text-cyan-500" />
            <span>RAM Used</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-white">{memoryUsage} GB</span>
        </div>

        <div className="flex flex-col gap-1 p-4">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#D7E2EA]/50 font-bold">
            <RefreshCw className="w-3 h-3 text-emerald-500 animate-spin-slow" />
            <span>Throughput</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-white">{requestsPerSecond} rps</span>
        </div>
      </div>

      {/* Line Chart Screen */}
      <div className="p-4 bg-[#080808]">
        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#D7E2EA]/40 mb-2 font-bold select-none">
          <span>Active Core CPU Latency (50ms Interval)</span>
          <span className="text-fuchsia-500">Live Telemetry</span>
        </div>
        <div className="relative w-full h-28 border border-[#D7E2EA]/10 rounded-xl overflow-hidden bg-black/60">
          <canvas ref={canvasRef} width="480" height="112" className="w-full h-full block" />
        </div>
      </div>

      {/* System Logs console */}
      <div className="p-4 bg-black/40 border-t border-[#D7E2EA]/10 flex flex-col gap-2 h-32 overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#D7E2EA]/40 font-bold select-none">
          <TerminalIcon className="w-3 h-3" />
          <span>Active Daemon Orchestration Logs</span>
        </div>
        <div className="flex flex-col gap-1 text-[10px] sm:text-xs text-[#D7E2EA]/75">
          {logs.map((log, idx) => (
            <div key={idx} className="truncate select-text">
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Overclock Controller Slider */}
      <div className="bg-[#151515] p-4 border-t border-[#D7E2EA]/10 flex flex-col gap-2 select-none">
        <div className="flex justify-between items-center text-xs font-bold text-[#D7E2EA]/85">
          <span className="flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
            <span>Overclock System Scaling</span>
          </span>
          <span className="text-amber-500 font-black">{systemSpeed}x Speed</span>
        </div>
        <input
          type="range"
          min="1"
          max="4"
          step="0.5"
          value={systemSpeed}
          onChange={handleOverclockChange}
          className="w-full h-1 bg-black border border-[#D7E2EA]/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <span className="text-[9px] text-[#D7E2EA]/40 uppercase tracking-widest text-center mt-1">
          Warning: Overclocking increases request simulation speeds and log frequencies.
        </span>
      </div>
    </div>
  );
};

export default TelemetryDashboard;
