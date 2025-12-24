import admin from 'firebase-admin';
import { config } from './env.js';

let db = null;

try {
    // Check if service account is provided via environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        let serviceAccount;
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        } catch (e) {
            console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable');
        }

        if (serviceAccount) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://studio-3pdzg-default-rtdb.firebaseio.com" // From user config
            });
            db = admin.database(); // Use Realtime Database
            console.log('🔥 Firebase Realtime Database initialized successfully');
        }
    } else {
        console.warn('⚠️ No FIREBASE_SERVICE_ACCOUNT found. Using mock data mode.');
    }
} catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
}

export const getDb = () => db;
export { admin };
