import React from 'react';

interface BcClubIconProps {
  className?: string;
  size?: number;
}

export function BcClubIcon({ className = '', size = 16 }: BcClubIconProps) {
  return (
    <img
      src="https://cdn.shopify.com/s/files/1/0613/9694/2980/files/bc_club_icon_e917dcea-6f64-4698-85ab-e42aa3b5bf19.svg"
      alt="BC Club"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

