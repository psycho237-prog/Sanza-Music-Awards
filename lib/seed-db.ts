import { adminDb } from './firebaseAdmin';
import * as fs from 'fs';
import * as path from 'path';

async function seed() {
    console.log('🚀 Starting improved database seeding...');

    if (!adminDb) {
        console.error('❌ Firebase Admin not initialized. Check your environment variables.');
        process.exit(1);
    }

    try {
        const dbPath = path.join(process.cwd(), 'sanza_db_export.json');

        if (!fs.existsSync(dbPath)) {
            console.error('❌ sanza_db_export.json not found in the root directory.');
            process.exit(1);
        }

        const rawData = fs.readFileSync(dbPath, 'utf8');
        const dbData = JSON.parse(rawData);

        console.log('📁 Importing categories...');
        if (dbData.categories) {
            await adminDb.ref('categories').set(dbData.categories);
            console.log(`✅ ${Object.keys(dbData.categories).length} categories imported.`);
        }

        console.log('🎤 Importing nominees...');
        if (dbData.nominees) {
            await adminDb.ref('nominees').set(dbData.nominees);
            console.log(`✅ ${Object.keys(dbData.nominees).length} nominees imported.`);
        }

        console.log('📊 Initializing stats...');
        if (dbData.stats) {
            await adminDb.ref('stats').set(dbData.stats);
        } else {
            await adminDb.ref('stats').set({
                totalVotes: 0,
                totalRevenue: 0,
                totalTransactions: 0,
                successfulTransactions: 0,
                pendingTransactions: 0,
                failedTransactions: 0,
                successRate: 100
            });
        }
        console.log('✅ Stats initialized.');

        console.log('✨ Data import completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Import failed:', error);
        process.exit(1);
    }
}

seed();
