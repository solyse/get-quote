import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface RegistrationFormProps {
  onComplete?: () => void;
}

export function RegistrationForm({ onComplete }: RegistrationFormProps) {
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
    toast.success('Quote saved! Redirecting to your booking…');
    
    // Trigger overlay after a short delay
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 px-8 pb-8 pt-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Headline */}
      <div className="text-center mb-6">
        <h3 
          className="text-[#111111] mb-2"
          style={{ fontSize: '26px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
        >
          Continue Your Journey
        </h3>
        <p 
          className="text-[#666666]"
          style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
        >
          Enter your {inputMode === 'mobile' ? 'mobile number' : 'email'} to verify and continue your BagCaddie Club booking.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className={`w-full h-14 ${inputMode === 'mobile' ? 'pl-12' : 'pl-4'} pr-4 rounded-lg border border-[#E0E0E0] outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-[#111111] placeholder:text-[#999999]`}
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
              <span>Continue to Booking</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Helper Text */}
        <p 
          className="text-[#888888] text-center"
          style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
        >
          We'll save your quote and take you directly to your booking, where you'll confirm your preferred service.
        </p>
      </form>
    </div>
  );
}
