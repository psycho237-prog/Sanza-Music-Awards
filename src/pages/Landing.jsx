import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { LayoutGrid, Bell } from 'lucide-react';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white pb-24">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8">
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    <LayoutGrid size={24} />
                </button>
                <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">African Singing Awards</h1>
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative">
                    <Bell size={24} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-black" />
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold mb-8 tracking-tight"
                >
                    Amplify <br />
                    <span className="text-secondary">The Rhythm</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 relative w-full max-w-[320px]"
                >
                    <div className="absolute inset-0 bg-secondary/20 blur-[80px] rounded-full" />

                    {/* Carousel Container */}
                    <div className="relative flex gap-4 overflow-hidden">
                        <div className="relative w-full flex-shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop"
                                alt="Featured Artist"
                                className="w-full h-[400px] object-cover rounded-[2.5rem] border border-white/10"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-[2.5rem]" />

                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-secondary text-[10px] font-bold rounded-full uppercase tracking-widest">
                                    Trending
                                </span>
                            </div>

                            <div className="absolute bottom-8 left-8 text-left">
                                <h3 className="text-xl font-bold mb-1">Discover the Voice</h3>
                                <p className="text-xs text-gray-400">The continent's top talent awaits your vote</p>
                            </div>
                        </div>

                        {/* Peek at next card */}
                        <div className="relative w-12 flex-shrink-0 opacity-50">
                            <img
                                src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop"
                                alt="Next Artist"
                                className="w-full h-[400px] object-cover rounded-[2.5rem] border border-white/10"
                            />
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        <div className="w-6 h-1 bg-secondary rounded-full" />
                        <div className="w-1.5 h-1 bg-white/20 rounded-full" />
                        <div className="w-1.5 h-1 bg-white/20 rounded-full" />
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 mb-10 max-w-[280px] text-[11px] leading-relaxed"
                >
                    Your vote decides the next big star. Join millions of fans supporting African talent in this year's biggest showdown.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="w-full max-w-xs"
                >
                    <Link to="/categories">
                        <Button className="w-full text-sm py-4 rounded-full bg-secondary hover:bg-secondary/90 text-white border-none font-bold shadow-[0_10px_30px_rgba(217,70,239,0.3)]">
                            Start Voting Now →
                        </Button>
                    </Link>
                    <p className="mt-4 text-[9px] text-gray-600 uppercase tracking-widest font-bold">Terms & Conditions Apply</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Landing;
