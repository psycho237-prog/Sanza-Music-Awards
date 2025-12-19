import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Button = ({
    children,
    variant = 'primary',
    className,
    ...props
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-purple-500/30',
        secondary: 'bg-glass-bg border border-glass-border text-white hover:bg-white/10',
        ghost: 'bg-transparent text-gray-300 hover:text-white',
    };

    return (
        <motion.button
            whileTap={props.disabled ? {} : { scale: 0.95 }}
            whileHover={props.disabled ? {} : { scale: 1.02 }}
            className={cn(
                'px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2',
                variants[variant],
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
