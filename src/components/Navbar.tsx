import React, { useState, useEffect } from 'react';
import { Dumbbell, Volume2, VolumeX, Menu, X, Flame, Shield, ArrowRight } from 'lucide-react';
import { toggleAmbientGymDrone, playPlateClickSound } from '../utils/audio';

interface NavbarProps {
  onOpenJoinModal: () => void;
  onOpenCalculatorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal, onOpenCalculatorModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const nextState = !audioEnabled;
    const active = toggleAmbientGymDrone(nextState);
    setAudioEnabled(active);
    playPlateClickSound();
  };

  const navLinks = [
    { label: 'Experience', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: '3D Gym Sim', href: '#gym-3d' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08080c]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={playPlateClickSound}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#ff1a35] p-0.5 shadow-lg shadow-[#ff5500]/30 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0c0c10] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#ff5500] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-black tracking-wider text-white leading-none flex items-center gap-1.5">
                KINETIX
                <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/30">
                  ULTRA
                </span>
              </span>
              <span className="text-[9px] font-mono-tech uppercase tracking-[0.22em] text-zinc-400">
                Limitless Athletics
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-[#121218]/70 border border-white/5 rounded-full px-5 py-2 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={playPlateClickSound}
                className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-zinc-300 hover:text-white transition-colors relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#ff5500] after:absolute after:bottom-0 after:left-0 after:transition-all rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs & Audio Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Ambiance Toggle */}
            <button
              onClick={handleAudioToggle}
              title={audioEnabled ? 'Mute Gym Atmosphere' : 'Enable 3D Gym Atmosphere Synth'}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                audioEnabled
                  ? 'border-[#ff5500] bg-[#ff5500]/15 text-[#ff5500] shadow-md shadow-[#ff5500]/20'
                  : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Macro Calculator Quick Tool */}
            <button
              onClick={() => {
                playPlateClickSound();
                onOpenCalculatorModal();
              }}
              className="text-xs font-mono-tech text-zinc-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              Fitness Calc
            </button>

            {/* Join Gym Primary CTA */}
            <button
              onClick={() => {
                playPlateClickSound();
                onOpenJoinModal();
              }}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-heading text-sm font-bold tracking-wider text-white bg-gradient-to-r from-[#ff5500] via-[#ff3300] to-[#ff1a35] shadow-lg shadow-[#ff5500]/30 hover:shadow-[#ff5500]/60 transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                JOIN THE GYM
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={handleAudioToggle}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-[#ff5500]" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#0a0a0f] border-b border-white/10 px-6 py-6 space-y-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    playPlateClickSound();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 text-sm font-semibold text-zinc-300 hover:text-[#ff5500] rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculatorModal();
                }}
                className="w-full py-2.5 text-xs font-mono-tech rounded-xl bg-white/5 text-zinc-300 border border-white/10"
              >
                Macro & Calorie Calculator
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full py-3 text-sm font-heading tracking-wider rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white font-bold shadow-lg shadow-[#ff5500]/30"
              >
                JOIN THE GYM (FREE 3-DAY PASS)
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
