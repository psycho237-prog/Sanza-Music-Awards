import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ChevronLeft, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const nominees = [
    { id: 1, name: 'Burna Boy', song: 'Last Last', votes: '12.4k', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Wizkid', song: 'Essence', votes: '10.5k', image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Davido', song: 'Unavailable', votes: '9.8k', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Tems', song: 'Free Mind', votes: '8.2k', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
];

const tabs = ['All', 'Trending', 'Newest', 'A-Z'];

const Nominees = () => {
    const [activeTab, setActiveTab] = useState('All');

    return (
        <div className="p-6 pt-8 pb-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Link to="/categories">
                    <Button variant="ghost" className="p-2 rounded-full">
                        <ChevronLeft size={24} />
                    </Button>
                </Link>
                <h2 className="text-lg font-bold">Best Male Vocalist</h2>
                <Button variant="ghost" className="p-2 rounded-full">
                    <Filter size={20} />
                </Button>
            </div>

            {/* Description */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Cast your vote for the <br /><span className="text-secondary">2024 winner.</span></h1>
                <p className="text-xs text-gray-400">Voting closes in 3 days. You have 5 votes remaining today.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab
                                ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Top Contender Highlight */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">👑 Top Contender</span>
                </div>
                <Link to="/profile">
                    <Card className="p-0 overflow-hidden relative group">
                        <img
                            src={nominees[0].image}
                            alt={nominees[0].name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-xl font-bold">{nominees[0].name}</h3>
                                    <p className="text-sm text-gray-300">{nominees[0].song}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-secondary">{nominees[0].votes}</span>
                                    <p className="text-[10px] text-gray-400">Votes</p>
                                </div>
                            </div>
                            <Button className="w-full mt-3 py-2 text-sm font-bold">
                                VOTE
                            </Button>
                        </div>
                    </Card>
                </Link>
            </div>

            {/* List */}
            <div className="space-y-4">
                {nominees.slice(1).map((nominee, index) => (
                    <motion.div
                        key={nominee.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="p-3 flex items-center gap-4 hover:bg-white/5 transition-colors">
                            <img
                                src={nominee.image}
                                alt={nominee.name}
                                className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold">{nominee.name}</h3>
                                <p className="text-xs text-gray-400 mb-2">{nominee.song}</p>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                    Smooth soulful vibes that define the modern Afrobeat sound.
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-sm font-bold text-gray-300">{nominee.votes}</span>
                                <Button size="sm" variant="secondary" className="px-4 py-1 text-xs">
                                    VOTE
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Nominees;
