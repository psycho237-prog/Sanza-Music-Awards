"use client";

import React from 'react';

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
            <img
                src="/sanza-trophy.png"
                alt="Sanza Trophy"
                className="w-full h-full object-contain"
                style={{
                    // If size is NOT provided, we assume the container (like a Tailwind w-40) handles scaling
                    // If size IS provided (for icons), we use it.
                    maxHeight: size ? 'none' : '100%'
                }}
            />
        </div>
    );
};

export default SanzaTrophy;
