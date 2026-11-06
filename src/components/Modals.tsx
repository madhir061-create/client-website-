import React, { useState } from 'react';
import { FitnessProgram, PricingPlan, Trainer } from '../types';
import { X, Check, Flame, Shield, ArrowRight, Calendar, User, Mail, Phone, Sparkles, Activity, Calculator, CheckCircle2 } from 'lucide-react';
import { playPlateClickSound, playSuccessChime } from '../utils/audio';

// 1. Join Gym / Free Pass Modal
interface JoinGymModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: PricingPlan | null;
  isAnnual?: boolean;
}

export const JoinGymModal: React.FC<JoinGymModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  isAnnual = false,
}) => {
  const [step, setStep] = useState<'form' | 'pass'>('form');
  const [formData, setFormData] = useState({
    name: 'Alexander Cross',
    email: 'alexander@example.com',
    phone: '+1 (555) 234-5678',
    membershipType: selectedPlan ? selectedPlan.name : '3-Day VIP Complimentary Trial Pass',
    homeClub: 'New York Flagship (Meatpacking)',
  });
  const [passCode, setPassCode] = useState('KTX-9842-VIP');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    setPassCode(`KTX-${Math.floor(1000 + Math.random() * 9000)}-VIP`);
    setStep('pass');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0d0d12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Neon decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5500]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            playPlateClickSound();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-[#ff5500]" />
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#ff5500]">
                Instant VIP Pass & Membership
              </span>
            </div>
            <h3 className="font-heading text-3xl font-bold text-white mb-1">
              CLAIM YOUR ACCESS PASS
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Experience the full 25,000 sq ft facility, cold plunges, and master coaching.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1">
                  Selected Tier
                </label>
                <div className="p-3 rounded-xl bg-white/5 border border-[#ff5500]/40 flex items-center justify-between">
                  <div className="font-heading text-base font-bold text-white">
                    {selectedPlan ? selectedPlan.name : '3-Day Complimentary VIP Trial Pass'}
                  </div>
                  <span className="text-xs font-mono-tech text-[#ff5500] font-bold">
                    {selectedPlan
                      ? `$${isAnnual ? selectedPlan.annualPrice : selectedPlan.monthlyPrice}/mo`
                      : '$0 FREE'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#14141c] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#14141c] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#14141c] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-2xl font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#ff5500] to-[#ff1a35] hover:opacity-95 shadow-xl shadow-[#ff5500]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>GENERATE VIP DIGITAL KEYCARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 animate-fadeIn">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-3xl font-bold text-white mb-1">
              VIP CREDENTIALS ISSUED
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Present this pass at front-desk concierge or scan at biometric gate turnstiles.
            </p>

            {/* Futuristic Digital Member Pass Card */}
            <div className="relative mx-auto w-full max-w-sm rounded-3xl p-6 bg-gradient-to-br from-[#161622] via-[#0e0e14] to-[#12121c] border-2 border-[#ff5500] box-glow-orange text-left shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#ff5500]" />
                  <span className="font-heading text-lg font-black text-white">KINETIX ULTRA</span>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40 uppercase font-bold">
                  ACTIVE PASS
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div>
                  <div className="text-[9px] font-mono-tech uppercase text-zinc-500">Athlete Name</div>
                  <div className="text-base font-bold text-white font-heading">{formData.name}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-[9px] font-mono-tech uppercase text-zinc-500">Tier</div>
                    <div className="text-xs font-semibold text-zinc-300">
                      {selectedPlan ? selectedPlan.name : '3-Day VIP Guest'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono-tech uppercase text-zinc-500">Location</div>
                    <div className="text-xs font-semibold text-zinc-300">Meatpacking NYC</div>
                  </div>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="h-6 w-36 bg-white/20 rounded flex items-center justify-between px-1">
                    <div className="w-1 h-full bg-white" />
                    <div className="w-2 h-full bg-white" />
                    <div className="w-1 h-full bg-white" />
                    <div className="w-3 h-full bg-white" />
                    <div className="w-1 h-full bg-white" />
                    <div className="w-2 h-full bg-white" />
                    <div className="w-1 h-full bg-white" />
                  </div>
                  <div className="text-[9px] font-mono-tech text-zinc-400 mt-1">{passCode}</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-mono-tech text-emerald-400 uppercase">Valid 72 Hrs</div>
                  <div className="text-[10px] text-zinc-400">All Amenities</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playPlateClickSound();
                onClose();
              }}
              className="mt-6 px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech cursor-pointer transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Program Details Modal
interface ProgramModalProps {
  program: FitnessProgram | null;
  onClose: () => void;
  onJoin: () => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({ program, onClose, onJoin }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0c0c11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            playPlateClickSound();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded bg-[#ff5500]/20 text-[#ff5500] text-xs font-mono-tech font-bold uppercase">
            {program.category}
          </span>
          <span className="text-xs text-zinc-500 font-mono-tech">&bull; {program.duration}</span>
        </div>

        <h3 className="font-heading text-3xl sm:text-4xl font-black text-white mb-1">
          {program.title}
        </h3>
        <p className="text-xs font-mono-tech text-[#ff5500] uppercase tracking-wider mb-4">
          {program.tagline}
        </p>

        <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-6">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c11] via-transparent to-transparent" />
        </div>

        <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
          {program.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
          <div>
            <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">Burn Rate</div>
            <div className="text-sm font-bold text-white font-heading mt-0.5">{program.caloriesBurn}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">Intensity</div>
            <div className="text-sm font-bold text-[#ff5500] font-heading mt-0.5">{program.intensity}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">Schedule</div>
            <div className="text-xs font-bold text-zinc-300 font-mono-tech mt-0.5">{program.scheduleDays}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono-tech text-zinc-500 uppercase">Lead Coach</div>
            <div className="text-xs font-bold text-zinc-300 mt-0.5">{program.trainerName}</div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="text-xs font-mono-tech uppercase tracking-wider text-zinc-400">
            Regimen Protocols:
          </div>
          {program.features.map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
              <Check className="w-4 h-4 text-[#ff5500] shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            playPlateClickSound();
            onClose();
            onJoin();
          }}
          className="w-full py-4 rounded-2xl font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#ff5500] to-[#ff1a35] hover:opacity-95 shadow-xl shadow-[#ff5500]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>ENROLL IN THIS DISCIPLINE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 3. Trainer Booking Modal
interface TrainerBookingModalProps {
  trainer: Trainer | null;
  onClose: () => void;
}

export const TrainerBookingModal: React.FC<TrainerBookingModalProps> = ({ trainer, onClose }) => {
  const [booked, setBooked] = useState(false);
  const [date, setDate] = useState('2026-11-05');
  const [time, setTime] = useState('09:00 AM');

  if (!trainer) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0c0c11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={() => {
            playPlateClickSound();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {booked ? (
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-3xl font-bold text-white mb-2">
              SESSION CONFIRMED
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              Your 1-on-1 private consultation with <span className="text-[#ff5500] font-semibold">{trainer.name}</span> is reserved for {date} at {time}. We will email your digital access pass.
            </p>
            <button
              onClick={() => {
                playPlateClickSound();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-mono-tech text-white bg-white/10 hover:bg-white/20 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-14 h-14 rounded-2xl object-cover border border-[#ff5500]/40"
              />
              <div>
                <div className="text-[10px] font-mono-tech uppercase text-[#ff5500]">Master Coach</div>
                <h3 className="font-heading text-2xl font-bold text-white">{trainer.name}</h3>
                <div className="text-xs text-zinc-400">{trainer.specialty}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 font-light">
              {trainer.bio}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#14141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1">
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#14141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option>07:00 AM</option>
                  <option>09:00 AM</option>
                  <option>12:00 PM</option>
                  <option>03:30 PM</option>
                  <option>06:00 PM</option>
                  <option>07:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1">
                Your Contact Email
              </label>
              <input
                type="email"
                required
                placeholder="athlete@example.com"
                className="w-full bg-[#14141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-heading text-xs font-bold tracking-widest text-white bg-gradient-to-r from-[#ff5500] to-[#ff1a35] hover:opacity-95 shadow-lg shadow-[#ff5500]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>LOCK IN SESSION</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// 4. Calorie & Macro Calculator Modal
interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FitnessCalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState(80); // kg
  const [height, setHeight] = useState(180); // cm
  const [age, setAge] = useState(28);
  const [activity, setActivity] = useState<'moderate' | 'high' | 'extreme'>('high');
  const [goal, setGoal] = useState<'hypertrophy' | 'fatloss' | 'strength'>('hypertrophy');

  if (!isOpen) return null;

  // Harris-Benedict BMR calculation
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const activityMultiplier = activity === 'moderate' ? 1.55 : activity === 'high' ? 1.75 : 1.95;
  const maintenance = Math.round(bmr * activityMultiplier);

  const targetCalories =
    goal === 'hypertrophy'
      ? maintenance + 350
      : goal === 'fatloss'
      ? maintenance - 500
      : maintenance + 150;

  // Macros: 2.2g protein per kg of bodyweight
  const proteinGrams = Math.round(weight * 2.2);
  const proteinCals = proteinGrams * 4;
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const fatCals = fatGrams * 9;
  const carbGrams = Math.max(50, Math.round((targetCalories - (proteinCals + fatCals)) / 4));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0d0d13] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={() => {
            playPlateClickSound();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-[#ff5500]" />
          <span className="text-xs font-mono-tech uppercase tracking-widest text-[#ff5500]">
            Kinetix Biometric Engine
          </span>
        </div>
        <h3 className="font-heading text-3xl font-bold text-white mb-1">
          MACRO & CALORIE CALCULATOR
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Calibrate your daily nutritional intake according to your training volume.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-[10px] font-mono-tech uppercase text-zinc-400 mb-1">
              Body Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || 70)}
              className="w-full bg-[#14141c] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono-tech uppercase text-zinc-400 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || 175)}
              className="w-full bg-[#14141c] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono-tech uppercase text-zinc-400 mb-1">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 25)}
              className="w-full bg-[#14141c] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        {/* Goal & Activity */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-[10px] font-mono-tech uppercase text-zinc-400 mb-1">
              Training Objective
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full bg-[#14141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="hypertrophy">Muscle Hypertrophy (+350 kcal)</option>
              <option value="fatloss">Fat Incineration (-500 kcal)</option>
              <option value="strength">Peak Strength Surplus (+150 kcal)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono-tech uppercase text-zinc-400 mb-1">
              Activity Frequency
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as any)}
              className="w-full bg-[#14141c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="moderate">3 - 4 Heavy Days / Wk</option>
              <option value="high">5 - 6 Elite Days / Wk</option>
              <option value="extreme">2x Daily Pro Training</option>
            </select>
          </div>
        </div>

        {/* Target Results Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#181822] to-[#0e0e14] border border-[#ff5500]/40 box-glow-orange">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono-tech uppercase text-[#ff5500]">Daily Target Energy</span>
              <div className="text-3xl font-heading font-black text-white">{targetCalories} KCAL</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono-tech uppercase text-zinc-400">Maintenance</span>
              <div className="text-sm font-mono-tech text-zinc-300">{maintenance} kcal</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
            <div className="p-2.5 rounded-xl bg-white/5">
              <div className="text-[9px] font-mono-tech uppercase text-zinc-400">Protein</div>
              <div className="text-lg font-heading font-bold text-[#ff5500]">{proteinGrams}g</div>
              <div className="text-[9px] text-zinc-500">2.2g / kg</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5">
              <div className="text-[9px] font-mono-tech uppercase text-zinc-400">Carbs</div>
              <div className="text-lg font-heading font-bold text-white">{carbGrams}g</div>
              <div className="text-[9px] text-zinc-500">Glycogen fuel</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5">
              <div className="text-[9px] font-mono-tech uppercase text-zinc-400">Healthy Fats</div>
              <div className="text-lg font-heading font-bold text-[#ff1a35]">{fatGrams}g</div>
              <div className="text-[9px] text-zinc-500">Hormone support</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            playPlateClickSound();
            onClose();
          }}
          className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech cursor-pointer transition-colors"
        >
          Save & Return to Arena
        </button>
      </div>
    </div>
  );
};
