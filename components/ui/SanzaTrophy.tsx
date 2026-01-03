"use client";

import * as React from 'react';
import Image from 'next/image';

interface SanzaTrophyProps {
    className?: string;
    size?: number | string;
}

const SanzaTrophy = ({ className, size }: SanzaTrophyProps) => {
    // If size is provided, we treat it as a square-ish bounding box width
    const containerStyle = size ? { width: size, height: 'auto' } : { width: '100%', height: '100%' };

    return (
        <div
            className={`${className} flex items-center justify-center pointer-events-none overflow-visible`}
            style={containerStyle}
        >
            <Image
                src="/sanza-trophy.png"
                alt="Sanza Trophy"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
            />
        </div>
    );
};

export default SanzaTrophy;
