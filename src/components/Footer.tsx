import React, { useState } from 'react';
import { Flame, Instagram, Twitter, Youtube, Music, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { playPlateClickSound, playSuccessChime } from '../utils/audio';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    playSuccessChime();
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#050508] border-t border-white/10 pt-20 pb-12 overflow-hidden text-zinc-400">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#ff5500]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#ff1a35] p-0.5 shadow-lg shadow-[#ff5500]/30">
                <div className="w-full h-full bg-[#0c0c10] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#ff5500]" />
                </div>
              </div>
              <div>
                <span className="font-heading text-2xl font-black tracking-wider text-white flex items-center gap-1.5">
                  KINETIX
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/30">
                    ULTRA
                  </span>
                </span>
                <div className="text-[9px] font-mono-tech uppercase tracking-[0.22em] text-zinc-500">
                  Limitless Athletics
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              The premier destination for high-performance training, biomechanical science, and luxury recovery. Forged for athletes who accept zero compromise.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#ff5500] hover:text-white border border-white/10 flex items-center justify-center transition-colors text-zinc-400"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#ff1a35] hover:text-white border border-white/10 flex items-center justify-center transition-colors text-zinc-400"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#ff5500] hover:text-white border border-white/10 flex items-center justify-center transition-colors text-zinc-400"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                title="Kinetix Official Heavy Lifting Workout Playlist"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 flex items-center justify-center transition-colors text-zinc-400"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#programs" className="hover:text-[#ff5500] transition-colors">Bodybuilding Split</a></li>
              <li><a href="#programs" className="hover:text-[#ff5500] transition-colors">Powerlifting SBD</a></li>
              <li><a href="#programs" className="hover:text-[#ff5500] transition-colors">CrossFit & MetCon</a></li>
              <li><a href="#programs" className="hover:text-[#ff5500] transition-colors">Anaerobic Sprint Turf</a></li>
              <li><a href="#programs" className="hover:text-[#ff5500] transition-colors">Cold Plunge & Sauna</a></li>
              <li><a href="#programs" className="hover:text-[#ff5500] transition-colors">DEXA Body Scans</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-[#ff5500] transition-colors">3D Experience</a></li>
              <li><a href="#about" className="hover:text-[#ff5500] transition-colors">About Kinetix</a></li>
              <li><a href="#gym-3d" className="hover:text-[#ff5500] transition-colors">3D Equipment Sim</a></li>
              <li><a href="#pricing" className="hover:text-[#ff5500] transition-colors">Membership Tiers</a></li>
              <li><a href="#trainers" className="hover:text-[#ff5500] transition-colors">Master Coaches</a></li>
              <li><a href="#contact" className="hover:text-[#ff5500] transition-colors">Book Private Tour</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              KINETIX DISPATCH
            </h4>
            <p className="text-xs text-zinc-400 font-light">
              Receive weekly evidence-based sports science protocols, hypertrophy research, and training splits directly from our head coaches.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Subscription confirmed. Check your inbox for the Volume Guide.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-[#121218] border border-white/10 focus:border-[#ff5500] rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none flex-grow"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white text-xs font-bold font-heading tracking-wider hover:opacity-90 transition-opacity shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span>JOIN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-2 text-[10px] font-mono-tech text-zinc-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero spam. Strict privacy & encryption standards.</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Global Flags */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} KINETIX ULTRA FITNESS CLUB. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>TOKYO &bull; NEW YORK &bull; LONDON</span>
            <a href="#hero" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-white transition-colors">Terms of Membership</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
