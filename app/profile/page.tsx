"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVotes } from '@/components/context/VoteContext';

const ProfileRandom = () => {
    const { nominees, isLoading } = useVotes();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && nominees.length > 0) {
            const randomId = nominees[Math.floor(Math.random() * nominees.length)].id;
            router.replace(`/profile/${randomId}`);
        }
    }, [nominees, isLoading, router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
    );
};

export default ProfileRandom;
