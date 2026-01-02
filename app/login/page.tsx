"use client";

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Mail, Lock, Apple, Facebook, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-black overflow-hidden text-white">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
            </div>

            <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-pulse z-0" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm z-10"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-[2rem] mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.4)]"
                    >
                        <Star className="text-white" size={40} fill="currentColor" />
                    </motion.div>
                    <h1 className="text-4xl font-black mb-3 tracking-tight">Vibrez au Rythme</h1>
                    <p className="text-gray-400 text-sm font-medium">Connectez-vous pour voter pour la prochaine star</p>
                </div>

                <div className="flex bg-white/5 p-1.5 rounded-[2rem] mb-10 border border-white/5">
                    <button className="flex-1 py-3.5 rounded-[1.5rem] bg-secondary text-white font-bold text-xs uppercase tracking-widest shadow-xl transition-all">Connexion</button>
                    <button className="flex-1 py-3.5 rounded-[1.5rem] text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-gray-300 transition-all">S'inscrire</button>
                </div>

                <div className="space-y-5 mb-10">
                    <div className="relative group">
                        < Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary transition-colors" size={20} />
                        <input
                            type="email"
                            placeholder="Email ou Numéro de Téléphone"
                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-14 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-secondary focus:bg-white/[0.08] transition-all font-bold text-sm"
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary transition-colors" size={20} />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-14 pr-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-secondary focus:bg-white/[0.08] transition-all font-bold text-sm"
                        />
                    </div>
                    <div className="text-right px-2">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest cursor-pointer hover:underline">Mot de passe oublié ?</span>
                    </div>
                </div>

                <Link href="/categories">
                    <Button className="w-full py-5 text-sm font-black rounded-[1.5rem] bg-secondary hover:bg-secondary/90 text-white border-none uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(217,70,239,0.3)] group">
                        Commencer à Voter <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                </Link>

                <div className="relative my-12">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
                        <span className="px-4 bg-black text-gray-600">Ou continuer avec</span>
                    </div>
                </div>

                <div className="flex justify-center gap-6">
                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group">
                        <Apple size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group">
                        <span className="font-black text-xl text-gray-400 group-hover:text-white transition-colors">G</span>
                    </button>
                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group">
                        <Facebook size={24} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </button>
                </div>

                <p className="text-center text-[9px] font-bold text-gray-600 mt-12 uppercase tracking-widest leading-relaxed">
                    En continuant, vous acceptez nos <br />
                    <span className="text-gray-400 hover:text-white cursor-pointer">Conditions d'utilisation</span> & <span className="text-gray-400 hover:text-white cursor-pointer">Politique de confidentialité</span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
