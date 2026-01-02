"use client";

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Check, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useVotes } from '@/components/context/VoteContext';
import { useEffect, useMemo, Suspense } from 'react';

const VoteSuccessContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { categories, nominees, language } = useVotes();

    const nomineeId = searchParams.get('nomineeId');
    const voteCount = searchParams.get('count');

    const t = {
        FR: {
            title: "Voix entendue !",
            thanks: "Merci de soutenir les talents africains. Votre vote a été enregistré avec succès.",
            nominatedIn: "Nommé dans",
            voteAnother: "Voter dans une autre catégorie",
            shareResult: "Partager le résultat",
            nominee: "Nommé"
        },
        EN: {
            title: "Voice Heard!",
            thanks: "Thank you for supporting African talent. Your vote has been successfully recorded.",
            nominatedIn: "Nominated in",
            voteAnother: "Vote in another category",
            shareResult: "Share result",
            nominee: "Nominee"
        }
    }[language as 'FR' | 'EN'] || {
        FR: {
            title: "Voix entendue !",
            thanks: "Merci de soutenir les talents africains. Votre vote a été enregistré avec succès.",
            nominatedIn: "Nommé dans",
            voteAnother: "Voter dans une autre catégorie",
            shareResult: "Partager le résultat",
            nominee: "Nommé"
        }
    }.FR;

    const nominee = useMemo(() => {
        if (!nomineeId || nominees.length === 0) return null;
        return nominees.find((n: any) => String(n.id) === nomineeId);
    }, [nomineeId, nominees]);

    useEffect(() => {
        if (!nomineeId && nominees.length > 0) {
            router.replace('/');
        }
    }, [nomineeId, nominees, router]);

    if (!nominee) return null;

    const getCategoryTitle = (id: any) => {
        return categories.find((c: any) => c.id === id)?.title || t.nominee;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-black text-white">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(217,70,239,0.5)] relative z-10"
            >
                <Check size={48} className="text-white" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-4"
            >
                {t.title}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mb-12 max-w-xs"
            >
                {t.thanks} {voteCount && `(${voteCount} votes)`}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-xs bg-white/5 rounded-3xl p-4 border border-white/10 mb-12"
            >
                <img
                    src={nominee.image}
                    alt={nominee.name}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-xl font-bold">{nominee.name}</h3>
                <p className="text-sm text-gray-400">{t.nominatedIn} {getCategoryTitle(nominee.categoryId)}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs space-y-4"
            >
                <Link href="/categories">
                    <Button className="w-full py-4 rounded-2xl bg-secondary hover:bg-secondary/90 text-white border-none">
                        {t.voteAnother}
                    </Button>
                </Link>

                <Button variant="ghost" className="w-full gap-2 text-gray-400 border-white/10">
                    <Share2 size={18} />
                    {t.shareResult}
                </Button>
            </motion.div>
        </div>
    );
};

const VoteSuccess = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Chargement...</div>}>
            <VoteSuccessContent />
        </Suspense>
    );
};

export default VoteSuccess;
