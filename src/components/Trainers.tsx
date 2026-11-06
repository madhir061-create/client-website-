import React from 'react';
import { Trainer } from '../types';
import { Instagram, Twitter, Youtube, Award, Calendar, ArrowRight, Star } from 'lucide-react';
import { playPlateClickSound } from '../utils/audio';

export const TRAINERS_DATA: Trainer[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Head of Hypertrophy & Physique',
    specialty: 'IFBB Pro Classic Physique & Body Composition',
    experience: '12+ Years Coaching',
    credentials: ['IFBB Pro Cardholder', 'CSCS Certified', 'M.Sc. Sports Kinesiology'],
    bio: 'Specializing in maximum muscular hypertrophy without compromising joint integrity. Has guided over 40 athletes to national bodybuilding podiums.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    socials: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
    },
    clientStats: '450+ Transformations',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Master Strength Coach',
    specialty: 'IPF World Record Powerlifter & SBD Mastery',
    experience: '10+ Years Coaching',
    credentials: ['IPF World Champion', 'USA Powerlifting Senior Coach', 'Eleiko Master Trainer'],
    bio: 'Demystifying the kinetic chain of heavy compound lifting. Expert in bar-speed biomechanics, nervous system recovery, and high-percentage periodization.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    socials: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
    },
    clientStats: '520kg Total Record',
  },
  {
    id: 'david-thorne',
    name: 'David Thorne',
    role: 'Director of Conditioning & MetCon',
    specialty: 'Functional Aerobic Engine & CrossFit Games Finalist',
    experience: '9+ Years Coaching',
    credentials: ['CrossFit Level 3 Coach', 'EXOS Performance Specialist', 'Former Navy SEAL Trainer'],
    bio: 'Dedicated to forging unbreakable psychological grit and unrelenting aerobic power. Runs high-intensity metabolic conditioning circuits daily.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    socials: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
    clientStats: 'CrossFit Games Vet',
  },
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    role: 'Biomechanics & Kinetic Recovery',
    specialty: 'Joint Articulation, Fascial Release & Olympic Lifts',
    experience: '11+ Years Coaching',
    credentials: ['Doctor of Physical Therapy (DPT)', 'FRC Mobility Specialist', 'USAW Senior Coach'],
    bio: 'Ensuring longevity at peak performance. Merges clinical biomechanics with strength training so you lift heavier without pain or inflammation.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
    socials: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
    },
    clientStats: 'Olympic Team Physio',
  },
];

interface TrainersProps {
  onBookTrainer: (trainer: Trainer) => void;
}

export const Trainers: React.FC<TrainersProps> = ({ onBookTrainer }) => {
  return (
    <section id="trainers" className="relative py-28 bg-[#09090d] border-t border-b border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#ff1a35]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#ff5500]" />
              <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#ff5500]">
                The Master Coaching Faculty
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-black text-white leading-tight">
              WORLD-CLASS CHAMPIONS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ff1a35]">
                IN YOUR CORNER
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm font-light leading-relaxed">
            Every coach at Kinetix is a vetted master of physical performance. We don't hire cheerleaders — we deploy elite strategists who guarantee tangible physical breakthroughs.
          </p>
        </div>

        {/* Trainers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRAINERS_DATA.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#ff5500]/40 transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between"
            >
              <div>
                {/* Photo with Overlay */}
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent" />

                  {/* Stat badge */}
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono-tech text-[#ff5500] font-bold">
                    {trainer.clientStats}
                  </div>

                  {/* Social Icons Float */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <a
                      href={trainer.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff5500] transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={trainer.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff5500] transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    {trainer.socials.youtube && (
                      <a
                        href={trainer.socials.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff1a35] transition-colors"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Trainer Info */}
                <div className="p-6">
                  <div className="text-[10px] font-mono-tech uppercase tracking-widest text-[#ff5500] mb-1">
                    {trainer.role}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white group-hover:text-[#ff5500] transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-1.5 line-clamp-2">
                    {trainer.specialty}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                    {trainer.credentials.slice(0, 2).map((cred, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <Award className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    playPlateClickSound();
                    onBookTrainer(trainer);
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-mono-tech tracking-wider text-zinc-200 bg-white/5 hover:bg-gradient-to-r hover:from-[#ff5500] hover:to-[#ff1a35] hover:text-white border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK 1-ON-1 SESSION</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
