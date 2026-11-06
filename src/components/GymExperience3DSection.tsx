import React, { useState } from 'react';
import { GymEnvironment3D } from './3d/GymEnvironment3D';
import { Sparkles, Compass, Shield, Maximize2, Info, ArrowUpRight } from 'lucide-react';
import { playPlateClickSound } from '../utils/audio';

interface GymExperience3DSectionProps {
  onJoinClick: () => void;
}

export const GymExperience3DSection: React.FC<GymExperience3DSectionProps> = ({ onJoinClick }) => {
  const [selectedEquipmentInfo, setSelectedEquipmentInfo] = useState<{
    name: string;
    desc: string;
  }>({
    name: 'Olympic Heavy Power Rack & Squat Station',
    desc: 'Constructed from 3x3" 11-gauge structural steel with laser-cut numbered pinholes, multi-grip pull-up bar, and safety catches.',
  });

  return (
    <section id="gym-3d" className="relative py-28 bg-[#09090c] border-t border-b border-white/5 overflow-hidden">
      {/* Background ambient neon flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#ff5500]/10 via-[#ff1a35]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-[#ff5500] uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              Virtual Equipment Inspection
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-black text-white leading-tight">
              INTERACTIVE 3D <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ff1a35]">
                GYM ENVIRONMENT
              </span>
            </h2>
          </div>

          <div className="max-w-md text-zinc-400 text-sm font-light leading-relaxed">
            Orbit through our 25,000 sq ft facility. Inspect competition-certified iron, Olympic racks, and calibrated dumbbell lines rendered in full 3D PBR studio lighting.
          </div>
        </div>

        {/* 3D Scene Viewport */}
        <div className="mb-8">
          <GymEnvironment3D
            onSelectEquipment={(name, desc) => {
              playPlateClickSound();
              setSelectedEquipmentInfo({ name, desc });
            }}
          />
        </div>

        {/* Dynamic Equipment Inspector Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#ff5500]/15 border border-[#ff5500]/30 text-[#ff5500]">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono-tech text-[#ff5500] uppercase tracking-widest">
                Currently Inspected Station:
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mt-0.5">
                {selectedEquipmentInfo.name}
              </h3>
              <p className="text-sm text-zinc-400 font-light mt-1 max-w-2xl">
                {selectedEquipmentInfo.desc}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPlateClickSound();
              onJoinClick();
            }}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl font-heading text-xs sm:text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#ff5500] to-[#ff1a35] hover:opacity-90 shadow-lg shadow-[#ff5500]/25 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>TRAIN ON THIS GEAR</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
