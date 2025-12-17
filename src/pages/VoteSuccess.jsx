import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Check, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const VoteSuccess = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Confetti / Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(217,70,239,0.5)] relative z-10"
            >
                <Check size={48} className="text-white" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-4"
            >
                Voice Heard!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mb-12 max-w-xs"
            >
                Thanks for supporting African talent. Your vote has been successfully cast.
            </motion.p>

            {/* Voted Card Preview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-xs bg-white/5 rounded-3xl p-4 border border-white/10 mb-12"
            >
                <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop"
                    alt="Artist"
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-xl font-bold">Amara Okeke</h3>
                <p className="text-sm text-gray-400">Best Female Vocalist Nominee</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs space-y-4"
            >
                <Link to="/categories">
                    <Button className="w-full py-4">
                        Vote Another Category
                    </Button>
                </Link>

                <Button variant="ghost" className="w-full gap-2">
                    <Share2 size={18} />
                    Share Result
                </Button>
            </motion.div>
        </div>
    );
};

export default VoteSuccess;
