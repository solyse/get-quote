import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ClubOnboardingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClubOnboardingOverlay({ isOpen, onClose }: ClubOnboardingOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[12px]" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative max-w-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold Crest Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#111111]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="text-[#111111] mb-4"
              style={{ fontSize: '32px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
            >
              Welcome to BagCaddie Club.
            </motion.h2>

            {/* Subtext Line 1 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.45 }}
              className="text-[#666666] mb-2"
              style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
            >
              Your concierge experience begins now.
            </motion.p>

            {/* Subtext Line 2 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              className="text-[#777777] mb-8"
              style={{ fontSize: '15px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
            >
              We've saved your preferences for future trips.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.65 }}
              onClick={onClose}
              className="bg-[#D4AF37] text-[#111111] px-8 h-14 rounded-full hover:bg-[#c29d2f] transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
              style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
            >
              <span>View Trip Summary</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
