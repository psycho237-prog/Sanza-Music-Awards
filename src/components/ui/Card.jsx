import { motion } from 'framer-motion';
import { cn } from './Button';

const Card = ({ children, className, ...props }) => {
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
