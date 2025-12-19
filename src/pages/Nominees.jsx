import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ChevronLeft, Star, Mic2, Share2, Check, LayoutGrid, User } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import VoteModal from '../components/VoteModal';

const nominees = [
    {
        id: 1,
        name: 'Burna Boy',
        song: 'LAST LAST',
        votes: '12.4k',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop',
        tag: 'Top Contender',
        description: 'The African Giant delivers a heartbreak anthem that conquered global charts with Afro-fusion.'
    },
    {
        id: 2,
        name: 'Wizkid',
        song: 'ESSENCE',
        votes: '10.5k',
        image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop',
        description: 'Smooth soulful vibes that define the modern Afrobeat sound. A global sensation.'
    },
    {
        id: 3,
        name: 'Davido',
        song: 'UNAVAILABLE',
        votes: '9.8k',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        description: 'High-energy club banger that showcases the king of modern Afropop at his best.'
    },
    {
        id: 4,
        name: 'Tems',
        song: 'FREE MIND',
        votes: '8.2k',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        description: 'Ethereal vocals and deeply personal lyrics from the leading voice of the new generation.'
    },
];

const Nominees = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
    const [selectedNominee, setSelectedNominee] = useState(null);
    const [searchParams] = useSearchParams();
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        const nomineeId = searchParams.get('nomineeId');
        if (nomineeId) {
            const nominee = nominees.find(n => n.id === parseInt(nomineeId));
            if (nominee) {
                setSelectedNominee(nominee);
                setIsVoteModalOpen(true);
            }
        }
    }, [searchParams]);

    const handleVoteClick = (nominee) => {
        setSelectedNominee(nominee);
        setIsVoteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsVoteModalOpen(false);
        setSelectedNominee(null);
    };

    const handleShare = (e, nominee) => {
        e.preventDefault();
        e.stopPropagation();
        const url = new URL(window.location.href);
        url.searchParams.set('nomineeId', nominee.id);
        navigator.clipboard.writeText(url.toString());
        setCopiedId(nominee.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="p-0 bg-black min-h-screen text-white pb-32">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8">
                <Link to="/categories">
                    <Button variant="ghost" className="p-2 rounded-full hover:bg-white/5">
                        <ChevronLeft size={24} />
                    </Button>
                </Link>
                <h2 className="text-sm font-bold tracking-widest uppercase">Best Male Vocalist</h2>
                <Button variant="ghost" className="p-2 rounded-full hover:bg-white/5">
                    <LayoutGrid size={20} />
                </Button>
            </div>

            <div className="px-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">
                        Cast your vote for the <br />
                        <span className="text-secondary">2024 winner.</span>
                    </h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        Voting closes in 3 days. You have 5 votes remaining today.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {['All', 'Trending', 'Newest', 'A-Z'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-secondary text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Nominee List */}
                <div className="space-y-8">
                    {nominees.map((nominee, index) => (
                        <motion.div
                            key={nominee.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-0 overflow-hidden border-none bg-[#1a1a1a] group rounded-[2.5rem]">
                                <Link to={`/profile?nomineeId=${nominee.id}`} className="block relative h-64">
                                    <img
                                        src={nominee.image}
                                        alt={nominee.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />

                                    {nominee.tag && (
                                        <div className="absolute top-4 left-4">
                                            <span className="flex items-center gap-1 px-3 py-1 bg-yellow-400/20 text-yellow-400 text-[9px] font-bold rounded-full backdrop-blur-md border border-yellow-400/30 uppercase tracking-widest">
                                                <Star size={10} fill="currentColor" /> {nominee.tag}
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex justify-between items-end mb-2">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">{nominee.name}</h3>
                                                <p className="text-secondary text-[10px] font-bold tracking-[0.2em] uppercase">{nominee.song}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold">{nominee.votes}</p>
                                                <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Votes</p>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 font-medium">
                                            {nominee.description}
                                        </p>
                                    </div>
                                </Link>

                                <div className="absolute top-4 right-4 z-10">
                                    <button
                                        onClick={(e) => handleShare(e, nominee)}
                                        className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all border border-white/10"
                                    >
                                        {copiedId === nominee.id ? (
                                            <Check size={14} className="text-green-400" />
                                        ) : (
                                            <Share2 size={14} />
                                        )}
                                    </button>
                                </div>

                                <div className="p-6 pt-0">
                                    <Button
                                        className="w-full py-4 bg-secondary hover:bg-secondary/90 text-white border-none rounded-full font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(217,70,239,0.2)]"
                                        onClick={() => handleVoteClick(nominee)}
                                    >
                                        <User size={16} fill="currentColor" /> VOTE
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            <VoteModal
                isOpen={isVoteModalOpen}
                onClose={handleCloseModal}
                nominee={selectedNominee}
            />
        </div>
    );
};

export default Nominees;
