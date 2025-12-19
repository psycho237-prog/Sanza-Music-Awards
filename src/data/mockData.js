export const categories = [
    {
        id: 1,
        title: 'Artist of the Year',
        nominees: '12 Nominees',
        image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop',
        featured: true
    },
    {
        id: 2,
        title: 'Best Male Vocalist',
        nominees: '8 Nominees',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Best Female Vocalist',
        nominees: '8 Nominees',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Best Newcomer',
        nominees: '10 Nominees',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'Song of the Year',
        nominees: '15 Nominees',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Album of the Year',
        nominees: '10 Nominees',
        image: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 7,
        title: 'Best Group / Duo',
        nominees: '6 Nominees',
        image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 8,
        title: 'Best Music Video',
        nominees: '12 Nominees',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 9,
        title: 'Producer of the Year',
        nominees: '8 Nominees',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 10,
        title: 'Best Collaboration',
        nominees: '10 Nominees',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 11,
        title: 'Best Live Performance',
        nominees: '8 Nominees',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 12,
        title: 'Best Afrobeat Artist',
        nominees: '12 Nominees',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop'
    }
];

export const nominees = [
    // Artist of the Year (Category 1)
    {
        id: 1,
        categoryId: 1,
        name: 'Burna Boy',
        song: 'LAST LAST',
        votes: '12.4k',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop',
        tag: 'Top Contender',
        description: 'The African Giant delivers a heartbreak anthem that conquered global charts with Afro-fusion.',
        bio: 'Burna Boy is a Nigerian singer, songwriter and record producer. He rose to stardom in 2012 after releasing "Like to Party", the lead single from his debut studio album L.I.F.E. In 2017, Burna Boy signed with Bad Habit/Atlantic Records in the United States and Warner Music Group internationally.',
        genre: 'AFRO-FUSION',
        country: '🇳🇬 Nigeria',
        rank: '#1',
        listeners: '15.4M',
        hits: [
            { title: 'Last Last', album: 'Love, Damini', duration: '2:52', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&auto=format&fit=crop' },
            { title: 'Ye', album: 'Outside', duration: '3:51', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&auto=format&fit=crop' },
            { title: 'On the Low', album: 'African Giant', duration: '3:05', cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    {
        id: 2,
        categoryId: 1,
        name: 'Wizkid',
        song: 'ESSENCE',
        votes: '10.5k',
        image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop',
        description: 'Smooth soulful vibes that define the modern Afrobeat sound. A global sensation.',
        bio: 'Ayodeji Ibrahim Balogun, known professionally as Wizkid, is a Nigerian singer and songwriter. A prominent figure in the modern-day Afrobeats music scene, Wizkid is regarded as one of the biggest and most influential African artists of all time.',
        genre: 'AFROBEATS',
        country: '🇳🇬 Nigeria',
        rank: '#2',
        listeners: '12.1M',
        hits: [
            { title: 'Essence', album: 'Made in Lagos', duration: '4:08', cover: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=100&auto=format&fit=crop' },
            { title: 'Ojuelegba', album: 'Ayo', duration: '3:11', cover: 'https://images.unsplash.com/photo-1520529277867-dbf8c5e0b330?q=80&w=100&auto=format&fit=crop' },
            { title: 'Joro', album: 'Single', duration: '4:22', cover: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Best Male Vocalist (Category 2)
    {
        id: 3,
        categoryId: 2,
        name: 'Davido',
        song: 'UNAVAILABLE',
        votes: '9.8k',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        description: 'High-energy club banger that showcases the king of modern Afropop at his best.',
        bio: 'David Adedeji Adeleke, who is better known as Davido, is an American-born Nigerian singer, songwriter and record producer. Davido rose to fame after releasing "Dami Duro", the second single from his debut studio album Omo Baba Olowo.',
        genre: 'AFRO-POP',
        country: '🇳🇬 Nigeria',
        rank: '#3',
        listeners: '10.8M',
        hits: [
            { title: 'Unavailable', album: 'Timeless', duration: '2:50', cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=100&auto=format&fit=crop' },
            { title: 'Fall', album: 'A Good Time', duration: '4:00', cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=100&auto=format&fit=crop' },
            { title: 'If', album: 'A Good Time', duration: '3:57', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    {
        id: 4,
        categoryId: 2,
        name: 'Fireboy DML',
        song: 'PERU',
        votes: '8.7k',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        description: 'Soulful melodies and infectious rhythms from one of Africa\'s brightest stars.',
        bio: 'Adedamola Adefolahan, known professionally as Fireboy DML, is a Nigerian singer. He is signed to YBNL Nation, a record label founded by Nigerian rapper Olamide.',
        genre: 'AFRO-SOUL',
        country: '🇳🇬 Nigeria',
        rank: '#5',
        listeners: '8.5M',
        hits: [
            { title: 'Peru', album: 'Playboy', duration: '3:07', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&auto=format&fit=crop' },
            { title: 'Jealous', album: 'Laughter, Tears & Goosebumps', duration: '3:36', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Best Female Vocalist (Category 3)
    {
        id: 5,
        categoryId: 3,
        name: 'Tems',
        song: 'FREE MIND',
        votes: '11.2k',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        description: 'Ethereal vocals and deeply personal lyrics from the leading voice of the new generation.',
        bio: 'Temilade Openiyi, known professionally as Tems, is a Nigerian singer, songwriter and record producer. She rose to prominence after being featured on Wizkid\'s 2020 single "Essence".',
        genre: 'ALTÉ / R&B',
        country: '🇳🇬 Nigeria',
        rank: '#4',
        listeners: '18.2M',
        hits: [
            { title: 'Free Mind', album: 'For Broken Ears', duration: '4:07', cover: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=100&auto=format&fit=crop' },
            { title: 'Higher', album: 'For Broken Ears', duration: '3:16', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    {
        id: 6,
        categoryId: 3,
        name: 'Ayra Starr',
        song: 'RUSH',
        votes: '10.1k',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
        description: 'The celestial queen of Afropop delivers a chart-topping anthem of confidence.',
        bio: 'Oyinkansola Sarah Aderibigbe, known professionally as Ayra Starr, is a Beninese-born Nigerian singer. She began a fashion career at the age of 16 with Quat Management before deciding to pursue music.',
        genre: 'AFRO-POP',
        country: '🇳🇬 Nigeria',
        rank: '#6',
        listeners: '9.2M',
        hits: [
            { title: 'Rush', album: '19 & Dangerous', duration: '3:05', cover: 'https://images.unsplash.com/photo-1520529277867-dbf8c5e0b330?q=80&w=100&auto=format&fit=crop' },
            { title: 'Bloody Samaritan', album: '19 & Dangerous', duration: '3:07', cover: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Best Newcomer (Category 4)
    {
        id: 7,
        categoryId: 4,
        name: 'Asake',
        song: 'LONELY AT THE TOP',
        votes: '15.6k',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
        tag: 'Rising Star',
        description: 'The breakout sensation of the year with a unique blend of Fuji and Afrobeats.',
        bio: 'Ahmed Ololade, known professionally as Asake, is a Nigerian singer and songwriter. He is signed to YBNL Nation and Empire Distribution.',
        genre: 'AFRO-FUJI',
        country: '🇳🇬 Nigeria',
        rank: '#7',
        listeners: '7.8M',
        hits: [
            { title: 'Lonely At The Top', album: 'Work of Art', duration: '2:37', cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=100&auto=format&fit=crop' },
            { title: 'Sungba', album: 'Ololade Asake', duration: '3:00', cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    {
        id: 8,
        categoryId: 4,
        name: 'Seyi Vibez',
        song: 'CHANCE',
        votes: '9.2k',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        description: 'Street-pop sensation bringing fresh energy to the Nigerian music scene.',
        bio: 'Oluwaloseyi Akorede Balogun, known professionally as Seyi Vibez, is a Nigerian singer and songwriter.',
        genre: 'STREET-POP',
        country: '🇳🇬 Nigeria',
        rank: '#12',
        listeners: '4.5M',
        hits: [
            { title: 'Chance', album: 'Billion Dollar Baby', duration: '2:45', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Song of the Year (Category 5)
    {
        id: 9,
        categoryId: 5,
        name: 'Rema',
        song: 'CALM DOWN',
        votes: '25.4k',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        tag: 'Global Hit',
        description: 'The biggest African song in history, breaking records across all continents.',
        bio: 'Divine Ikubor, known professionally as Rema, is a Nigerian singer and rapper. He rose to stardom with the release of the song "Iron Man", which appeared on Barack Obama\'s 2019 summer playlist.',
        genre: 'AFRO-RAVE',
        country: '🇳🇬 Nigeria',
        rank: '#1',
        listeners: '35.4M',
        hits: [
            { title: 'Calm Down', album: 'Rave & Roses', duration: '3:39', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&auto=format&fit=crop' },
            { title: 'Soundgasm', album: 'Rave & Roses', duration: '3:24', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Album of the Year (Category 6)
    {
        id: 10,
        categoryId: 6,
        name: 'Olamide',
        song: 'UNRULY',
        votes: '12.8k',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
        description: 'A masterpiece from the legend of street-hop, showcasing versatility and growth.',
        bio: 'Olamide Gbenga Adedeji, known professionally as Olamide, is a Nigerian rapper, singer and songwriter. He is one of the most influential artists in Africa.',
        genre: 'HIP-HOP',
        country: '🇳🇬 Nigeria',
        rank: '#8',
        listeners: '6.2M',
        hits: [
            { title: 'Jinja', album: 'Unruly', duration: '3:12', cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Best Group / Duo (Category 7)
    {
        id: 11,
        categoryId: 7,
        name: 'Sauti Sol',
        song: 'MIDNIGHT TRAIN',
        votes: '8.5k',
        image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000&auto=format&fit=crop',
        description: 'Kenya\'s finest group continues to deliver world-class harmonies and production.',
        bio: 'Sauti Sol is a Kenyan afro-pop band formed in Nairobi by vocalists Bien-Aimé Baraza, Willis Chimano and Savara Mudigi in 2005.',
        genre: 'AFRO-POP',
        country: '🇰🇪 Kenya',
        rank: '#10',
        listeners: '2.1M',
        hits: [
            { title: 'Suzanna', album: 'Midnight Train', duration: '3:50', cover: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Best Music Video (Category 8)
    {
        id: 12,
        categoryId: 8,
        name: 'Blaqbonez',
        song: 'LIKE ICE SPICE',
        votes: '7.4k',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        description: 'Creative and visually stunning direction that pushes the boundaries of African music videos.',
        bio: 'Emeka Akumefule, known professionally as Blaqbonez, is a Nigerian rapper signed to Chocolate City.',
        genre: 'HIP-HOP',
        country: '🇳🇬 Nigeria',
        rank: '#15',
        listeners: '1.8M',
        hits: [
            { title: 'Like Ice Spice', album: 'Emeka Must Shine', duration: '2:30', cover: 'https://images.unsplash.com/photo-1520529277867-dbf8c5e0b330?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Producer of the Year (Category 9)
    {
        id: 13,
        categoryId: 9,
        name: 'SarZ',
        song: 'HAPPINESS',
        votes: '11.2k',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop',
        description: 'The architect of modern Afrobeats sound, consistently delivering hits.',
        bio: 'Osabuohien Osaretin, better known by his stage name Sarz, is a Nigerian record producer and musician.',
        genre: 'PRODUCER',
        country: '🇳🇬 Nigeria',
        rank: '#1',
        listeners: '5.4M',
        hits: [
            { title: 'Happiness', album: 'Sarz Alone', duration: '3:00', cover: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Best Collaboration (Category 10)
    {
        id: 14,
        categoryId: 10,
        name: 'Victony & Tempoe',
        song: 'SOWETO',
        votes: '14.5k',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop',
        description: 'A perfect blend of vocals and production that took the world by storm.',
        bio: 'Anthony Victor, professionally known as Victony, is a Nigerian singer, songwriter and rapper.',
        genre: 'AFRO-POP',
        country: '🇳🇬 Nigeria',
        rank: '#9',
        listeners: '6.5M',
        hits: [
            { title: 'Soweto', album: 'Outlaw', duration: '2:28', cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Best Live Performance (Category 11)
    {
        id: 15,
        categoryId: 11,
        name: 'Diamond Platnumz',
        song: 'YATAPITA',
        votes: '18.2k',
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop',
        description: 'Unmatched stage presence and energy from the King of Bongo Flava.',
        bio: 'Nasibu Abdul Juma Issack, popularly known by his stage name Diamond Platnumz, is a Tanzanian bongo flava recording artist.',
        genre: 'BONGO FLAVA',
        country: '🇹🇿 Tanzania',
        rank: '#1',
        listeners: '8.2M',
        hits: [
            { title: 'Yatapita', album: 'Single', duration: '4:15', cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=100&auto=format&fit=crop' }
        ]
    },
    // Best Afrobeat Artist (Category 12)
    {
        id: 16,
        categoryId: 12,
        name: 'Ckay',
        song: 'LOVE NWANTITI',
        votes: '22.1k',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
        description: 'The emo-afrobeats pioneer who took the sound to every corner of the globe.',
        bio: 'Chukwuka Ekweani, better known by his stage name CKay, is a Nigerian singer-songwriter and record producer.',
        genre: 'EMO-AFROBEATS',
        country: '🇳🇬 Nigeria',
        rank: '#5',
        listeners: '22.1M',
        hits: [
            { title: 'Love Nwantiti', album: 'CKay the First', duration: '2:26', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop' }
        ]
    }
];

export const standings = [
    { id: 1, name: 'Burna Boy', votes: '45.2k', rank: 1, trend: 'up', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Wizkid', votes: '42.8k', rank: 2, trend: 'down', image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Davido', votes: '38.5k', rank: 3, trend: 'up', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Tems', votes: '35.1k', rank: 4, trend: 'stable', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
];

export const winners = [
    { id: 1, category: 'Best Newcomer', name: 'Ayra Starr', year: '2023', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, category: 'Song of the Year', name: 'Rema', year: '2023', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop' },
];
