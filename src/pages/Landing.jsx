import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { LayoutGrid, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

const Landing = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselItems = [
        {
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop",
            tag: "Trending",
            title: "Discover the Voice",
            description: "The continent's top talent awaits your vote"
        },
        {
            image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop",
            tag: "Featured",
            title: "Rhythm of Africa",
            description: "Support your favorite artists today"
        },
        {
            image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
            tag: "New Era",
            title: "Next Generation",
            description: "The future of African music is here"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-black text-white pb-24">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8">
                <Link to="/categories" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    <LayoutGrid size={24} />
                </Link>
                <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">African Singing Awards</h1>
                <Link to="/results" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative">
                    <Trophy size={24} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-black" />
                </Link>
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
                    <div className="relative overflow-hidden rounded-[2.5rem]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full"
                            >
                                <img
                                    src={carouselItems[currentIndex].image}
                                    alt={carouselItems[currentIndex].title}
                                    className="w-full h-[400px] object-cover rounded-[2.5rem] border border-white/10"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-[2.5rem]" />

                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-secondary text-[10px] font-bold rounded-full uppercase tracking-widest">
                                        {carouselItems[currentIndex].tag}
                                    </span>
                                </div>

                                <div className="absolute bottom-8 left-8 text-left">
                                    <h3 className="text-xl font-bold mb-1">{carouselItems[currentIndex].title}</h3>
                                    <p className="text-xs text-gray-400">{carouselItems[currentIndex].description}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {carouselItems.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-6 bg-secondary' : 'w-1.5 bg-white/20'}`}
                            />
                        ))}
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
