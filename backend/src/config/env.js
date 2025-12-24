import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',

    // Supabase
    supabase: {
        url: process.env.SUPABASE_URL,
        anonKey: process.env.SUPABASE_ANON_KEY,
        serviceKey: process.env.SUPABASE_SERVICE_KEY,
    },

    // JWT
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
        expiresIn: '24h',
    },

    // Admin
    admin: {
        email: process.env.ADMIN_EMAIL || 'admin@africansingawards.com',
        passwordHash: process.env.ADMIN_PASSWORD_HASH,
    },

    // Monetbil Payment
    monetbil: {
        serviceKey: process.env.MONETBIL_SERVICE_KEY || 'Ri1F3N4mHaser83s9FGUuQICP3IN12zh',
    },

    // MeSomb Payment
    mesomb: {
        apiKey: process.env.MESOMB_API_KEY,
        appKey: process.env.MESOMB_APP_KEY,
    },

    // CORS
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// Validate required config in production
export function validateConfig() {
    const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'JWT_SECRET'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0 && config.nodeEnv === 'production') {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    return true;
}
