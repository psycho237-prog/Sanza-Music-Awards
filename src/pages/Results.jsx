import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Trophy, Star, TrendingUp, ChevronLeft, Search, Medal, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchOverlay from '../components/SearchOverlay';

const standings = [
    { id: 1, name: 'Burna Boy', votes: '45.2k', rank: 1, trend: 'up', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Wizkid', votes: '42.8k', rank: 2, trend: 'down', image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Davido', votes: '38.5k', rank: 3, trend: 'up', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Tems', votes: '35.1k', rank: 4, trend: 'stable', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
];

const winners = [
    { id: 1, category: 'Best Newcomer', name: 'Ayra Starr', year: '2023', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, category: 'Song of the Year', name: 'Rema', year: '2023', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop' },
];

const Results = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="p-0 bg-black min-h-screen text-white pb-32">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8">
                <Link to="/categories">
                    <Button variant="ghost" className="p-2 rounded-full hover:bg-white/5">
                        <ChevronLeft size={24} />
                    </Button>
                </Link>
                <h2 className="text-sm font-bold tracking-widest uppercase">Live Results</h2>
                <Button
                    variant="ghost"
                    className="p-2 rounded-full hover:bg-white/5"
                    onClick={() => setIsSearchOpen(true)}
                >
                    <Search size={20} />
                </Button>
            </div>

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                data={[...standings, ...winners]}
            />

            <div className="px-6 space-y-8">
                {/* Hero Stats */}
                <div className="relative h-48 rounded-[2.5rem] overflow-hidden border border-white/5 p-8 flex flex-col justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000&auto=format&fit=crop"
                        alt="Results Hero"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Trophy size={120} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-2">Total Votes Cast</h3>
                        <p className="text-5xl font-black tracking-tighter">1.2M+</p>
                        <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Updating in real-time • Next update in 4m</p>
                    </div>
                </div>

                {/* Live Standings */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Artist of the Year</h3>
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-widest flex items-center gap-1">
                            <TrendingUp size={12} /> Live Standings
                        </span>
                    </div>

                    <div className="space-y-4">
                        {standings.map((artist, index) => (
                            <motion.div
                                key={artist.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-4 bg-[#1a1a1a] border-none rounded-3xl flex items-center gap-4 group hover:bg-white/5 transition-all">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                                            <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-black ${artist.rank === 1 ? 'bg-yellow-400 text-black' :
                                            artist.rank === 2 ? 'bg-gray-300 text-black' :
                                                artist.rank === 3 ? 'bg-orange-400 text-black' : 'bg-white/10 text-white'
                                            }`}>
                                            {artist.rank}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm mb-1">{artist.name}</h4>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${100 - (index * 15)}%` }}
                                                className="h-full bg-secondary"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-bold">{artist.votes}</p>
                                        <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Votes</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Past Winners */}
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Hall of Fame</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {winners.map((winner, index) => (
                            <motion.div
                                key={winner.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (index * 0.1) }}
                            >
                                <Card className="p-0 overflow-hidden border-none bg-[#1a1a1a] rounded-[2rem] relative aspect-square">
                                    <img src={winner.image} alt={winner.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                    <div className="absolute top-3 right-3">
                                        <Crown size={16} className="text-yellow-400" fill="currentColor" />
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-[8px] text-secondary font-bold uppercase tracking-widest mb-1">{winner.category}</p>
                                        <h4 className="font-bold text-xs mb-1">{winner.name}</h4>
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{winner.year} Winner</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
