import React from 'react';

const SanzaTrophy = ({ className }) => {
    return (
        <svg
            viewBox="0 0 100 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B8860B" stopOpacity="1" />
                    <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8B6508" stopOpacity="1" />
                </linearGradient>
            </defs>

            <path d="M50 200 C30 180 20 120 40 40 C42 30 48 10 50 5 C52 10 58 30 60 40 C80 120 70 180 50 200 Z" fill="url(#goldGradient)" />

            <path d="M38 185 C20 150 25 80 45 35 C35 70 30 140 38 185 Z" fill="#DAA520" opacity="0.8" />

            <path d="M62 185 C80 150 75 80 55 35 C65 70 70 140 62 185 Z" fill="#8B6508" opacity="0.6" />

            <polygon points="50,152 53,162 63,162 55,168 58,178 50,172 42,178 45,168 37,162 47,162" fill="#8B6508" />

            <path d="M35 205 H65 C68 205 70 207 70 210 V212 H30 V210 C30 207 32 205 35 205 Z" fill="url(#goldGradient)" />
            <path d="M32 215 H68 V222 H32 V215 Z" fill="url(#goldGradient)" />
            <path d="M28 225 H72 V235 H28 V225 Z" fill="url(#goldGradient)" />
        </svg>
    );
};

export default SanzaTrophy;
