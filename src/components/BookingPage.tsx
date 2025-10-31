import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, Clock, Truck } from 'lucide-react';
import { ShippingOptionCard } from './ShippingOptionCard';
import { RegistrationForm } from './RegistrationForm';
import { ClubOnboardingOverlay } from './ClubOnboardingOverlay';
// TODO: Replace with actual booking hero image path
// Placeholder - you'll need to add the actual image to src/assets/images or public/images
const bookingHeroImage = '/images/booking-hero-image.png'; // or import from src/assets/images/booking-hero-image.png

interface BookingPageProps {
  from: string;
  to: string;
}

const shippingOptions = [
  {
    id: 'overnight',
    icon: Plane,
    title: 'Overnight',
    subtitle: 'Fastest Delivery',
    price: '$215',
    duration: '1 Business Day',
    description: 'For last-minute departures and tournament travel.',
    badge: null,
  },
  {
    id: 'expedited',
    icon: Clock,
    title: 'Expedited',
    subtitle: 'Best Value',
    price: '$165',
    duration: '2 Business Days',
    description: 'Ideal for planned getaways and weekend trips.',
    badge: 'Best Value',
  },
  {
    id: 'standard',
    icon: Truck,
    title: 'Standard',
    subtitle: 'Most Economical',
    price: '$80',
    duration: '3–6 Business Days',
    description: 'Perfect for extended stays or return travel flexibility.',
    badge: null,
  },
];

export function BookingPage({ from, to }: BookingPageProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  const handleBookingComplete = () => {
    setShowLoadingOverlay(true);
    
    // Show loading overlay briefly, then transition to welcome overlay
    setTimeout(() => {
      setShowLoadingOverlay(false);
      setShowOverlay(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-8">
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
              Home
            </a>
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
              BagCaddie Club
            </a>
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
              Start Your Journey
            </a>
          </div>
          
          <div className="flex items-center justify-center flex-1">
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
              Contact Us
            </a>
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
              Account
            </a>
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
              Search
            </a>
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
              Cart
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section with From/To Display */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bookingHeroImage})` }}
        >
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            {/* From → To Header */}
            <h1 
              className="text-white mb-4"
              style={{ 
                fontSize: 'clamp(36px, 5vw, 64px)', 
                fontWeight: 300,
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.2
              }}
            >
              From {from} <span className="text-white">To</span> {to}
            </h1>

            {/* Tagline */}
            <p 
              className="text-white"
              style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
            >
              Effortless Travel. Delivered.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Club Introduction Block */}
      <div className="max-w-6xl mx-auto px-4 pt-2 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 
            className="text-[#111111] mb-0"
            style={{ fontSize: '36px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
          >
            Welcome to BagCaddie Club
          </h2>
          <p 
            className="text-[#555555] max-w-2xl mx-auto"
            style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
          >
            A concierge-level experience for golfers who travel smarter.
          </p>
        </motion.div>
      </div>

      {/* Quote Section */}
      <div className="max-w-6xl mx-auto px-4 pb-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Label */}
          <div className="text-center mb-3">
            <p 
              className="text-[#D4AF37]"
              style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}
            >
              EXCLUSIVE BAGCADDIE CLUB MEMBER RATES
            </p>
          </div>

          {/* Quote Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              >
                <ShippingOptionCard {...option} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Registration Form */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <RegistrationForm onComplete={handleBookingComplete} />
        </motion.div>
      </div>

      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
          
          {/* Loading Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative flex flex-col items-center gap-4"
          >
            {/* Animated Gold Ring */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-[#D4AF37] rounded-full animate-spin" />
              
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#D4AF37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            
            {/* Loading Text */}
            <p 
              className="text-[#111111]"
              style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
            >
              Preparing your experience...
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Club Onboarding Overlay */}
      <ClubOnboardingOverlay 
        isOpen={showOverlay} 
        onClose={() => setShowOverlay(false)} 
      />
    </div>
  );
}
