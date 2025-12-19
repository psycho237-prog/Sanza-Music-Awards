import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight, Mic2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose, data = [] }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const filteredResults = query.trim() === ''
        ? []
        : data.filter(item =>
            (item.title && item.title.toLowerCase().includes(query.toLowerCase())) ||
            (item.name && item.name.toLowerCase().includes(query.toLowerCase()))
        );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center gap-4 p-6 pt-12">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search categories or artists..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-secondary transition-colors font-bold text-sm text-white"
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="flex-1 overflow-y-auto px-6 pb-12 scrollbar-hide">
                        {query.trim() === '' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                <Search size={64} className="mb-4" />
                                <p className="text-sm font-bold uppercase tracking-widest">Start typing to search</p>
                            </div>
                        ) : filteredResults.length > 0 ? (
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                                    Found {filteredResults.length} Results
                                </p>
                                {filteredResults.map((result, index) => (
                                    <motion.div
                                        key={result.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={result.title ? "/nominees" : `/profile?nomineeId=${result.id}`}
                                            onClick={onClose}
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group"
                                        >
                                            <div className="w-12 h-12 rounded-xl overflow-hidden">
                                                <img
                                                    src={result.image}
                                                    alt={result.title || result.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm">{result.title || result.name}</h4>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                                                    {result.title ? 'Category' : 'Artist'}
                                                </p>
                                            </div>
                                            <ArrowRight size={16} className="text-gray-600 group-hover:text-secondary transition-colors" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                <Search size={64} className="mb-4" />
                                <p className="text-sm font-bold uppercase tracking-widest">No results found for "{query}"</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
