import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config, validateConfig } from './config/env.js';
import categoriesRouter from './routes/categories.js';
import nomineesRouter from './routes/nominees.js';
import votesRouter from './routes/votes.js';
import paymentsRouter from './routes/payments.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';

// Validate config
validateConfig();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: [config.frontendUrl, 'https://singers-*.vercel.app'],
    credentials: true,
}));

// Body parsing
app.use(express.json());

// Rate limiting - 1000+ requests per minute per IP
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // 1000 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' } as any,
});
app.use(limiter);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: config.nodeEnv,
    });
});

// API Routes
app.use('/api/categories', categoriesRouter);
app.use('/api/nominees', nomineesRouter);
app.use('/api/votes', votesRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`🚀 African Singing Awards API running on port ${PORT}`);
    console.log(`📊 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Frontend URL: ${config.frontendUrl}`);
    console.log(`⚡ Rate limit: 1000 requests/minute`);
});

export default app;
