import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutGrid, Play } from 'lucide-react';
import SanzaTrophy from '../components/ui/SanzaTrophy';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#051040] text-white pb-24 font-sans overflow-x-hidden relative">
            {/* Background with deep blue gradient & geometric pattern */}
            <div className="fixed inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 md:opacity-100 transition-opacity duration-1000"
                    style={{ backgroundImage: 'url("/hero-bg.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#051040] via-[#051040]/80 to-[#051040]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(253,185,49,0.15)_0%,_rgba(5,16,64,0)_60%)]" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8 z-50 relative max-w-7xl mx-auto w-full">
                <Link to="/categories" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                    <LayoutGrid size={20} className="text-[#FDB931] group-hover:text-white transition-colors" />
                </Link>
                <div className="hidden md:block">
                    <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#FDB931]/80">Sanza Music Awards</h1>
                </div>
                <Link to="/results" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative border border-white/10 group flex items-center justify-center">
                    <SanzaTrophy size={24} className="group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-all" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative w-full z-10">

                {/* Hero Section */}
                <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-4">

                    {/* Main Logo Block */}
                    <div className="flex flex-row items-center justify-center gap-2 md:gap-6 mb-12 transform scale-90 md:scale-100">
                        {/* Trophy Icon */}
                        <motion.div
                            animate={{ y: [-4, 4, -4] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            className="w-20 md:w-32 lg:w-40 flex-shrink-0"
                        >
                            <SanzaTrophy className="w-full h-auto drop-shadow-[0_0_15px_rgba(253,185,49,0.3)]" />
                        </motion.div>

                        {/* Text Block */}
                        <div className="flex flex-col items-start justify-center">
                            <motion.h1
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-5xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] via-[#FDB931] to-[#C49102] drop-shadow-sm font-serif"
                            >
                                Sanza
                            </motion.h1>
                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg md:text-3xl lg:text-4xl font-light text-[#FDB931] uppercase tracking-[0.2em] md:tracking-[0.3em] pl-1 md:pl-2"
                            >
                                Music Awards
                            </motion.h2>
                        </div>
                    </div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-white text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.4em] uppercase mb-16 font-light text-center px-4"
                    >
                        Là où les étoiles de la musique brillent
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col items-center gap-8 w-full max-w-md"
                    >
                        <Link to="/categories" className="w-full md:w-auto">
                            <button className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-[#DF9F28] via-[#FDB931] to-[#DF9F28] text-[#051040] font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_4px_20px_rgba(253,185,49,0.3)] hover:scale-105 transition-transform duration-300">
                                Votez Maintenant
                            </button>
                        </Link>

                        <button
                            onClick={() => window.open('https://youtube.com', '_blank')}
                            className="group flex items-center gap-3 text-[#FDB931]/90 hover:text-white transition-colors uppercase text-[10px] md:text-xs font-medium tracking-widest"
                        >
                            <div className="w-8 h-8 rounded-full border border-[#FDB931] group-hover:border-white flex items-center justify-center transition-colors">
                                <Play size={10} fill="currentColor" className="ml-0.5" />
                            </div>
                            Regarder la vidéo
                        </button>
                    </motion.div>
                </div>

                {/* Footer Category Preview (Desktop Only for Layout Balance, visible on mobile as vertical list) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="w-full max-w-6xl mx-auto px-4 mt-8 pb-8 z-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                        {[
                            { title: "MEILLEUR ARTISTE", subtitle: "MASCULIN" },
                            { title: "MEILLEURE ARTISTE", subtitle: "FÉMININE" },
                            { title: "CHANSON DE", subtitle: "L'ANNÉE" }
                        ].map((card, idx) => (
                            <div key={idx} className="bg-[#051040]/60 backdrop-blur-sm border border-[#FDB931]/20 p-4 md:p-6 text-center group hover:bg-[#FDB931]/5 transition-colors rounded-lg">
                                <h3 className="text-[#FDB931]/60 text-[9px] uppercase tracking-widest mb-1 group-hover:text-[#FDB931] transition-colors">{card.title}</h3>
                                <p className="text-white font-serif font-bold tracking-wider">{card.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Landing;
