import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { GymExperience3DSection } from './components/GymExperience3DSection';
import { Pricing } from './components/Pricing';
import { Trainers } from './components/Trainers';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import {
  JoinGymModal,
  ProgramModal,
  TrainerBookingModal,
  FitnessCalculatorModal,
} from './components/Modals';
import { FitnessProgram, PricingPlan, Trainer } from './types';

export default function App() {
  // Modal states
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedPricingPlan, setSelectedPricingPlan] = useState<PricingPlan | null>(null);
  const [isAnnualPlan, setIsAnnualPlan] = useState(false);

  const [selectedProgram, setSelectedProgram] = useState<FitnessProgram | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleOpenJoin = (plan?: PricingPlan, annual = false) => {
    setSelectedPricingPlan(plan || null);
    setIsAnnualPlan(annual);
    setIsJoinModalOpen(true);
  };

  const handleScrollToPrograms = () => {
    const el = document.getElementById('programs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col selection:bg-[#ff5500] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenJoinModal={() => handleOpenJoin()}
        onOpenCalculatorModal={() => setIsCalculatorOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onJoinClick={() => handleOpenJoin()}
          onExplorePrograms={handleScrollToPrograms}
        />

        {/* 2. About Section */}
        <About onExplorePrograms={handleScrollToPrograms} />

        {/* 3. Programs Section */}
        <Programs
          onSelectProgram={(program) => setSelectedProgram(program)}
        />

        {/* 4. 3D Experience Section */}
        <GymExperience3DSection
          onJoinClick={() => handleOpenJoin()}
        />

        {/* 5. Membership Pricing */}
        <Pricing
          onSelectPlan={(plan, annual) => handleOpenJoin(plan, annual)}
        />

        {/* 6. Trainers Section */}
        <Trainers
          onBookTrainer={(trainer) => setSelectedTrainer(trainer)}
        />

        {/* 7. Testimonials */}
        <Testimonials />

        {/* 8. Contact Section */}
        <Contact />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <JoinGymModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        selectedPlan={selectedPricingPlan}
        isAnnual={isAnnualPlan}
      />

      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onJoin={() => handleOpenJoin()}
      />

      <TrainerBookingModal
        trainer={selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
      />

      <FitnessCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
}
