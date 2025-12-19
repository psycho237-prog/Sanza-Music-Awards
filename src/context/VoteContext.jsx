import { createContext, useContext, useState, useEffect } from 'react';
import { nominees as initialNominees, categories as initialCategories } from '../data/mockData';

const VoteContext = createContext();

export const useVotes = () => {
    const context = useContext(VoteContext);
    if (!context) {
        throw new Error('useVotes must be used within a VoteProvider');
    }
    return context;
};

export const VoteProvider = ({ children }) => {
    const [nominees, setNominees] = useState(initialNominees);
    const [categories, setCategories] = useState(initialCategories);

    const incrementVote = (nomineeId, count = 1) => {
        setNominees(prevNominees =>
            prevNominees.map(nominee => {
                if (nominee.id === nomineeId) {
                    // Convert '12.4k' to number, increment, and convert back
                    const currentVotes = parseFloat(nominee.votes.replace('k', '')) * (nominee.votes.includes('k') ? 1000 : 1);
                    const newVotes = currentVotes + count;
                    const formattedVotes = newVotes >= 1000 ? `${(newVotes / 1000).toFixed(1)}k` : newVotes.toString();
                    return { ...nominee, votes: formattedVotes };
                }
                return nominee;
            })
        );
    };

    const getGlobalRankings = () => {
        return [...nominees].sort((a, b) => {
            const votesA = parseFloat(a.votes.replace('k', '')) * (a.votes.includes('k') ? 1000 : 1);
            const votesB = parseFloat(b.votes.replace('k', '')) * (b.votes.includes('k') ? 1000 : 1);
            return votesB - votesA;
        });
    };

    const getCategoryRankings = (categoryId) => {
        return nominees
            .filter(n => n.categoryId === categoryId)
            .sort((a, b) => {
                const votesA = parseFloat(a.votes.replace('k', '')) * (a.votes.includes('k') ? 1000 : 1);
                const votesB = parseFloat(b.votes.replace('k', '')) * (b.votes.includes('k') ? 1000 : 1);
                return votesB - votesA;
            });
    };

    const getTotalVotes = () => {
        const total = nominees.reduce((acc, nominee) => {
            const votes = parseFloat(nominee.votes.replace('k', '')) * (nominee.votes.includes('k') ? 1000 : 1);
            return acc + votes;
        }, 0);

        return total >= 1000000
            ? `${(total / 1000000).toFixed(1)}M+`
            : total >= 1000
                ? `${(total / 1000).toFixed(1)}k+`
                : total.toString();
    };

    const value = {
        nominees,
        categories,
        incrementVote,
        getGlobalRankings,
        getCategoryRankings,
        getTotalVotes
    };

    return (
        <VoteContext.Provider value={value}>
            {children}
        </VoteContext.Provider>
    );
};
