import React from 'react';
import { GolfHole } from './GolfHole';
import { BcClub } from './BcClub';


export type ClubIconType = 'BcClub' | 'GolfClub';

interface BcClubIconProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'color'> {
    type?: ClubIconType;
    className?: string;
    size?: number;
    color?: string;
}

export function BcClubIcon({ type = 'BcClub', className = '', color, size, ...props }: BcClubIconProps) {
    // const iconSrc = type === 'GolfClub' ? GOLF_ICON_SVG : BC_CLUB_ICON_URL;
    // const altText = type === 'GolfClub' ? 'Golf Club' : 'BC Club';

    return (
        <div className="relative size-full">
            {type === 'BcClub' ? (
                <BcClub size={size} color={color} />

            ) : (
                <GolfHole size={size} color={color} />
            )}
        </div>
    );
}

