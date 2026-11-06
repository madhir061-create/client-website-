import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2, MessageSquare, Shield, Compass, Navigation } from 'lucide-react';
import { playPlateClickSound, playSuccessChime } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'Muscle Hypertrophy & Strength',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activePin, setActivePin] = useState<'main' | 'parking' | 'spa'>('main');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    playSuccessChime();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#09090d] border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ff1a35]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#ff5500]" />
              <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#ff5500]">
                Flagship Arena Access
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-black text-white leading-tight">
              COMMENCE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] to-[#ff1a35]">
                TRANSFORMATION
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm font-light leading-relaxed">
            Ready to train in the world's most advanced 3D fitness facility? Tour our private campus, meet our master coaching faculty, or secure your guest pass.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl flex flex-col justify-between">
            {submitted ? (
              <div className="py-16 flex flex-col items-center text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white mb-2">
                  CONSULTATION REQUEST LOGGED
                </h3>
                <p className="text-zinc-400 text-sm max-w-md mb-8">
                  Welcome, <span className="text-[#ff5500] font-semibold">{formData.name}</span>. A Master Performance Director will contact you within 2 business hours at {formData.phone || formData.email} to confirm your facility orientation.
                </p>
                <button
                  onClick={() => {
                    playPlateClickSound();
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', goal: 'Muscle Hypertrophy & Strength', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-mono-tech text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">
                    SCHEDULE A PRIVATE TOUR
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Complimentary VIP pass & body composition scan included with each private tour.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Thorne"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1.5">
                      Primary Objective
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                    >
                      <option>Muscle Hypertrophy & Strength</option>
                      <option>Competitive Powerlifting / SBD</option>
                      <option>MetCon & High Conditioning</option>
                      <option>Body Fat Incineration & Recomp</option>
                      <option>VIP Private Bespoke Coaching</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-zinc-400 mb-1.5">
                    Your Training Background & Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current lifting split, injuries, or target goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#121218] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#ff5500] via-[#ff3b00] to-[#ff1a35] hover:opacity-95 shadow-xl shadow-[#ff5500]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT TOUR APPLICATION</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Location, Hours & Stylized Interactive Map */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            {/* Location & Opening Hours Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 text-[#ff5500] mb-3">
                  <div className="p-2.5 rounded-xl bg-[#ff5500]/15 border border-[#ff5500]/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono-tech uppercase tracking-wider text-zinc-400">
                    NYC Flagship Arena
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-white">840 HYPERION WAY</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Meatpacking Athletic District, New York, NY 10014
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-mono-tech text-zinc-500">
                  <Navigation className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span>Valet & Private Member Garage</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 text-[#ff1a35] mb-3">
                  <div className="p-2.5 rounded-xl bg-[#ff1a35]/15 border border-[#ff1a35]/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono-tech uppercase tracking-wider text-zinc-400">
                    Access Hours
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-white">24/7 BIOMETRIC ENTRY</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Keyless facial & palm scanner active 365 days a year.
                </p>
                <div className="mt-3 text-[11px] font-mono-tech text-zinc-500">
                  Staffed Concierge: 5:00 AM – 11:00 PM
                </div>
              </div>
            </div>

            {/* Stylized Google Maps Integration / Visualizer */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden relative h-72 sm:h-80 shadow-2xl">
              {/* Interactive Map Iframe styled in dark aesthetic */}
              <iframe
                title="Kinetix Gym Flagship Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12093.414371755106!2d-74.01026027376722!3d40.73778546524314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sMeatpacking%20District%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 filter invert contrast-125 hue-rotate-180 brightness-90 opacity-80"
                loading="lazy"
              />

              {/* Map Floating Card Badge */}
              <div className="absolute top-4 left-4 z-10 bg-[#0c0c11]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-lg flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5500] animate-ping" />
                <div>
                  <div className="text-xs font-heading font-bold text-white">
                    KINETIX HIGH-PERFORMANCE HUB
                  </div>
                  <div className="text-[10px] font-mono-tech text-zinc-400">
                    Valet Parking & Recovery Spa Check-in
                  </div>
                </div>
              </div>

              {/* Direct Directions trigger */}
              <a
                href="https://maps.google.com/?q=Meatpacking+District+New+York"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 z-10 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white text-xs font-heading font-bold tracking-wider shadow-lg flex items-center gap-1.5 hover:scale-105 transition-all"
              >
                <span>OPEN DIRECTIONS</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Contacts Bar */}
            <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-zinc-400">
              <a href="tel:+18005554967" className="flex items-center gap-2 hover:text-[#ff5500] transition-colors">
                <Phone className="w-4 h-4 text-[#ff5500]" />
                <span>+1 (800) 555-KINETIX</span>
              </a>
              <a href="mailto:vip@kinetixultra.com" className="flex items-center gap-2 hover:text-[#ff1a35] transition-colors">
                <Mail className="w-4 h-4 text-[#ff1a35]" />
                <span>concierge@kinetixultra.com</span>
              </a>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>VIP Lines Live 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
