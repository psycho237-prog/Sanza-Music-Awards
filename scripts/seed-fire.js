
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedDatabase() {
    try {
        console.log('🔥 Initializing Firebase Admin...');

        const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
        let serviceAccount = null;

        if (serviceAccountJson) {
            try {
                serviceAccount = JSON.parse(serviceAccountJson);
            } catch (e) {
                // Construct from individual vars if JSON parse fails
                serviceAccount = {
                    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                };
            }
        } else {
            serviceAccount = {
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            };
        }

        if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
            throw new Error('Missing Firebase credentials in environment variables');
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://sanzamusicaward-default-rtdb.europe-west1.firebasedatabase.app",
        });

        const db = admin.database();
        console.log('✅ Firebase initialized');

        // Read the JSON file
        const dataPath = join(__dirname, '../sanza_db_export.json');
        console.log(`📖 Reading data from ${dataPath}...`);
        const fileContent = await readFile(dataPath, 'utf-8');
        const data = JSON.parse(fileContent);

        console.log('📤 pushing data to Firebase...');

        // Update categories
        if (data.categories) {
            await db.ref('categories').set(data.categories);
            console.log('✅ Categories updated');
        }

        // Update nominees
        if (data.nominees) {
            await db.ref('nominees').set(data.nominees);
            console.log('✅ Nominees updated');
        }

        console.log('🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
