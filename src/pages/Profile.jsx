import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { ChevronLeft, Share2, Play, Pause, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className="pb-24 relative">
            {/* Hero Image */}
            <div className="relative h-[45vh]">
                <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop"
                    alt="Amara Okeke"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

                {/* Header Actions */}
                <div className="absolute top-6 left-0 right-0 p-6 flex justify-between items-center z-10">
                    <Link to="/nominees">
                        <Button variant="ghost" className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white">
                            <ChevronLeft size={24} />
                        </Button>
                    </Link>
                    <Button variant="ghost" className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white">
                        <Share2 size={20} />
                    </Button>
                </div>

                {/* Rank Badge */}
                <div className="absolute bottom-10 right-6">
                    <div className="w-16 h-16 rounded-full bg-secondary flex flex-col items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.5)] animate-bounce">
                        <span className="text-[10px] font-bold uppercase">Rank</span>
                        <span className="text-2xl font-black">#2</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 -mt-8 relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        AFRO-BEATS
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-300 border border-white/10">
                        🇳🇬 Nigeria
                    </span>
                </div>

                <h1 className="text-3xl font-bold mb-4">Amara Okeke</h1>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <p className="text-xs text-gray-400 uppercase mb-1">Total Votes</p>
                        <p className="text-2xl font-bold">25,403</p>
                        <span className="text-[10px] text-green-400">▲ +12% today</span>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <p className="text-xs text-gray-400 uppercase mb-1">Listeners</p>
                        <p className="text-2xl font-bold">1.2M</p>
                        <span className="text-[10px] text-gray-500">Monthly avg</span>
                    </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                    <h3 className="font-bold mb-2">About Amara</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Born in Lagos, Amara Okeke fuses traditional highlife rhythms with contemporary pop synths. Her debut album "African Sun" topped charts across the continent.
                        <span className="text-secondary ml-1">Read more</span>
                    </p>
                </div>

                {/* Top Hits */}
                <div className="mb-24">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Top Hits</h3>
                        <span className="text-xs text-secondary">See all</span>
                    </div>

                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 mb-4 group">
                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center relative overflow-hidden">
                                <img
                                    src={`https://source.unsplash.com/random/100x100?music&sig=${i}`}
                                    alt="Cover"
                                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                                />
                                <Play size={16} className="relative z-10" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Lagos Nights</h4>
                                <p className="text-xs text-gray-400">Essence</p>
                            </div>
                            <Button variant="ghost" className="text-secondary">
                                <Heart size={18} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Vote Button */}
            <div className="fixed bottom-24 left-6 right-6 z-40">
                <Link to="/vote-success">
                    <Button className="w-full py-4 text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                        VOTE FOR AMARA
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
