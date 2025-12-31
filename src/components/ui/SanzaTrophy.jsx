import React from 'react';

const SanzaTrophy = ({ className, size }) => {
    // If size is provided, we treat it as the width
    // The image will maintain its aspect ratio
    const containerStyle = size ? { width: size } : {};

    return (
        <div
            className={`${className} flex items-center justify-center pointer-events-none`}
            style={containerStyle}
        >
            <img
                src="/sanza-trophy.png"
                alt="Sanza Trophy"
                className="w-full h-auto object-contain max-h-[1.5em]" // Default to line-height related height
                style={size ? { maxHeight: 'none' } : {}}
            />
        </div>
    );
};

export default SanzaTrophy;
