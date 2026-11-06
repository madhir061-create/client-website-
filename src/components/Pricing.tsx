import React, { useState } from 'react';
import { PricingPlan } from '../types';
import { Check, X, Flame, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { playPlateClickSound } from '../utils/audio';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Membership',
    tagline: 'Essential Heavy Iron Access',
    monthlyPrice: 49,
    annualPrice: 39,
    accentColor: '#ffffff',
    perks: [
      'Unlimited Gym Floor Access (5 AM - 11 PM)',
      'Full Olympic Free Weights & Power Racks',
      'Locker Room & High-Pressure Showers',
      'Kinetix Mobile App Workout Logger',
      'Free High-Speed Wi-Fi & Lounge Access',
    ],
    notIncluded: [
      'Cold Plunge & Cedar Sauna Access',
      'Weekly Group Fitness & MetCon Classes',
      'Monthly InBody Body Composition Scans',
      'Private 1-on-1 Personal Training Session',
    ],
    ctaText: 'CHOOSE BASIC',
  },
  {
    id: 'pro',
    name: 'Pro Membership',
    tagline: 'Peak Athletic Performance',
    monthlyPrice: 89,
    annualPrice: 69,
    highlighted: true,
    accentColor: '#ff5500',
    badge: 'MOST POPULAR',
    perks: [
      '24/7 Biometric Keyless Gym Floor Access',
      'Full Access to All 50+ Group Fitness Classes',
      'Thermal Recovery: 42°F Cold Plunge & Saunas',
      'Monthly InBody 570 Body Composition Analysis',
      'Guest Pass: Bring a Friend Twice a Month',
      'HydroMassage & Cryo-Lounge Access',
      '15% Discount at Kinetix Fuel & Protein Bar',
    ],
    notIncluded: [
      'Dedicated Private Training Suite',
      'Weekly 1-on-1 IFBB Coach Sessions',
    ],
    ctaText: 'CLAIM PRO MEMBERSHIP',
  },
  {
    id: 'elite',
    name: 'Elite Membership',
    tagline: 'Uncompromising VIP Luxury',
    monthlyPrice: 149,
    annualPrice: 119,
    accentColor: '#ff1a35',
    badge: 'ALL-INCLUSIVE VIP',
    perks: [
      'All Pro Membership Features Included',
      '2x Monthly 1-on-1 Private Coaching Sessions',
      'Quarterly Medical DEXA Scan Bone & Fat Audit',
      'Dedicated Private VIP Locker with Laundry Service',
      'Unlimited Guest Passes (Always Welcome)',
      'Complimentary Pre-Workout & Post-Shake Daily',
      'Priority Booking for Recovery & Sports Massage',
      'Exclusive Access to Tokyo & London Global Clubs',
    ],
    ctaText: 'EXPERIENCE ELITE VIP',
  },
];

interface PricingProps {
  onSelectPlan: (plan: PricingPlan, isAnnual: boolean) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-28 bg-[#070709] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#ff5500]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-[#ff5500] uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Luxury Tiers
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
            INVEST IN YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] via-[#ff3b00] to-[#ff1a35]">
              PHYSICAL EMPIRE
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light">
            No hidden fees. No cancellation traps. Just elite equipment, science-backed recovery, and an uncompromising atmosphere.
          </p>

          {/* Billing Switcher (Monthly vs Annual) */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-[#111117] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => {
                playPlateClickSound();
                setIsAnnual(false);
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => {
                playPlateClickSound();
                setIsAnnual(true);
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isAnnual
                  ? 'bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-[#181822] to-[#0e0e14] border-2 border-[#ff5500] box-glow-orange lg:-translate-y-4 scale-[1.02]'
                    : 'glass-card border border-white/10 hover:border-white/20 hover:-translate-y-2'
                }`}
              >
                {/* Highlight Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white text-[11px] font-mono-tech font-bold uppercase tracking-widest shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 sm:p-10">
                  <div className="text-xs font-mono-tech uppercase tracking-widest text-[#ff5500] mb-2">
                    {plan.tagline}
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-4">
                    {plan.name}
                  </h3>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 my-6">
                    <span className="font-heading text-2xl font-light text-zinc-400">$</span>
                    <span className="font-heading text-6xl font-black text-white tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs font-mono-tech text-zinc-400">
                      / month {isAnnual && '(billed annually)'}
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-white/10 my-6" />

                  {/* Included Perks */}
                  <div className="space-y-3.5 mb-6">
                    <div className="text-[11px] font-mono-tech uppercase tracking-wider text-zinc-400 font-semibold">
                      What's Included:
                    </div>
                    {plan.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 p-1 rounded-full bg-[#ff5500]/15 text-[#ff5500] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-zinc-300 font-light">{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* Not Included */}
                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="space-y-2.5 pt-4 border-t border-white/5">
                      {plan.notIncluded.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 opacity-40">
                          <div className="mt-0.5 p-1 rounded-full bg-white/5 text-zinc-500 shrink-0">
                            <X className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs text-zinc-500 line-through">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div className="p-8 sm:p-10 pt-0">
                  <button
                    onClick={() => {
                      playPlateClickSound();
                      onSelectPlan(plan, isAnnual);
                    }}
                    className={`w-full py-4 rounded-2xl font-heading text-sm font-bold tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white shadow-xl shadow-[#ff5500]/30 hover:scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guaranteed Satisfaction Guarantee */}
        <div className="mt-14 max-w-xl mx-auto text-center flex items-center justify-center gap-3 text-xs text-zinc-400 bg-white/5 py-3 px-6 rounded-2xl border border-white/5">
          <Shield className="w-4 h-4 text-[#ff5500]" />
          <span>14-Day 100% Unconditional Money-Back Guarantee on all memberships.</span>
        </div>
      </div>
    </section>
  );
};
