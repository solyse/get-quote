import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Clock, Truck, ArrowRight, MapPin, Flag } from 'lucide-react';
import { ShippingOptionCard } from './ShippingOptionCard';
import { RegistrationForm } from './RegistrationForm';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
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
    description: 'Fastest delivery for last-minute travel.',
    badge: null,
  },
  {
    id: 'expedited',
    icon: Clock,
    title: 'Expedited',
    subtitle: 'Best Value',
    price: '$165',
    duration: '2 Business Days',
    description: 'Perfect balance of speed and value.',
    badge: 'Best Value',
  },
  {
    id: 'standard',
    icon: Truck,
    title: 'Standard',
    subtitle: 'Most Economical',
    price: '$80',
    duration: '3–6 Business Days',
    description: 'Most economical for flexible travel plans.',
    badge: null,
  },
];

export function QuoteModal({ isOpen, onClose, from, to }: QuoteModalProps) {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white/20 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-5 flex items-start justify-between gap-4 z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-white/70 flex-shrink-0" />
                    <div className="text-white text-3xl">{from}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <div className="flex items-center gap-2">
                    <Flag className="w-6 h-6 text-white/70 flex-shrink-0" />
                    <div className="text-white text-3xl">{to}</div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {/* Quote Cards */}
              <div className="px-6 py-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {shippingOptions.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.2 }}
                    >
                      <ShippingOptionCard {...option} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Registration Form */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.25, ease: 'easeOut' }}
                  className="mt-8"
                >
                  <RegistrationForm />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
