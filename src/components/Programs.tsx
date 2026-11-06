import React, { useState } from 'react';
import { Procedural3DCard } from './3d/Procedural3DCard';
import { FitnessProgram } from '../types';
import { Flame, Clock, Zap, ArrowRight, CheckCircle2, Dumbbell, Sparkles } from 'lucide-react';
import { playPlateClickSound } from '../utils/audio';

export const PROGRAMS_DATA: FitnessProgram[] = [
  {
    id: 'bodybuilding',
    title: 'Hypertrophy Mastery',
    tagline: 'Sculpt Dense, Chiseled Musculature',
    category: 'Bodybuilding',
    description: 'An uncompromising 5-day push-pull-legs hyper-volume regimen designed to maximize mechanical tension and metabolic stress for extreme muscle growth.',
    duration: '60 - 75 Mins',
    intensity: 'Extreme',
    caloriesBurn: '650 - 850 kcal',
    focusMuscles: ['Chest', 'Lats', 'Deltoids', 'Quadriceps', 'Biceps/Triceps'],
    features: ['Progressive Overload Tracking', 'Drop-sets & Rest-Pause Protocols', 'Nutritional Macro Breakdown'],
    trainerName: 'Marcus Vance, IFBB Pro',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    badge: 'FLAGSHIP PROGRAM',
    scheduleDays: 'Mon, Tue, Thu, Fri, Sat',
  },
  {
    id: 'weight-training',
    title: 'Powerlifting Iron Forge',
    tagline: 'Raw SBD Absolute Strength',
    category: 'Weight Training',
    description: 'Master the Squat, Bench Press, and Deadlift through periodized percentage training, bar-speed velocity tracking, and core bracing mastery.',
    duration: '75 - 90 Mins',
    intensity: 'High',
    caloriesBurn: '500 - 700 kcal',
    focusMuscles: ['Posterior Chain', 'Spinal Erectors', 'Glutes', 'Upper Back'],
    features: ['Calibrated Competition Plates', 'Velocity-Based Training (VBT)', 'Kinetic Barbell Mechanics'],
    trainerName: 'Elena Rostova, IPF Recordholder',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    badge: 'STRENGTH PILLAR',
    scheduleDays: 'Mon, Wed, Fri, Sun',
  },
  {
    id: 'crossfit',
    title: 'MetCon Velocity',
    tagline: 'Unbreakable Work Capacity',
    category: 'CrossFit',
    description: 'High-octane functional fitness combining gymnastics, Olympic weightlifting, and aerobic intervals. Designed to forge elite endurance under heavy fatigue.',
    duration: '50 - 60 Mins',
    intensity: 'Extreme',
    caloriesBurn: '700 - 950 kcal',
    focusMuscles: ['Full Body Conditioning', 'Core', 'Shoulders', 'Lungs'],
    features: ['Daily WOD Programming', 'Assault Bikes & Concept2 Rowers', 'Heart Rate Zone Display'],
    trainerName: 'David Thorne, Games Competitor',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    badge: 'HIGH BURNOUT',
    scheduleDays: 'Daily Classes (6 AM, 12 PM, 6 PM)',
  },
  {
    id: 'cardio',
    title: 'Anaerobic VO2 Protocol',
    tagline: 'Relentless Engine & Fat Incineration',
    category: 'Cardio Training',
    description: 'Scientifically calibrated sprint intervals, sled drags, and curved treadmill pacing built to expand your lactate threshold and melt stubborn body fat.',
    duration: '45 Mins',
    intensity: 'High',
    caloriesBurn: '600 - 800 kcal',
    focusMuscles: ['Cardiovascular System', 'Hamstrings', 'Calves', 'Abdominals'],
    features: ['Skillmill Motorless Treadmills', 'Sprint Turf Tracks', 'Live MyZone Telemetry'],
    trainerName: 'Sophia Lee, Track & Field Coach',
    image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=800&q=80',
    badge: 'FAT TORCHING',
    scheduleDays: 'Tue, Thu, Sat, Sun',
  },
  {
    id: 'yoga',
    title: 'Bio-Mobility & Athletic Flow',
    tagline: 'Bulletproof Joints & Active Recovery',
    category: 'Yoga & Flexibility',
    description: 'Decompress loaded spinal disks, open tight hip capsules, and dramatically improve thoracic rotation using loaded mobility drills and thermal breathwork.',
    duration: '55 Mins',
    intensity: 'Moderate',
    caloriesBurn: '250 - 400 kcal',
    focusMuscles: ['Hip Flexors', 'Thoracic Spine', 'Ankles', 'Rotator Cuffs'],
    features: ['Infrared Heated Studio', 'Fascial Release Tools', 'Vagus Nerve Breathwork'],
    trainerName: 'Kavita Patel, Mobility Specialist',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    badge: 'RECOVERY ESSENTIAL',
    scheduleDays: 'Wed, Fri, Sun Mornings',
  },
  {
    id: 'personal-training',
    title: 'Private Elite Bespoke Coaching',
    tagline: '1-on-1 Dedicated Human Optimization',
    category: 'Personal Training',
    description: 'Complete 360-degree bespoke concierge fitness. Includes DEXA scan body composition, personalized blood hormone analysis, 3D movement screening, and private suite access.',
    duration: 'Custom Duration',
    intensity: 'Custom',
    caloriesBurn: 'Custom Calibrated',
    focusMuscles: ['Individual Deficits & Peak Goals'],
    features: ['Dedicated Private VIP Studio', 'Weekly DEXA Scan Audit', 'Daily Nutrition Chef Sync'],
    trainerName: 'Master Coach Consultation',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    badge: '100% BESPOKE',
    scheduleDays: 'By Private Appointment',
  },
];

interface ProgramsProps {
  onSelectProgram: (prog: FitnessProgram) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onSelectProgram }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Bodybuilding', 'Weight Training', 'CrossFit', 'Cardio Training', 'Yoga & Flexibility', 'Personal Training'];

  const filteredPrograms =
    activeFilter === 'All'
      ? PROGRAMS_DATA
      : PROGRAMS_DATA.filter((p) => p.category === activeFilter);

  return (
    <section id="programs" className="relative py-28 bg-[#07070a] overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff5500]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#ff1a35]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-[#ff5500] uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5" />
            Elite Training Disciplines
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
            FORGED FOR EVERY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] via-[#ff3b00] to-[#ff1a35]">
              GOAL & PHYSIQUE
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            Engineered by world champions. Every program combines sports biomechanics with real-time biometric tracking to deliver transformative physical adaptation.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playPlateClickSound();
                  setActiveFilter(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white shadow-lg shadow-[#ff5500]/30 scale-105'
                    : 'bg-[#121218] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="h-full">
              <Procedural3DCard className="h-full rounded-3xl overflow-hidden glass-card group">
                <div className="flex flex-col h-full">
                  {/* Card Image with Neon Border & Overlay */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c11] via-[#0c0c11]/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-[#ff5500]/40 text-[10px] font-mono-tech tracking-wider text-[#ff5500] font-bold">
                        {program.badge || program.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono-tech text-zinc-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#ff5500]" />
                        {program.duration}
                      </span>
                    </div>

                    {/* Calorie burn metric */}
                    <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-md bg-[#ff1a35]/90 text-white text-[10px] font-mono-tech font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {program.caloriesBurn}
                      </div>
                      <div className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-zinc-300 text-[10px] font-mono-tech">
                        Intensity: {program.intensity}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow bg-[#0e0e13]">
                    <div>
                      <div className="text-[11px] font-mono-tech uppercase tracking-widest text-zinc-500 mb-1">
                        {program.tagline}
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-white group-hover:text-[#ff5500] transition-colors mb-3">
                        {program.title}
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-5">
                        {program.description}
                      </p>

                      {/* Targeted Muscles pills */}
                      <div className="mb-6">
                        <div className="text-[10px] font-mono-tech uppercase text-zinc-500 mb-1.5">
                          Primary Targets:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {program.focusMuscles.map((muscle, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono-tech px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-300"
                            >
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Explore CTA */}
                    <button
                      onClick={() => {
                        playPlateClickSound();
                        onSelectProgram(program);
                      }}
                      className="w-full py-3 rounded-xl font-heading text-xs sm:text-sm font-bold tracking-widest text-white bg-white/5 group-hover:bg-gradient-to-r group-hover:from-[#ff5500] group-hover:to-[#ff1a35] border border-white/10 group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>EXPLORE PROGRAM DETAILS</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </Procedural3DCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
