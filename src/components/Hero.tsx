import React, { useState } from 'react';
import { Hero3DBodybuilder } from './3d/Hero3DBodybuilder';
import { ArrowRight, Flame, ShieldCheck, Zap, Sparkles, ChevronDown } from 'lucide-react';
import { playPlateClickSound } from '../utils/audio';

interface HeroProps {
  onJoinClick: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onExplorePrograms }) => {
  const [activeMuscle, setActiveMuscle] = useState<string>('all');

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#070709]">
      {/* Background radial spotlights & grid */}
      <div className="absolute inset-0 bg-gym-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#ff5500]/15 via-[#ff1a35]/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Hero Headline & Lead Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center flex flex-col items-center">
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-inner">
          <Flame className="w-4 h-4 text-[#ff5500]" />
          <span className="text-xs font-mono-tech tracking-[0.2em] text-zinc-300 uppercase">
            Ultra-Premium 3D Fitness Arena
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
          <span className="text-xs font-semibold text-zinc-400">Tokyo &bull; London &bull; NYC</span>
        </div>

        {/* Huge Bold Heading */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-[0.95] drop-shadow-2xl">
          BUILD YOUR{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] via-[#ff3b00] to-[#ff1a35] glow-orange">
            LIMITLESS
          </span>{' '}
          SELF
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-light text-zinc-400 max-w-2xl tracking-wide">
          Stronger Every Day. Better Every Rep.
        </p>

        {/* Animated CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 z-20">
          <button
            onClick={() => {
              playPlateClickSound();
              onJoinClick();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-heading text-base font-bold tracking-widest text-white bg-gradient-to-r from-[#ff5500] via-[#ff3b00] to-[#ff1a35] box-glow-orange hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 group"
          >
            <span>JOIN THE GYM</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              playPlateClickSound();
              onExplorePrograms();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-heading text-base font-bold tracking-widest text-zinc-200 bg-[#121218]/80 hover:bg-[#1a1a24] border border-white/10 hover:border-[#ff5500]/50 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2.5 backdrop-blur-md"
          >
            <span>EXPLORE PROGRAMS</span>
            <Zap className="w-4 h-4 text-[#ff5500]" />
          </button>
        </div>
      </div>

      {/* 3D Muscular Bodybuilder Centerpiece */}
      <div className="relative w-full z-10 -mt-6 sm:-mt-10">
        <Hero3DBodybuilder
          activeMuscleGroup={activeMuscle}
          onSelectMuscle={(m) => {
            playPlateClickSound();
            setActiveMuscle(m);
          }}
        />
      </div>

      {/* Floating Stat Badges on Left & Right */}
      <div className="hidden xl:flex absolute top-1/2 left-8 -translate-y-1/2 z-10 flex-col gap-4 pointer-events-none">
        <div className="bg-[#0e0e14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl max-w-[210px]">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
            <span className="text-[11px] font-mono-tech text-zinc-400 uppercase">Biomechanics</span>
          </div>
          <div className="text-xl font-heading font-bold text-white">100% Olympic Spec</div>
          <div className="text-[11px] text-zinc-500 mt-1">Calibrated Eleiko & Rogue Steel</div>
        </div>

        <div className="bg-[#0e0e14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl max-w-[210px]">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-[#ff1a35]" />
            <span className="text-[11px] font-mono-tech text-zinc-400 uppercase">Hypertrophy</span>
          </div>
          <div className="text-xl font-heading font-bold text-white">Targeted Zones</div>
          <div className="text-[11px] text-zinc-500 mt-1">Click muscle tabs below to isolate</div>
        </div>
      </div>

      <div className="hidden xl:flex absolute top-1/2 right-8 -translate-y-1/2 z-10 flex-col gap-4 pointer-events-none text-right">
        <div className="bg-[#0e0e14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl max-w-[210px]">
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="text-[11px] font-mono-tech text-zinc-400 uppercase">Live Capacity</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="text-xl font-heading font-bold text-white">38% Floor Load</div>
          <div className="text-[11px] text-zinc-500 mt-1">Ideal for peak performance sets</div>
        </div>

        <div className="bg-[#0e0e14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl max-w-[210px]">
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="text-[11px] font-mono-tech text-zinc-400 uppercase">Coaches</span>
            <Sparkles className="w-4 h-4 text-[#ff9100]" />
          </div>
          <div className="text-xl font-heading font-bold text-white">25+ IFBB & Olympians</div>
          <div className="text-[11px] text-zinc-500 mt-1">Tailored elite programming</div>
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-2">
        <a
          href="#about"
          onClick={playPlateClickSound}
          className="flex flex-col items-center text-xs font-mono-tech text-zinc-500 hover:text-[#ff5500] transition-colors cursor-pointer group"
        >
          <span className="tracking-widest uppercase mb-1">Scroll to Enter</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#ff5500]" />
        </a>
      </div>
    </section>
  );
};
