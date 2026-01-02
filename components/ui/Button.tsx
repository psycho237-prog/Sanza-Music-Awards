"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-purple-500/30',
        secondary: 'bg-glass-bg border border-glass-border text-white hover:bg-white/10',
        ghost: 'bg-transparent text-gray-300 hover:text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileTap={props.disabled ? {} : { scale: 0.95 }}
            whileHover={props.disabled ? {} : { scale: 1.02 }}
            className={cn(
                'rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2',
                variants[variant],
                sizes[size],
                props.disabled && 'opacity-50 cursor-not-allowed grayscale pointer-events-none',
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
