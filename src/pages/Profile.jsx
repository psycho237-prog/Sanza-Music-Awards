import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { ChevronLeft, Share2, Play, Pause, Heart, Check, Star, Music, Award } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import VoteModal from '../components/VoteModal';

const nominees = [
    {
        id: 1,
        name: 'Burna Boy',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop',
        genre: 'AFRO-FUSION',
        country: '🇳🇬 Nigeria',
        rank: '#1',
        votes: '45.2k',
        listeners: '15.4M',
        bio: 'Damini Ebunoluwa Ogulu, known professionally as Burna Boy, is a Nigerian singer, songwriter and record producer. He rose to stardom in 2012 after releasing "Like to Party".',
        hits: [
            { title: 'Last Last', album: 'Love, Damini', duration: '2:52', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&auto=format&fit=crop' },
            { title: 'Ye', album: 'Outside', duration: '3:51', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&auto=format&fit=crop' },
            { title: 'On the Low', album: 'African Giant', duration: '3:05', cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=100&auto=format&fit=crop' },
        ]
    },
    {
        id: 2,
        name: 'Wizkid',
        image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop',
        genre: 'AFROBEATS',
        country: '🇳🇬 Nigeria',
        rank: '#2',
        votes: '42.8k',
        listeners: '12.1M',
        bio: 'Ayodeji Ibrahim Balogun, known professionally as Wizkid, is a Nigerian singer and songwriter. He began recording music at the age of 11 and has since become a global icon.',
        hits: [
            { title: 'Essence', album: 'Made in Lagos', duration: '4:08', cover: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=100&auto=format&fit=crop' },
            { title: 'Ojuelegba', album: 'Ayo', duration: '3:11', cover: 'https://images.unsplash.com/photo-1520529277867-dbf8c5e0b330?q=80&w=100&auto=format&fit=crop' },
            { title: 'Joro', album: 'Single', duration: '4:22', cover: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=100&auto=format&fit=crop' },
        ]
    },
    {
        id: 3,
        name: 'Davido',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        genre: 'AFRO-POP',
        country: '🇳🇬 Nigeria',
        rank: '#3',
        votes: '38.5k',
        listeners: '10.8M',
        bio: 'David Adedeji Adeleke, who is better known as Davido, is an American-born Nigerian singer, songwriter and record producer. He is one of the most influential artists in Africa.',
        hits: [
            { title: 'Unavailable', album: 'Timeless', duration: '2:50', cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=100&auto=format&fit=crop' },
            { title: 'Fall', album: 'A Good Time', duration: '4:00', cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=100&auto=format&fit=crop' },
            { title: 'If', album: 'A Good Time', duration: '3:57', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop' },
        ]
    },
    {
        id: 4,
        name: 'Tems',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        genre: 'ALTÉ / R&B',
        country: '🇳🇬 Nigeria',
        rank: '#4',
        votes: '35.1k',
        listeners: '18.2M',
        bio: 'Temilade Openiyi, known professionally as Tems, is a Nigerian singer, songwriter and record producer. She rose to prominence after being featured on Wizkid\'s 2020 single "Essence".',
        hits: [
            { title: 'Free Mind', album: 'For Broken Ears', duration: '4:07', cover: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=100&auto=format&fit=crop' },
            { title: 'Higher', album: 'For Broken Ears', duration: '3:16', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&auto=format&fit=crop' },
            { title: 'Me & U', album: 'Single', duration: '3:12', cover: 'https://images.unsplash.com/photo-1520529277867-dbf8c5e0b330?q=80&w=100&auto=format&fit=crop' },
        ]
    },
];

const Profile = () => {
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
        <div className="pb-40 relative bg-black min-h-screen text-white scrollbar-hide">
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
                        <span className="text-[9px] font-bold uppercase tracking-tighter leading-none">Rank</span>
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
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total Votes</p>
                            <p className="text-3xl font-black text-white">{nominee.votes}</p>
                            <span className="text-[10px] text-green-400 font-bold flex items-center gap-1 mt-1">
                                <Check size={10} /> +12% today
                            </span>
                        </div>
                        <div className="bg-[#1a1a1a] rounded-[2rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Music size={40} />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Listeners</p>
                            <p className="text-3xl font-black text-white">{nominee.listeners}</p>
                            <span className="text-[10px] text-gray-500 font-bold mt-1 block">Monthly average</span>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-12">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Biography</h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                            {isBioExpanded ? nominee.bio : `${nominee.bio.slice(0, 100)}...`}
                            <span
                                onClick={() => setIsBioExpanded(!isBioExpanded)}
                                className="text-secondary ml-2 font-bold cursor-pointer hover:underline"
                            >
                                {isBioExpanded ? 'Read less' : 'Read more'}
                            </span>
                        </p>
                    </div>

                    {/* Top Hits */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Top Hits</h3>
                            <span
                                onClick={() => setShowAllHits(!showAllHits)}
                                className="text-[10px] text-secondary font-bold uppercase tracking-widest cursor-pointer hover:underline"
                            >
                                {showAllHits ? 'Show less' : 'See all'}
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
                className="fixed bottom-10 left-6 right-6 z-40"
            >
                <Button
                    className="w-full py-6 text-sm tracking-[0.2em] shadow-[0_20px_50px_rgba(217,70,239,0.4)] font-black rounded-[2rem] bg-secondary hover:bg-secondary/90 text-white border-none uppercase"
                    onClick={() => setIsVoteModalOpen(true)}
                >
                    VOTE FOR {nominee.name.toUpperCase()}
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
