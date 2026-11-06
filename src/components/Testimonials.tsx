import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { Star, ChevronLeft, ChevronRight, Quote, Flame, Award, CheckCircle } from 'lucide-react';
import { playPlateClickSound } from '../utils/audio';

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Alexander Ward',
    role: 'Tech Executive & Competitive Powerlifter',
    transformation: '+22 lbs Lean Muscle / 585lb Deadlift',
    rating: 5,
    quote: 'KINETIX is the only gym I have trained at where the atmosphere commands 100% focus from the moment you step through the biometric doors. The 3D biomechanics coaching with Marcus reconstructed my squat mechanics and kept me injury-free.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    duration: 'Member for 2 Years',
    badge: 'VERIFIED MEMBER TRANSFORMATION',
  },
  {
    id: 'test-2',
    name: 'Natasha Romanov',
    role: 'Biomedical Engineer & CrossFit Athlete',
    transformation: '-38 lbs Body Fat / Sub-3hr Marathon',
    rating: 5,
    quote: 'The contrast therapy cold plunge and infrared cedar saunas are total game changers. My central nervous system recovers twice as fast between grueling MetCon workouts. The equipment calibration is second to none.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    duration: 'Member for 18 Months',
    badge: 'ELITE ATHLETE',
  },
  {
    id: 'test-3',
    name: 'Darius Kelling',
    role: 'Orthopedic Surgeon & Masters Bodybuilder',
    transformation: '7% Body Fat / First Classic Physique Trophy',
    rating: 5,
    quote: 'As an orthopedic surgeon, I scrutinize equipment angles with extreme rigor. The resistance profiles on Kinetix plate-loaded machines match the natural human strength curve flawlessly. No impingement, only pure hypertrophy.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    duration: 'Member for 3 Years',
    badge: 'COMPETITION PODIUM',
  },
  {
    id: 'test-4',
    name: 'Serena Vance',
    role: 'Venture Capitalist & Hyrox Competitor',
    transformation: '+40% VO2 Max / Hyrox National Qualifier',
    rating: 5,
    quote: 'The 24/7 access and private recovery suites give me absolute freedom to train at 5:00 AM before board meetings. It feels like an ultra-luxury private athletic club without the pretension—just serious results.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    duration: 'Member for 1 Year',
    badge: 'HYROX QUALIFIER',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    playPlateClickSound();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    playPlateClickSound();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 bg-[#07070a] overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-[#ff5500]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-[#ff5500] uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5" />
            Proven Transformations
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
            STORIES OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ff1a35]">
              METAMORPHOSIS
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            Real members. Unforgiving standards. Tangible metrics that prove the Kinetix methodology.
          </p>
        </div>

        {/* Testimonial Showcase Slider Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative shadow-2xl overflow-hidden">
            {/* Ambient Watermark Quote Icon */}
            <Quote className="absolute right-8 bottom-6 w-36 h-36 text-white/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
              {/* Member Avatar & Transformation Badge */}
              <div className="flex flex-col items-center text-center shrink-0">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-[#ff5500] to-[#ff1a35] shadow-xl shadow-[#ff5500]/20">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover rounded-[20px]"
                  />
                </div>
                <div className="mt-3 px-3 py-1 rounded-full bg-[#ff5500]/15 border border-[#ff5500]/30 text-[10px] font-mono-tech text-[#ff5500] font-bold">
                  {current.badge}
                </div>
              </div>

              {/* Quote & Details */}
              <div className="flex flex-col justify-between">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ff9100] text-[#ff9100]" />
                  ))}
                  <span className="ml-2 text-xs font-mono-tech text-zinc-400">
                    5.0 / 5.0 Rating
                  </span>
                </div>

                {/* Main Quote */}
                <p className="text-base sm:text-xl font-light text-zinc-200 leading-relaxed italic mb-6">
                  "{current.quote}"
                </p>

                {/* Author Info & Verified Transformation Metric */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                      {current.name}
                    </h3>
                    <div className="text-xs text-zinc-400 font-mono-tech">{current.role}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-heading font-bold text-[#ff5500]">
                      {current.transformation}
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono-tech">{current.duration}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Navigation Controls */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playPlateClickSound();
                      setIsAutoPlay(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 bg-gradient-to-r from-[#ff5500] to-[#ff1a35]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title="Previous Story"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white shadow-lg shadow-[#ff5500]/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Next Story"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
