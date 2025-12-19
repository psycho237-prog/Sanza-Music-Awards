import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Mic2, Users, Music, Video, Star, Sparkles, ChevronLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchOverlay from '../components/SearchOverlay';

const categories = [
    { id: 1, title: 'Artist of the Year', icon: Star, count: '12 Nominees', tag: 'VOTING OPEN', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, title: 'Male Artist', icon: Mic2, count: '8 Nominees', tag: 'AFROBEAT', image: 'https://images.unsplash.com/photo-1520529277867-dbf8c5e0b330?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, title: 'Best Newcomer', icon: Sparkles, count: '6 Nominees', tag: 'DISCOVERY', image: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, title: 'Song of the Year', icon: Music, count: '10 Nominees', tag: 'CHART TOPPER', image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, title: 'Best Vocal', icon: Users, count: '5 Nominees', tag: 'PERFORMANCE', image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, title: 'Best Group / Duo', icon: Users, count: '5 Nominees', tag: 'ENSEMBLE', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop' },
    { id: 7, title: 'Best Music Video', icon: Video, count: '8 Nominees', tag: 'VISUALS', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop' },
];

const Categories = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const displayedCategories = showAll ? categories.slice(1) : categories.slice(1, 5);

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
                data={categories}
            />

            <div className="px-6 space-y-6">
                {/* Featured Category */}
                <Link to="/nominees">
                    <Card className="relative h-56 overflow-hidden group border-none p-0 rounded-[2.5rem]">
                        <img
                            src={categories[0].image}
                            alt={categories[0].title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute top-4 right-4">
                            <span className="text-[9px] font-bold bg-secondary text-white px-3 py-1 rounded-full uppercase tracking-widest">
                                ● {categories[0].tag}
                            </span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
                                    <Star className="text-secondary" size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{categories[0].title}</h3>
                                    <p className="text-[10px] text-gray-300 uppercase tracking-widest">
                                        Top Category • {categories[0].count} <br />
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
                    {displayedCategories.map((cat, index) => (
                        <Link to="/nominees" key={cat.id}>
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
                                            <cat.icon size={12} className="text-secondary" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-[8px] font-bold text-secondary uppercase tracking-[0.2em] mb-1 block">
                                            {cat.tag}
                                        </span>
                                        <h4 className="font-bold text-sm mb-1 leading-tight">{cat.title}</h4>
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{cat.count}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
