import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Plane, Clock, Truck } from 'lucide-react';
import { toast } from 'sonner';

interface ClubAccessComponentProps {
  entryMode: 'QuickQuote' | 'StartJourney';
  from?: string;
  to?: string;
  onComplete?: () => void;
}

const shippingOptions = [
  {
    id: 'overnight',
    icon: Plane,
    title: 'Overnight',
    price: '$215',
    priceDetail: 'each way',
    duration: '1 Business Day',
    description: 'For last-minute departures and tournament travel.',
  },
  {
    id: 'expedited',
    icon: Clock,
    title: 'Expedited',
    price: '$165',
    priceDetail: 'each way',
    duration: '2 Business Days',
    description: 'Ideal for planned getaways and weekend trips.',
  },
  {
    id: 'standard',
    icon: Truck,
    title: 'Standard',
    price: '$80',
    priceDetail: 'each way',
    duration: '3–6 Business Days',
    description: 'Perfect for extended stays or return travel flexibility.',
  },
];

export function ClubAccessComponent({ 
  entryMode, 
  from, 
  to, 
  onComplete 
}: ClubAccessComponentProps) {
  const [inputMode, setInputMode] = useState<'mobile' | 'email'>('mobile');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value.trim()) {
      toast.error(inputMode === 'mobile' 
        ? 'Please enter a valid mobile number.' 
        : 'Please enter a valid email address.'
      );
      return;
    }

    setIsLoading(true);
    
    const successMessage = entryMode === 'QuickQuote' 
      ? 'Quote saved! Redirecting to your booking…'
      : 'Welcome! Setting up your journey…';
    
    toast.success(successMessage);
    
    // Trigger overlay after a short delay
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
      setIsLoading(false);
    }, 1000);
  };

  // Conditional content based on entry mode
  const content = {
    QuickQuote: {
      header: 'Confirm your trip details',
      subheading: 'New or returning member — verify once and travel with ease.',
      ctaText: 'Continue to Booking',
      helperText: "We'll save your quote and take you directly to your booking, where you'll confirm your preferred service.",
    },
    StartJourney: {
      header: 'Welcome to BagCaddie Club',
      subheading: 'Enter your mobile number to verify and continue.',
      ctaText: 'Continue Your Journey',
      helperText: "You'll be able to plan and book your next trip with ease.",
    },
  };

  const currentContent = content[entryMode];
  const showQuoteCards = entryMode === 'QuickQuote';

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-16" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-[#111111] mb-3"
            style={{ 
              fontSize: 'clamp(32px, 4vw, 48px)', 
              fontWeight: 500, 
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.2 
            }}
          >
            {currentContent.header}
          </h1>
          <p 
            className="text-[#666666] max-w-2xl mx-auto"
            style={{ fontSize: '18px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
          >
            {currentContent.subheading}
          </p>
        </motion.div>

        {/* Quote Cards Section - Only shown in QuickQuote mode */}
        {showQuoteCards && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12"
          >
            {/* Section Label */}
            <div className="text-center mb-6">
              <p 
                className="text-[#D4AF37]"
                style={{ 
                  fontSize: '14px', 
                  fontWeight: 500, 
                  fontFamily: 'Inter, sans-serif', 
                  letterSpacing: '0.5px' 
                }}
              >
                EXCLUSIVE BAGCADDIE CLUB MEMBER RATES
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {shippingOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.1, duration: 0.4 }}
                  className="bg-[#FAFAFA] border border-[#D4AF37] rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(212,175,55,0.15)] transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFF7E8] flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-[#D4AF37]" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-[#111111] mb-1"
                    style={{ fontSize: '22px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                  >
                    {option.title}
                  </h3>

                  {/* Price */}
                  <div className="mb-3">
                    <span 
                      className="text-[#D4AF37]"
                      style={{ fontSize: '28px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                    >
                      {option.price}
                    </span>
                    <span 
                      className="text-[#888888] ml-2"
                      style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
                    >
                      {option.priceDetail}
                    </span>
                  </div>

                  {/* Duration */}
                  <p 
                    className="text-[#111111] mb-3"
                    style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
                  >
                    {option.duration}
                  </p>

                  {/* Description */}
                  <p 
                    className="text-[#666666]"
                    style={{ fontSize: '14px', fontWeight: 400, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}
                  >
                    {option.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Authentication Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: showQuoteCards ? 0.5 : 0.15 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-white rounded-2xl border border-gray-200 px-8 pb-8 pt-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input Field */}
              <div className="relative">
                {inputMode === 'mobile' && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none">
                    <Smartphone className="w-5 h-5" strokeWidth={2} />
                  </div>
                )}
                <input
                  ref={inputRef}
                  type={inputMode === 'mobile' ? 'tel' : 'email'}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={inputMode === 'mobile' ? 'Enter mobile number' : 'Enter email address'}
                  className={`w-full h-14 ${inputMode === 'mobile' ? 'pl-12' : 'pl-4'} pr-4 rounded-xl border border-[#E0E0E0] outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-[#111111] placeholder:text-[#999999]`}
                  style={{ fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              {/* Toggle Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setInputMode(inputMode === 'mobile' ? 'email' : 'mobile');
                    setValue('');
                    // Re-focus input after mode change
                    setTimeout(() => {
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }, 0);
                  }}
                  className="text-[#D4AF37] hover:text-[#c29d2f] hover:underline transition-colors"
                  style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
                >
                  Use {inputMode === 'mobile' ? 'email' : 'mobile'} instead
                </button>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-[#D4AF37] text-[#111111] rounded-xl hover:bg-[#C49A2E] hover:shadow-[0_6px_16px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{currentContent.ctaText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Helper Text */}
              <p 
                className="text-[#888888] text-center"
                style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}
              >
                {currentContent.helperText}
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
