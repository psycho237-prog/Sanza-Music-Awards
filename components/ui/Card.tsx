"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from './Button';

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

const Card = ({ children, className, ...props }: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-6 shadow-xl',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
