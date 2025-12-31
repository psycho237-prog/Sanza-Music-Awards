import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Mic2, Users, Music, Video, Star, Sparkles, ChevronLeft, Search, Heart, Disc, Radio, Zap } from 'lucide-react';
import SanzaTrophy from '../components/ui/SanzaTrophy';
import { Link } from 'react-router-dom';
import { useVotes } from '../context/VoteContext';
import SearchOverlay from '../components/SearchOverlay';

// Local categories removed in favor of centralized mockData.js

const Categories = () => {
    const { categories, nominees } = useVotes();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const featuredCategory = categories.find(c => c.featured) || categories[0];
    const otherCategories = categories.filter(c => !c.featured);
    const displayedCategories = showAll ? otherCategories : otherCategories.slice(0, 4);

    const getIcon = (title) => {
        switch (title) {
            case 'Best Male Vocalist': return Mic2;
            case 'Best Female Vocalist': return Heart;
            case 'Best Newcomer': return Sparkles;
            case 'Song of the Year': return Music;
            case 'Album of the Year': return Disc;
            case 'Best Group / Duo': return Users;
            case 'Best Music Video': return Video;
            case 'Producer of the Year': return Zap;
            case 'Best Collaboration': return Users;
            case 'Best Live Performance': return Radio;
            case 'Best Afrobeat Artist': return SanzaTrophy;
            default: return SanzaTrophy;
        }
    };

    return (
        <div className="p-0 bg-black min-h-screen text-white pb-32">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8">
                <Link to="/">
                    <Button variant="ghost" className="p-2 rounded-full hover:bg-white/5">
                        <ChevronLeft size={24} />
                    </Button>
                </Link>
                <h2 className="text-sm font-bold tracking-widest uppercase">Award Categories</h2>
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
                data={[...categories, ...nominees]}
            />

            <div className="px-6 space-y-6">
                {/* Featured Category */}
                <Link to={`/nominees?categoryId=${featuredCategory.id}`}>
                    <Card className="relative h-56 overflow-hidden group border-none p-0 rounded-[2.5rem]">
                        <img
                            src={featuredCategory.image}
                            alt={featuredCategory.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute top-4 right-4">
                            <span className="text-[9px] font-bold bg-secondary text-white px-3 py-1 rounded-full uppercase tracking-widest">
                                ● VOTING OPEN
                            </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
                                    <Star className="text-secondary" size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{featuredCategory.title}</h3>
                                    <p className="text-[10px] text-gray-300 uppercase tracking-widest">
                                        Top Category • {featuredCategory.nominees} <br />
                                        <span className="text-secondary font-bold">ENDS IN 20H</span>
                                    </p>
                                </div>
                            </div>
                            <Button className="w-full py-3 rounded-xl font-bold bg-secondary hover:bg-secondary/90 text-white border-none text-xs">
                                Vote Now
                            </Button>
                        </div>
                    </Card>
                </Link>

                <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Browse Categories</h3>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-[10px] text-secondary font-bold uppercase tracking-widest hover:underline"
                    >
                        {showAll ? 'Show Less' : 'View All'}
                    </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {displayedCategories.map((cat, index) => {
                        const Icon = getIcon(cat.title);
                        return (
                            <Link to={`/nominees?categoryId=${cat.id}`} key={cat.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="relative h-44 overflow-hidden group border-none p-0 rounded-[2rem]">
                                        <img
                                            src={cat.image}
                                            alt={cat.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                        <div className="absolute top-3 right-3">
                                            <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                                                <Icon size={12} className="text-secondary" />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="text-[8px] font-bold text-secondary uppercase tracking-[0.2em] mb-1 block">
                                                VOTING OPEN
                                            </span>
                                            <h4 className="font-bold text-sm mb-1 leading-tight">{cat.title}</h4>
                                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{cat.nominees}</p>
                                        </div>
                                    </Card>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Categories;
