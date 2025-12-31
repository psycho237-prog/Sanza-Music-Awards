import React from 'react';

const SanzaTrophy = ({ className }) => {
    return (
        <svg
            viewBox="0 0 100 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#DF9F28" />
                    <stop offset="30%" stopColor="#FDB931" />
                    <stop offset="60%" stopColor="#FFD700" />
                    <stop offset="80%" stopColor="#FDB931" />
                    <stop offset="100%" stopColor="#DF9F28" />
                </linearGradient>
                <linearGradient id="goldGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B8860B" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Base - Stepped and Rounded */}
            <path
                d="M30 185 H70 A 5 5 0 0 1 70 195 H30 A 5 5 0 0 1 30 185 Z"
                fill="url(#goldGradientDark)"
            />
            <path
                d="M25 195 H75 A 5 5 0 0 1 75 200 H25 A 5 5 0 0 1 25 195 Z"
                fill="url(#goldGradient)"
            />
            <path
                d="M35 175 H65 A 5 5 0 0 1 65 185 H35 A 5 5 0 0 1 35 175 Z"
                fill="url(#goldGradient)"
            />

            {/* Flame/Leaf Blades */}
            {/* Left Blade */}
            <path
                d="M50 175 C 20 150, 10 100, 30 50 C 35 40, 45 40, 50 60 C 45 90, 40 130, 50 175 Z"
                fill="url(#goldGradient)"
                stroke="url(#goldGradientDark)"
                strokeWidth="0.5"
            />
            {/* Right Blade */}
            <path
                d="M50 175 C 80 150, 90 100, 70 50 C 65 40, 55 40, 50 60 C 55 90, 60 130, 50 175 Z"
                fill="url(#goldGradient)"
                stroke="url(#goldGradientDark)"
                strokeWidth="0.5"
            />
            {/* Center Blade - Taller */}
            <path
                d="M50 170 C 45 130, 40 50, 50 10 C 60 50, 55 130, 50 170 Z"
                fill="url(#goldGradient)"
            />

            {/* Star - Centered */}
            <path
                d="M50 135 L 53 145 L 63 145 L 55 152 L 58 162 L 50 156 L 42 162 L 45 152 L 37 145 L 47 145 Z"
                fill="url(#goldGradientDark)"
                filter="url(#glow)"
            />
        </svg>
    );
};

export default SanzaTrophy;
