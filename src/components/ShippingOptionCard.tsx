import { LucideIcon } from 'lucide-react';

interface ShippingOptionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  description: string;
  badge?: string | null;
}

export function ShippingOptionCard({
  icon: Icon,
  title,
  subtitle,
  price,
  duration,
  description,
  badge,
}: ShippingOptionCardProps) {
  return (
    <div 
      className="relative bg-[#FAFAFA] border border-[#D4AF37] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] px-6 pb-4 pt-4 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all duration-200"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Icon and Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D4AF37]/10">
          <Icon className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <h3 
          className="text-[#111111]"
          style={{ fontSize: '20px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
        >
          {title}
        </h3>
      </div>

      {/* Price */}
      <div 
        className="text-[#111111] mb-2"
        style={{ fontSize: '28px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
      >
        {price} <span style={{ fontSize: '14px', fontWeight: 400, color: '#666666' }}>each way</span>
      </div>

      {/* Duration */}
      <p 
        className="text-[#666666] mb-1"
        style={{ fontSize: '14px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
      >
        {duration}
      </p>

      {/* Description */}
      <p 
        className="text-[#666666]"
        style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
      >
        {description}
      </p>
    </div>
  );
}
