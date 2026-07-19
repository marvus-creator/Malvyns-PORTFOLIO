import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioSynth } from '../utils/audio';

export const SoundToggle: React.FC = () => {
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    audioSynth.enable(nextState);
    if (nextState) {
      // Play welcome chord
      audioSynth.playClick();
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D7E2EA]/15 bg-[#151515]/80 hover:bg-[#1f1f1f]/80 text-[#D7E2EA] text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer select-none"
      title={soundOn ? 'Mute Interface Sounds' : 'Unmute Interface Sounds'}
    >
      {soundOn ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
          <span className="hidden sm:inline text-[#D7E2EA]/80">Audio On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
          <span className="hidden sm:inline text-[#D7E2EA]/50">Audio Off</span>
        </>
      )}
    </button>
  );
};

export default SoundToggle;
