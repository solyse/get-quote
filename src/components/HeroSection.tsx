import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AutocompleteInput, Location } from './AutocompleteInput';
import { storage } from '../services/storage';
import { envConfig } from '../config/env';
import { InternationalAddressModal } from './InternationalAddressModal';

interface HeroSectionProps {
  onGetQuote: (from: string, to: string) => void;
}

export function HeroSection({  onGetQuote }: HeroSectionProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedFrom, setSelectedFrom] = useState<Location | null>(null);
  const [selectedTo, setSelectedTo] = useState<Location | null>(null);
  const [isInternationalModalOpen, setIsInternationalModalOpen] = useState(false);
  const [fieldTriggeredModal, setFieldTriggeredModal] = useState<'from' | 'to' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFrom && selectedTo) {
      // Store quote data in localStorage
      storage.setQuote({
        from: selectedFrom,
        to: selectedTo,
      });


      // Redirect to club-flow page
      const redirectUrl = `${envConfig.websiteUrl}/pages/booking-form`;
      window.location.href = redirectUrl;
    }
  };

  // Helper function to check if a location is non-US
  const isNonUSLocation = (location: Location | null): boolean => {
    if (!location) return false;
    const country = location.country?.toUpperCase().trim();
    return country !== undefined && country !== '' && country !== 'US' && country !== 'USA' && country !== 'UNITED STATES';
  };

  // Check if either location is non-US
  const hasNonUSLocation = isNonUSLocation(selectedFrom) || isNonUSLocation(selectedTo);

  // Automatically close modal if both locations become valid US locations
  // Only closes when both fields have valid US locations (not when fields are reset)
  useEffect(() => {
    // Only auto-close if modal is open AND both locations are set AND both are US
    if (isInternationalModalOpen && selectedFrom && selectedTo && !isNonUSLocation(selectedFrom) && !isNonUSLocation(selectedTo)) {
      setFieldTriggeredModal(null);
      setIsInternationalModalOpen(false);
    }
  }, [isInternationalModalOpen, selectedFrom, selectedTo]);

  const isFormValid = selectedFrom !== null && selectedTo !== null && !hasNonUSLocation;

  return (
    <div className="relative h-auto md:h-[200px] w-full my-8 md:my-0">

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Elegant Input Bar */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full max-w-4xl"
        >
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-2 flex flex-col md:flex-row items-stretch gap-2">
            {/* From Input */}
            <AutocompleteInput
              value={from}
              onChange={setFrom}
              onSelect={(location) => {
                // Check if location is non-US
                if (isNonUSLocation(location)) {
                  // Reset the field and open modal
                  setSelectedFrom(null);
                  setFrom('');
                  setFieldTriggeredModal('from');
                  setIsInternationalModalOpen(true);
                } else {
                  // Set the location if it's US
                  setSelectedFrom(location);
                  setFrom(location.name);
                  setFieldTriggeredModal(null);
                }
              }}
              placeholder="Pickup location or club"
              selectedLocation={selectedFrom}
              excludeLocationId={selectedTo?.id}
            />

            {/* Divider Arrow */}
            <div className="md:flex items-center justify-center px-2">
              <ArrowRight className="w-5 h-5 text-white/60" />
            </div>

            {/* To Input */}
            <AutocompleteInput
              value={to}
              onChange={setTo}
              onSelect={(location) => {
                // Check if location is non-US
                if (isNonUSLocation(location)) {
                  // Reset the field and open modal
                  setSelectedTo(null);
                  setTo('');
                  setFieldTriggeredModal('to');
                  setIsInternationalModalOpen(true);
                } else {
                  // Set the location if it's US
                  setSelectedTo(location);
                  setTo(location.name);
                  setFieldTriggeredModal(null);
                }
              }}
              placeholder="Destination or resort"
              selectedLocation={selectedTo}
              excludeLocationId={selectedFrom?.id}
            />

            {/* CTA Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-10 h-14 rounded-full transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap ${isFormValid
                  ? 'bg-[#D4AF37] text-[#111111] hover:bg-[#c29d2f] cursor-pointer shadow-[0_4px_12px_rgba(212,175,55,0.3)]'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
            >
              <span>Get Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.form>
      </div>

      {/* International Address Modal */}
      <InternationalAddressModal
        isOpen={isInternationalModalOpen}
        onClose={() => {
          // Reset the field that triggered the modal
          if (fieldTriggeredModal === 'from') {
            setSelectedFrom(null);
            setFrom('');
          } else if (fieldTriggeredModal === 'to') {
            setSelectedTo(null);
            setTo('');
          }
          setFieldTriggeredModal(null);
          setIsInternationalModalOpen(false);
        }}
      />
    </div>
  );
}
