import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutGrid, Mail, MessageCircle } from 'lucide-react';
import SanzaTrophy from '../components/ui/SanzaTrophy';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#051040] text-white pb-24 font-sans overflow-x-hidden relative">
            {/* Responsive Luxury Background */}
            <div className="fixed inset-0 z-0 overflow-hidden bg-[#051040]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105 opacity-100"
                    style={{
                        backgroundImage: 'var(--hero-bg)'
                    }}
                />
                <style dangerouslySetInnerHTML={{
                    __html: `
                    :root { --hero-bg: url("/hero-bg-mobile.png"); }
                    @media (min-width: 768px) {
                        :root { --hero-bg: url("/hero-bg-2.jpg"); }
                    }
                `}} />

                {/* Supporting Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#051040]/40 via-transparent to-[#051040] z-[1]" />

                {/* Center Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(253,185,49,0.1)_0%,_rgba(5,16,64,0)_70%)] z-[1]" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-10 z-50 relative max-w-7xl mx-auto w-full">
                <Link to="/categories" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 group backdrop-blur-md">
                    <LayoutGrid size={18} className="text-[#FDB931] group-hover:text-white transition-colors" />
                </Link>
                <div className="hidden md:block">
                    <h1 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#FDB931]/80">Sanza Music Awards</h1>
                </div>
                <Link to="/results" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all relative border border-white/10 group flex items-center justify-center backdrop-blur-md">
                    <SanzaTrophy size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-all" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start relative w-full z-10 px-4 md:px-0">

                {/* Hero Section Content */}
                <div className="w-full min-h-[75vh] flex flex-col items-center justify-start pt-16 md:pt-24 py-8">

                    {/* Main Logo Block - Optimized for Impact on Mobile */}
                    <div className="flex flex-row items-center justify-center gap-3 md:gap-8 mb-10 md:mb-14">
                        {/* Trophy Icon */}
                        <motion.div
                            animate={{ y: [-8, 8, -8] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="h-[120px] xs:h-[150px] md:h-[220px] lg:h-[280px] flex-shrink-0"
                        >
                            <SanzaTrophy className="h-full w-auto drop-shadow-[0_0_40px_rgba(253,185,49,0.5)]" />
                        </motion.div>

                        {/* Text Block */}
                        <div className="flex flex-col items-start justify-center">
                            <motion.h1
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-6xl xs:text-7xl md:text-9xl lg:text-[10rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] via-[#FDB931] to-[#C49102] drop-shadow-sm font-serif"
                            >
                                Sanza
                            </motion.h1>
                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg xs:text-2xl md:text-4xl lg:text-5xl font-light text-[#FDB931] uppercase tracking-[0.2em] md:tracking-[0.4em] pl-1 md:pl-3"
                            >
                                Music Awards
                            </motion.h2>
                        </div>
                    </div>

                    {/* Enhanced Tagline with Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="flex flex-col items-center mb-12"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#FDB931]" />
                            <div className="w-1 h-1 rounded-full bg-[#FDB931]" />
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#FDB931]" />
                        </div>
                        <p className="text-white/90 text-[10px] xs:text-xs md:text-sm tracking-[0.25em] md:tracking-[0.5em] uppercase font-light text-center px-4 max-w-[280px] xs:max-w-none leading-loose">
                            Là où les étoiles de la musique brillent
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#FDB931]" />
                            <div className="w-1 h-1 rounded-full bg-[#FDB931]" />
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#FDB931]" />
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col items-center gap-6 w-full max-w-[300px] xs:max-w-md"
                    >
                        <Link to="/categories" className="w-full md:w-auto">
                            <button className="w-full md:w-auto px-20 xs:px-24 py-4 xs:py-4.5 bg-gradient-to-r from-[#DF9F28] via-[#FDB931] to-[#DF9F28] text-[#051040] font-black uppercase tracking-widest text-xs xs:text-sm rounded-full shadow-[0_4px_30px_rgba(253,185,49,0.4)] hover:scale-105 active:scale-95 transition-all duration-300">
                                Votez Maintenant
                            </button>
                        </Link>


                        {/* Contact Icons - Horizontal */}
                        <div className="flex items-center justify-center gap-6">
                            {/* WhatsApp Icon */}
                            <a
                                href="https://wa.me/237672274712"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                                aria-label="Contactez-nous sur WhatsApp"
                            >
                                <div className="w-11 h-11 rounded-full border-2 border-[#FDB931]/50 group-hover:border-[#25D366] group-hover:scale-110 flex items-center justify-center transition-all duration-300 bg-white/5 backdrop-blur-sm">
                                    <MessageCircle size={20} className="text-[#FDB931]/80 group-hover:text-[#25D366] transition-colors" />
                                </div>
                            </a>

                            {/* Email Icon */}
                            <a
                                href="mailto:augerbidjang@gmail.com"
                                className="group"
                                aria-label="Envoyez-nous un email"
                            >
                                <div className="w-11 h-11 rounded-full border-2 border-[#FDB931]/50 group-hover:border-white group-hover:scale-110 flex items-center justify-center transition-all duration-300 bg-white/5 backdrop-blur-sm">
                                    <Mail size={20} className="text-[#FDB931]/80 group-hover:text-white transition-colors" />
                                </div>
                            </a>
                        </div>


                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
