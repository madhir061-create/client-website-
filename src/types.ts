export interface FitnessProgram {
  id: string;
  title: string;
  tagline: string;
  category: 'Bodybuilding' | 'Weight Training' | 'CrossFit' | 'Cardio Training' | 'Yoga & Flexibility' | 'Personal Training';
  description: string;
  duration: string;
  intensity: 'High' | 'Extreme' | 'Moderate' | 'Custom';
  caloriesBurn: string;
  focusMuscles: string[];
  features: string[];
  trainerName: string;
  image: string;
  badge?: string;
  scheduleDays: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  highlighted?: boolean;
  accentColor: string;
  perks: string[];
  notIncluded?: string[];
  badge?: string;
  ctaText: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  credentials: string[];
  bio: string;
  image: string;
  socials: {
    instagram: string;
    twitter: string;
    youtube?: string;
    linkedin?: string;
  };
  clientStats: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  transformation: string;
  rating: number;
  quote: string;
  avatar: string;
  duration: string;
  badge: string;
}

export interface GymStat {
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}
