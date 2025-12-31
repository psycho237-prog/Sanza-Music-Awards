import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { LayoutGrid, Trophy, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#051040] text-white pb-24 font-sans overflow-x-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8 z-50 relative">
                <Link to="/categories" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <LayoutGrid size={20} className="text-[#FFD700]" />
                </Link>
                <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#FFD700]/80">Sanza Music Awards</h1>
                <Link to="/results" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative border border-white/10">
                    <Trophy size={20} className="text-[#FFD700]" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative w-full">

                {/* Hero Section */}
                <div className="w-full relative min-h-[85vh] flex flex-col items-center justify-center p-4 md:p-8">

                    {/* Background Layer - Clean Geometric Pattern */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url("/hero-bg.png")', // Using the clean geometric background
                            backgroundPosition: 'center top'
                        }}
                    >
                        {/* Overlay gradient to ensure text readability if bg is bright */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#051040]/30 via-transparent to-[#051040] mix-blend-multiply" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 flex flex-col items-center w-full max-w-5xl pt-10 md:pt-0">

                        {/* Antigravity Logo */}
                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-2"
                        >
                            <img
                                src="/sanza-logo-transparent.png"
                                alt="Sanza Trophy"
                                className="w-24 md:w-40 h-auto drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]"
                            />
                        </motion.div>

                        {/* Title Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-10"
                        >
                            <h1 className="text-6xl md:text-9xl font-bold mb-0 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] via-[#FDB931] to-[#C49102] drop-shadow-sm font-serif">
                                Sanza
                            </h1>
                            <h2 className="text-2xl md:text-5xl font-light text-[#FDB931] uppercase tracking-[0.2em] transform -mt-2 md:-mt-4 drop-shadow-md">
                                Music Awards
                            </h2>
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-white/80 text-[10px] md:text-sm tracking-[0.4em] uppercase mb-12 font-medium text-center px-4"
                        >
                            Là où les étoiles de la musique brillent
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col md:flex-row gap-5 items-center justify-center w-full mb-20"
                        >
                            <Link to="/categories" className="w-full md:w-auto">
                                <button className="w-full md:w-auto px-10 py-4 bg-gradient-to-b from-[#FFD700] via-[#FDB931] to-[#B8860B] text-[#051040] font-extrabold uppercase tracking-widest text-sm rounded-full shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:scale-105 transition-transform duration-300 border-t border-white/40">
                                    Votez Maintenant
                                </button>
                            </Link>

                            <button
                                onClick={() => window.open('https://youtube.com', '_blank')}
                                className="group flex items-center gap-4 text-[#FDB931] hover:text-white transition-colors uppercase text-xs font-bold tracking-widest px-6 py-3 rounded-full hover:bg-white/5 transition-all"
                            >
                                <div className="w-10 h-10 rounded-full border border-[#FDB931] group-hover:border-white flex items-center justify-center transition-colors">
                                    <Play size={14} fill="currentColor" className="ml-1" />
                                </div>
                                Regarder la vidéo
                            </button>
                        </motion.div>

                        {/* Category Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4 md:px-0 max-w-4xl"
                        >
                            {[
                                { title: "MEILLEUR ARTISTE", subtitle: "MASCULIN" },
                                { title: "MEILLEURE ARTISTE", subtitle: "FÉMININE" },
                                { title: "CHANSON DE", subtitle: "L'ANNÉE" }
                            ].map((card, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-[#0A1A5C]/80 backdrop-blur-md border border-[#FDB931]/30 p-6 text-center cursor-pointer group rounded-xl relative overflow-hidden shadow-lg"
                                >
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FDB931] to-transparent opacity-50" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#FDB931]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <h3 className="text-[#FDB931] text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 group-hover:text-white transition-colors">{card.title}</h3>
                                    <p className="text-white font-bold text-lg tracking-widest font-serif">{card.subtitle}</p>

                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-[#FDB931]/30 group-hover:w-2/3 group-hover:bg-[#FDB931] transition-all duration-500" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-auto py-8 text-center border-t border-white/5 w-full bg-[#051040]">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[#FDB931]/60 text-[10px] font-bold tracking-[0.2em]">
                        <span className="flex items-center gap-2">📞 +237 672 2747 12</span>
                        <span className="hidden md:block text-white/10">|</span>
                        <span className="flex items-center gap-2">✉️ AUGERBIDJANG@GMAIL.COM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
