import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Mail, Lock, Apple, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Vote for the Next Star</h1>
                    <p className="text-gray-400">Log in to cast your vote</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-2xl mb-8">
                    <button className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold shadow-lg">Login</button>
                    <button className="flex-1 py-3 rounded-xl text-gray-400">Sign Up</button>
                </div>

                {/* Form */}
                <div className="space-y-4 mb-8">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="Email or Phone Number"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                <Link to="/categories">
                    <Button className="w-full py-4 text-lg mb-8">
                        Start Voting →
                    </Button>
                </Link>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-dark text-gray-400">Or continue with</span>
                    </div>
                </div>

                <div className="flex justify-center gap-6">
                    <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Apple size={24} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <span className="font-bold text-xl">G</span>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <span className="font-bold text-xl text-blue-500">f</span>
                    </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-8">
                    By continuing, you agree to our Terms of Service & Privacy Policy
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
