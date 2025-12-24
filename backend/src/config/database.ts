import { config } from './env.js';

export interface Category {
    id: string | number;
    title: string;
    nominees_count: string;
    image_url: string;
    featured: boolean;
}

export interface Nominee {
    id: string | number;
    category_id: string | number;
    name: string;
    song: string;
    votes: number;
    image_url: string;
    tag: string | null;
    description: string;
    bio?: string;
    genre: string;
    country: string;
    rank?: string;
    listeners?: string;
    votes_display?: string;
}

export interface Transaction {
    id: string | number;
    nominee_id: number;
    nominee_name: string;
    votes_count: number;
    amount: number;
    payment_method: 'MOMO' | 'OM';
    phone_number: string;
    status: 'pending' | 'success' | 'failed' | 'completed';
    payment_ref?: string;
    external_tx_id?: string;
    created_at: string;
    error?: string;
}

// Mock data for seeding Firebase
export const mockData: {
    categories: Category[];
    nominees: Nominee[];
    transactions: Transaction[];
} = {
    categories: [
        { id: 1, title: 'Artist of the Year', nominees_count: '12 Nominees', image_url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000', featured: true },
        { id: 2, title: 'Best Male Vocalist', nominees_count: '8 Nominees', image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000', featured: false },
        { id: 3, title: 'Best Female Vocalist', nominees_count: '8 Nominees', image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000', featured: false },
        { id: 4, title: 'Best Newcomer', nominees_count: '10 Nominees', image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000', featured: false },
        { id: 5, title: 'Song of the Year', nominees_count: '15 Nominees', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 6, title: 'Album of the Year', nominees_count: '10 Nominees', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 7, title: 'Best Group / Duo', nominees_count: '6 Nominees', image_url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000', featured: false },
        { id: 8, title: 'Best Music Video', nominees_count: '12 Nominees', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000', featured: false },
        { id: 9, title: 'Producer of the Year', nominees_count: '8 Nominees', image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000', featured: false },
        { id: 10, title: 'Best Collaboration', nominees_count: '10 Nominees', image_url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000', featured: false },
        { id: 11, title: 'Best Live Performance', nominees_count: '8 Nominees', image_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000', featured: false },
        { id: 12, title: 'Best Afrobeat Artist', nominees_count: '12 Nominees', image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000', featured: false },
    ],
    nominees: [
        { id: 1, category_id: 1, name: 'Burna Boy', song: 'LAST LAST', votes: 12400, image_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000', tag: 'Top Contender', description: 'The African Giant delivers a heartbreak anthem that conquered global charts.', genre: 'AFRO-FUSION', country: '🇳🇬 Nigeria' },
        { id: 2, category_id: 1, name: 'Wizkid', song: 'ESSENCE', votes: 10500, image_url: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000', tag: null, description: 'Smooth soulful vibes that define the modern Afrobeat sound.', genre: 'AFROBEATS', country: '🇳🇬 Nigeria' },
        { id: 3, category_id: 2, name: 'Davido', song: 'UNAVAILABLE', votes: 9800, image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000', tag: null, description: 'High-energy club banger from the king of Afropop.', genre: 'AFRO-POP', country: '🇳🇬 Nigeria' },
        { id: 4, category_id: 2, name: 'Fireboy DML', song: 'PERU', votes: 8700, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000', tag: null, description: 'Soulful melodies from one of Africa\'s brightest stars.', genre: 'AFRO-SOUL', country: '🇳🇬 Nigeria' },
        { id: 5, category_id: 3, name: 'Tems', song: 'FREE MIND', votes: 11200, image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000', tag: null, description: 'Ethereal vocals from the leading voice of the new generation.', genre: 'ALTÉ / R&B', country: '🇳🇬 Nigeria' },
        { id: 6, category_id: 3, name: 'Ayra Starr', song: 'RUSH', votes: 10100, image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000', tag: null, description: 'The celestial queen of Afropop delivers confidence.', genre: 'AFRO-POP', country: '🇳🇬 Nigeria' },
        { id: 7, category_id: 4, name: 'Asake', song: 'LONELY AT THE TOP', votes: 15600, image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000', tag: 'Rising Star', description: 'Breakout sensation with unique Fuji-Afrobeats blend.', genre: 'AFRO-FUJI', country: '🇳🇬 Nigeria' },
        { id: 8, category_id: 5, name: 'Rema', song: 'CALM DOWN', votes: 25400, image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000', tag: 'Global Hit', description: 'The biggest African song in history.', genre: 'AFRO-RAVE', country: '🇳🇬 Nigeria' },
    ],
    transactions: [],
};
