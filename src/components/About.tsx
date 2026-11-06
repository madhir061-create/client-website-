import React, { useEffect, useState, useRef } from 'react';
import { Shield, Target, Trophy, Flame, Dumbbell, Award, ArrowRight, Activity } from 'lucide-react';
import { playPlateClickSound } from '../utils/audio';

interface AboutProps {
  onExplorePrograms: () => void;
}

export const About: React.FC<AboutProps> = ({ onExplorePrograms }) => {
  const [counts, setCounts] = useState({
    members: 0,
    trainers: 0,
    programs: 0,
    years: 0,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedGear, setSelectedGear] = useState<'barbell' | 'kettlebell' | 'dumbbell'>('barbell');

  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        setHasAnimated(true);

        const duration = 2000;
        const steps = 60;
        const intervalTime = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setCounts({
            members: Math.floor(easeOut * 5000),
            trainers: Math.floor(easeOut * 25),
            programs: Math.floor(easeOut * 50),
            years: Math.floor(easeOut * 10),
          });

          if (step >= steps) {
            clearInterval(timer);
            setCounts({ members: 5000, trainers: 25, programs: 50, years: 10 });
          }
        }, intervalTime);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const gearSpecs = {
    barbell: {
      name: 'Olympic Needle-Bearing Barbell',
      spec: '20kg / 28mm shaft with 215,000 PSI tensile strength and friction welded sleeves.',
      load: '1,500 LBS MAX',
      accent: '#ff5500',
    },
    kettlebell: {
      name: 'Competition Solid Cast Kettlebells',
      spec: 'Single-piece gravitational cast iron with color-coded standardized competition handles.',
      load: '8KG TO 48KG',
      accent: '#ff1a35',
    },
    dumbbell: {
      name: 'Machined Hex Polyurethane Dumbbells',
      spec: 'Anti-roll urethane heads press-fitted to hard chrome contoured knurled handles.',
      load: '5LB TO 150LB',
      accent: '#ff9100',
    },
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-28 bg-[#09090d] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#ff5500]" />
              <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#ff5500]">
                The Kinetix Philosophy
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
              WHERE HUMAN POTENTIAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ff1a35]">
                TRANSCENDS LIMITS
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-base font-light leading-relaxed">
            Founded for athletes, warriors, and everyday champions who demand uncompromising quality. 
            We fused industrial biomechanics with elite sports science to create the pinnacle training ground.
          </p>
        </div>

        {/* Statistics with Animated Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            {
              count: `${counts.members.toLocaleString()}+`,
              label: 'Active Members',
              desc: 'Dedicated to relentless self-mastery',
              border: 'border-[#ff5500]/30',
              glow: 'hover:shadow-[#ff5500]/20',
            },
            {
              count: `${counts.trainers}+`,
              label: 'Expert Trainers',
              desc: 'Olympians, IFBB pros & kinesiology PhDs',
              border: 'border-[#ff1a35]/30',
              glow: 'hover:shadow-[#ff1a35]/20',
            },
            {
              count: `${counts.programs}+`,
              label: 'Fitness Programs',
              desc: 'Targeted for strength, speed & hypertrophy',
              border: 'border-[#ff9100]/30',
              glow: 'hover:shadow-[#ff9100]/20',
            },
            {
              count: `${counts.years}+`,
              label: 'Years Experience',
              desc: 'Defining luxury athletic standards',
              border: 'border-white/20',
              glow: 'hover:shadow-white/10',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`glass-card p-6 sm:p-8 rounded-3xl border ${stat.border} transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${stat.glow}`}
            >
              <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                {stat.count}
              </div>
              <div className="text-sm sm:text-base font-semibold text-zinc-200 uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-zinc-400 font-light">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* 3D Fitness Equipment Visualizer & Brand Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Equipment Visualizer */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 z-10">
              <div>
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#ff5500]">
                  Industrial Grade Equipment
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                  CALIBRATED HEAVY IRON
                </h3>
              </div>

              {/* Selector Tabs */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                {(['barbell', 'kettlebell', 'dumbbell'] as const).map((gear) => (
                  <button
                    key={gear}
                    onClick={() => {
                      playPlateClickSound();
                      setSelectedGear(gear);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-tech capitalize transition-all cursor-pointer ${
                      selectedGear === gear
                        ? 'bg-[#ff5500] text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {gear}
                  </button>
                ))}
              </div>
            </div>

            {/* Visualizer Display Box */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-gradient-to-b from-[#14141c] to-[#0c0c11] border border-white/5 flex items-center justify-center overflow-hidden my-4">
              <div className="absolute inset-0 bg-gym-grid opacity-30" />
              <div className="absolute w-44 h-44 rounded-full bg-[#ff5500]/10 blur-2xl pointer-events-none" />

              {/* Stylized Procedural Graphic for selected gear */}
              {selectedGear === 'barbell' && (
                <div className="relative flex items-center justify-center flex-col animate-fadeIn">
                  <div className="w-72 sm:w-96 h-4 bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500 rounded-full shadow-lg relative flex items-center justify-between px-8">
                    {/* Bumper plates left */}
                    <div className="absolute left-4 flex gap-1 items-center">
                      <div className="w-3 h-28 bg-[#ff1a35] rounded border border-white/20 shadow-md shadow-[#ff1a35]/30" />
                      <div className="w-3 h-28 bg-[#ff5500] rounded border border-white/20 shadow-md shadow-[#ff5500]/30" />
                      <div className="w-2.5 h-24 bg-blue-600 rounded border border-white/20" />
                    </div>
                    {/* Knurl marks */}
                    <div className="w-24 h-full bg-zinc-700/60 rounded" />
                    <div className="w-24 h-full bg-zinc-700/60 rounded" />
                    {/* Bumper plates right */}
                    <div className="absolute right-4 flex gap-1 items-center">
                      <div className="w-2.5 h-24 bg-blue-600 rounded border border-white/20" />
                      <div className="w-3 h-28 bg-[#ff5500] rounded border border-white/20 shadow-md shadow-[#ff5500]/30" />
                      <div className="w-3 h-28 bg-[#ff1a35] rounded border border-white/20 shadow-md shadow-[#ff1a35]/30" />
                    </div>
                  </div>
                  <div className="mt-8 text-xs font-mono-tech text-zinc-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
                    IPF Certified 20KG Olympic Competition Bar
                  </div>
                </div>
              )}

              {selectedGear === 'kettlebell' && (
                <div className="relative flex flex-col items-center justify-center animate-fadeIn">
                  <div className="relative flex flex-col items-center">
                    {/* Handle */}
                    <div className="w-28 h-16 border-4 border-zinc-400 rounded-t-full bg-transparent" />
                    {/* Ball */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-white/20 shadow-2xl flex items-center justify-center -mt-2 relative">
                      <div className="text-xl font-heading font-black text-[#ff1a35]">32 KG</div>
                      <div className="absolute bottom-3 text-[9px] font-mono-tech text-zinc-500">KINETIX CAST</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedGear === 'dumbbell' && (
                <div className="relative flex items-center justify-center gap-2 animate-fadeIn">
                  {/* Left Hex */}
                  <div className="w-20 h-28 bg-[#181820] rounded-xl border border-white/20 flex items-center justify-center shadow-2xl">
                    <span className="font-heading text-lg font-bold text-white -rotate-90">100 LB</span>
                  </div>
                  {/* Chrome Handle */}
                  <div className="w-24 h-5 bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-400 rounded-sm shadow-md" />
                  {/* Right Hex */}
                  <div className="w-20 h-28 bg-[#181820] rounded-xl border border-white/20 flex items-center justify-center shadow-2xl">
                    <span className="font-heading text-lg font-bold text-white rotate-90">100 LB</span>
                  </div>
                </div>
              )}
            </div>

            {/* Spec footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10 z-10">
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  {gearSpecs[selectedGear].name}
                </h4>
                <p className="text-xs text-zinc-400">{gearSpecs[selectedGear].spec}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono-tech text-zinc-500 uppercase">Load Rating</span>
                <div className="text-sm font-heading font-bold text-[#ff5500]">
                  {gearSpecs[selectedGear].load}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Core Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              {
                icon: Activity,
                title: 'Biomechanical Optimality',
                text: 'Every angle, pivot point, and cable resistance curve is tuned to reduce joint strain and maximize target hypertrophy.',
                accent: 'text-[#ff5500]',
              },
              {
                icon: Shield,
                title: 'Cryo & Contrast Recovery',
                text: 'Finish your training in our Finnish cedar saunas, 42°F cold plunges, and normatec compression recovery lounge.',
                accent: 'text-[#ff1a35]',
              },
              {
                icon: Trophy,
                title: 'Athletic Brotherhood',
                text: 'An uncompromising community of serious lifters and peak-performers where mediocrity has no place.',
                accent: 'text-[#ff9100]',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="glass-card p-6 rounded-3xl border border-white/10 hover:border-[#ff5500]/40 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${pillar.accent}`} />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-bold text-white mb-1.5 group-hover:text-[#ff5500] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => {
                playPlateClickSound();
                onExplorePrograms();
              }}
              className="mt-2 w-full py-4 rounded-2xl font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#ff5500] to-[#ff1a35] hover:opacity-95 transition-all shadow-lg shadow-[#ff5500]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>VIEW ALL 50+ TRAINING REGIMENS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
