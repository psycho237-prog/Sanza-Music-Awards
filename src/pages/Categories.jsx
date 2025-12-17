import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Mic2, Users, Music, Video, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { id: 1, title: 'Artist of the Year', icon: Star, count: '12 Nominees', color: 'text-yellow-400' },
    { id: 2, title: 'Male Artist', icon: Mic2, count: '8 Nominees', color: 'text-blue-400' },
    { id: 3, title: 'Best Newcomer', icon: Sparkles, count: '6 Nominees', color: 'text-green-400' },
    { id: 4, title: 'Song of the Year', icon: Music, count: '10 Nominees', color: 'text-pink-400' },
    { id: 5, title: 'Best Group / Duo', icon: Users, count: '5 Nominees', color: 'text-purple-400' },
    { id: 6, title: 'Best Music Video', icon: Video, count: '8 Nominees', color: 'text-red-400' },
];

const Categories = () => {
    return (
        <div className="p-6 pt-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Award Categories</h2>
                <span className="text-xs font-semibold bg-secondary/20 text-secondary px-3 py-1 rounded-full animate-pulse">
                    ● VOTING OPEN
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-20">
                {/* Featured Category */}
                <Link to="/nominees" className="col-span-2">
                    <Card className="relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-50" />
                        <div className="relative z-10">
                            <Star className="text-yellow-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-1">Artist of the Year</h3>
                            <p className="text-sm text-gray-300 mb-4">Top Category • 12 Nominees</p>
                            <Button size="sm" className="w-full py-2 text-sm">Vote Now</Button>
                        </div>
                    </Card>
                </Link>

                {/* Other Categories */}
                {categories.slice(1).map((cat, index) => (
                    <Link to="/nominees" key={cat.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col items-center text-center p-4 hover:bg-white/5 transition-colors">
                                <div className={`p-3 rounded-full bg-white/5 mb-3 ${cat.color}`}>
                                    <cat.icon size={24} />
                                </div>
                                <h3 className="font-semibold text-sm mb-1">{cat.title}</h3>
                                <p className="text-xs text-gray-400">{cat.count}</p>
                            </Card>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
