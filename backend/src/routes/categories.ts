import { Router, Request, Response, NextFunction } from 'express';
import { mockData } from '../config/database.js';
import { getDb } from '../config/firebase.js';

const router = Router();

// GET /api/categories - List all categories
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = getDb();
        if (!db) {
            return res.json(mockData.categories);
        }

        const snapshot = await db.ref('categories').once('value');
        if (!snapshot.exists()) {
            return res.json(mockData.categories);
        }

        const categories: any[] = [];
        snapshot.forEach(child => {
            categories.push({ id: child.key, ...child.val() });
            return false; // Type requirement for RTDB forEach
        });

        res.json(categories);
    } catch (err) {
        next(err);
    }
});

// GET /api/categories/:id - Get single category
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const db = getDb();
        if (!db) {
            const category = mockData.categories.find(c => c.id === parseInt(id));
            if (!category) return res.status(404).json({ error: 'Category not found' });
            return res.json(category);
        }

        const snapshot = await db.ref(`categories/${id}`).once('value');
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json({ id, ...snapshot.val() });
    } catch (err) {
        next(err);
    }
});

export default router;
