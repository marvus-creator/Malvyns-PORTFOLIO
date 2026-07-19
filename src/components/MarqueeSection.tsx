import React from 'react';

const row1Images = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

const row2Images = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const MarqueeSection: React.FC = () => {
  // Duplicating for seamless loop
  const duplicatedRow1 = [...row1Images, ...row1Images];
  const duplicatedRow2 = [...row2Images, ...row2Images];

  return (
    <section className="relative w-full overflow-hidden bg-[#0C0C0C] pt-24 pb-10 select-none">
      {/* Section label */}
      <div className="flex items-center justify-center gap-3 mb-12 px-6">
        <div className="w-8 h-[1px] bg-fuchsia-500" />
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/60 font-bold font-mono">
          Recent Work · 2026
        </span>
        <div className="w-8 h-[1px] bg-fuchsia-500" />
      </div>

      <div className="flex flex-col gap-5 w-full">
        {/* Row 1: Drift RIGHT */}
        <div className="overflow-hidden flex w-full relative group">
           {/* Gradient Fades */}
           <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10" />
           <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10" />
           
          <div className="flex gap-4 animate-drift-right hover:[animation-play-state:paused]">
            {duplicatedRow1.map((url, index) => (
              <div
                key={`row1-${index}`}
                className="relative w-[380px] sm:w-[420px] h-[240px] sm:h-[270px] flex-shrink-0 rounded-3xl overflow-hidden group/tile"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-700 group-hover/tile:scale-110 group-hover/tile:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl group-hover/tile:ring-fuchsia-500/40 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Drift LEFT */}
        <div className="overflow-hidden flex w-full relative group">
           <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10" />
           <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10" />

          <div className="flex gap-4 animate-drift-left hover:[animation-play-state:paused]">
            {duplicatedRow2.map((url, index) => (
              <div
                key={`row2-${index}`}
                className="relative w-[380px] sm:w-[420px] h-[240px] sm:h-[270px] flex-shrink-0 rounded-3xl overflow-hidden group/tile"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-700 group-hover/tile:scale-110 group-hover/tile:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl group-hover/tile:ring-fuchsia-500/40 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drift-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes drift-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-drift-right {
          animation: drift-right 40s linear infinite;
          width: fit-content;
        }
        .animate-drift-left {
          animation: drift-left 40s linear infinite;
          width: fit-content;
        }
      `}</style>
    </section>
  );
};

export default MarqueeSection;
