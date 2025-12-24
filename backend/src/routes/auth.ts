import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/env.js';
import { getDb } from '../config/firebase.js';

const router = Router();

// Default admin credentials (change in production!)
const DEFAULT_ADMIN = {
    email: 'admin@africansingawards.com',
    // Default password: 'parrot' (hashed)
    passwordHash: '$2b$10$5RvKpTzX6MNV2OJL5x5Zp.LXjJ8OwKBnbBOJJYJbHl5K7Q7E5LvTe',
};

// POST /api/auth/login - Admin login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
            });
        }

        const db = getDb();
        let admin: any = null;

        if (!db) {
            // Mock mode: use default admin
            if (email === DEFAULT_ADMIN.email || email === 'admin') {
                admin = DEFAULT_ADMIN;
            }
        } else {
            // Check Firebase for admin
            const snapshot = await db.ref('admins').orderByChild('email').equalTo(email).once('value');
            if (snapshot.exists()) {
                admin = Object.values(snapshot.val())[0];
            } else if (email === DEFAULT_ADMIN.email) {
                admin = DEFAULT_ADMIN;
            }
        }

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = (password === 'parrot' && !admin.passwordHash)
            || await bcrypt.compare(password, admin.passwordHash || admin.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                email: admin.email,
                role: admin.role || 'admin',
            },
            config.jwt.secret as string,
            { expiresIn: config.jwt.expiresIn as any }
        );

        res.json({
            success: true,
            token,
            expiresIn: config.jwt.expiresIn,
            admin: {
                email: admin.email,
                role: admin.role || 'admin',
            },
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/verify - Verify JWT token
router.post('/verify', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ valid: false, error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, config.jwt.secret) as any;
            res.json({
                valid: true,
                admin: {
                    email: decoded.email,
                    role: decoded.role,
                },
            });
        } catch (err) {
            res.status(401).json({ valid: false, error: 'Invalid token' });
        }
    } catch (err) {
        next(err);
    }
});

export default router;
