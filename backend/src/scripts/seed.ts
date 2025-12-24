import { admin, getDb } from '../config/firebase.js';
import { mockData } from '../config/database.js';

async function seed() {
    console.log('🌱 Starting database seeding...');
    const db = getDb();

    if (!db) {
        console.error('❌ Database not initialized. Make sure FIREBASE_SERVICE_ACCOUNT is set.');
        process.exit(1);
    }

    try {
        // 1. Seed Categories
        console.log('📂 Seeding categories...');
        const categoriesRef = db.ref('categories');

        // Convert array to object with IDs as keys for RTDB
        const categoriesObj: any = {};
        mockData.categories.forEach(cat => {
            categoriesObj[cat.id] = {
                title: cat.title,
                nominees_count: cat.nominees_count,
                image_url: cat.image_url,
                featured: cat.featured
            };
        });

        await categoriesRef.set(categoriesObj);
        console.log('✅ Categories seeded successfully');

        // 2. Seed Nominees
        console.log('👤 Seeding nominees...');
        const nomineesRef = db.ref('nominees');

        const nomineesObj: any = {};
        mockData.nominees.forEach(nom => {
            nomineesObj[nom.id] = {
                category_id: nom.category_id,
                name: nom.name,
                song: nom.song,
                votes: nom.votes,
                image_url: nom.image_url,
                tag: nom.tag,
                description: nom.description,
                bio: nom.bio || '',
                genre: nom.genre,
                country: nom.country
            };
        });

        await nomineesRef.set(nomineesObj);
        console.log('✅ Nominees seeded successfully');

        console.log('✨ Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

// Wait for Firebase to initialize
setTimeout(seed, 2000);
