import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { ChevronLeft, Share2, Play, Pause, Heart, Check, Star, Music, Award } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useVotes } from '../context/VoteContext';
import VoteModal from '../components/VoteModal';

// Local nominees removed in favor of centralized mockData.js

const Profile = () => {
    const { nominees } = useVotes();
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isBioExpanded, setIsBioExpanded] = useState(false);
    const [showAllHits, setShowAllHits] = useState(false);
    const [searchParams] = useSearchParams();
    const nomineeId = searchParams.get('nomineeId');
    const nominee = nominees.find(n => n.id === parseInt(nomineeId)) || nominees[0];

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="pb-32 relative bg-black min-h-screen text-white scrollbar-hide">
            {/* Hero Image */}
            <div className="relative h-[50vh]">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    src={nominee.image}
                    alt={nominee.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

                {/* Header Actions */}
                <div className="absolute top-6 left-0 right-0 p-6 flex justify-between items-center z-10">
                    <Link to="/nominees">
                        <Button variant="ghost" className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white border border-white/10 hover:bg-white/10 transition-all">
                            <ChevronLeft size={24} />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all"
                        onClick={handleShare}
                    >
                        {isCopied ? <Check size={20} className="text-green-400" /> : <Share2 size={20} />}
                        {isCopied && <span className="text-[10px] font-bold mr-2">Lien Copié !</span>}
                    </Button>
                </div>

                {/* Rank Badge */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-12 right-6"
                >
                    <div className="w-20 h-20 rounded-full bg-secondary flex flex-col items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.6)] border-4 border-black/20">
                        <Award size={20} className="mb-1" />
                        <span className="text-[9px] font-bold uppercase tracking-tighter leading-none">Rang</span>
                        <span className="text-2xl font-black leading-none">{nominee.rank}</span>
                    </div>
                </motion.div>
            </div>

            {/* Content */}
            <div className="px-6 -mt-12 relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-secondary/20 text-secondary border border-secondary/30 uppercase tracking-[0.2em]">
                            {nominee.genre}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/10 text-gray-300 border border-white/10 uppercase tracking-[0.2em]">
                            {nominee.country}
                        </span>
                    </div>

                    <h1 className="text-5xl font-black mb-6 tracking-tight">{nominee.name}</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-[#1a1a1a] rounded-[2rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Star size={40} />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total des Votes</p>
                            <p className="text-3xl font-black text-white">{nominee.votes}</p>
                            <span className="text-[10px] text-green-400 font-bold flex items-center gap-1 mt-1">
                                <Check size={10} /> +12% aujourd'hui
                            </span>
                        </div>
                        <div className="bg-[#1a1a1a] rounded-[2rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Music size={40} />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Auditeurs</p>
                            <p className="text-3xl font-black text-white">{nominee.listeners}</p>
                            <span className="text-[10px] text-gray-500 font-bold mt-1 block">Moyenne mensuelle</span>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-12">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Biographie</h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                            {isBioExpanded ? nominee.bio : `${nominee.bio.slice(0, 100)}...`}
                            <span
                                onClick={() => setIsBioExpanded(!isBioExpanded)}
                                className="text-secondary ml-2 font-bold cursor-pointer hover:underline"
                            >
                                {isBioExpanded ? 'Lire moins' : 'Lire plus'}
                            </span>
                        </p>
                    </div>

                    {/* Top Hits */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Meilleurs Titres</h3>
                            <span
                                onClick={() => setShowAllHits(!showAllHits)}
                                className="text-[10px] text-secondary font-bold uppercase tracking-widest cursor-pointer hover:underline"
                            >
                                {showAllHits ? 'Voir moins' : 'Tout voir'}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {(showAllHits ? nominee.hits : nominee.hits.slice(0, 2)).map((hit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 + (i * 0.1) }}
                                    className="flex items-center gap-4 group p-4 rounded-3xl bg-[#1a1a1a] border border-transparent hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center relative overflow-hidden shadow-xl">
                                        <img
                                            src={hit.cover}
                                            alt={hit.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                        <Play size={20} className="relative z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm mb-0.5">{hit.title}</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{hit.album} • {hit.duration}</p>
                                    </div>
                                    <Button variant="ghost" className="text-gray-600 hover:text-secondary hover:bg-secondary/10 p-2 rounded-full transition-colors">
                                        <Heart size={20} />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating Vote Button */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                className="fixed bottom-24 left-6 right-6 z-40"
            >
                <Button
                    className="w-full py-6 text-sm tracking-[0.2em] shadow-[0_20px_50px_rgba(217,70,239,0.4)] font-black rounded-[2rem] bg-secondary hover:bg-secondary/90 text-white border-none uppercase"
                    onClick={() => setIsVoteModalOpen(true)}
                >
                    VOTER POUR {nominee.name.toUpperCase()}
                </Button>
            </motion.div>

            <VoteModal
                isOpen={isVoteModalOpen}
                onClose={() => setIsVoteModalOpen(false)}
                nominee={nominee}
            />
        </div>
    );
};

export default Profile;
