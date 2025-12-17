import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8 relative"
            >
                <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-full" />
                <img
                    src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop"
                    alt="Featured Artist"
                    className="w-64 h-80 object-cover rounded-[2rem] shadow-2xl relative z-10 rotate-[-5deg] border-2 border-white/10"
                />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
                Amplify <br />
                <span className="text-secondary">The Rhythm</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 mb-8 max-w-xs"
            >
                Your vote decides the next big star. Join millions of fans supporting African talent.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full max-w-xs"
            >
                <Link to="/categories">
                    <Button className="w-full text-lg py-4">
                        Start Voting Now →
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
};

export default Landing;
