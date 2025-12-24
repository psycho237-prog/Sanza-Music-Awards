import { Router, Request, Response, NextFunction } from 'express';
import { mockData } from '../config/database.js';
import { getDb } from '../config/firebase.js';

const router = Router();

// POST /api/votes - Submit a vote (called after successful payment)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nomineeId, voteCount, transactionId } = req.body;

        if (!nomineeId || !voteCount) {
            return res.status(400).json({
                error: 'Missing required fields: nomineeId, voteCount'
            });
        }

        const db = getDb();

        if (!db) {
            const nominee = mockData.nominees.find(n => n.id === parseInt(nomineeId));
            if (!nominee) return res.status(404).json({ error: 'Nominee not found' });
            nominee.votes += parseInt(voteCount);
            return res.json({ success: true, nomineeId, newVoteCount: nominee.votes, message: `Successfully added ${voteCount} vote(s)` });
        }

        // Atomic update in Firebase
        const nomineeRef = db.ref(`nominees/${nomineeId}`);
        const result = await nomineeRef.child('votes').transaction((current) => (current || 0) + parseInt(voteCount));

        if (transactionId) {
            await db.ref(`transactions/${transactionId}`).update({ status: 'completed' });
        }

        res.json({
            success: true,
            nomineeId,
            newVoteCount: result.snapshot.val(),
            message: `Successfully added ${voteCount} vote(s)`,
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/votes/total - Get total votes across all nominees
router.get('/total', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = getDb();
        if (!db) {
            const total = mockData.nominees.reduce((sum, n) => sum + n.votes, 0);
            return res.json({ total });
        }

        const snapshot = await db.ref('nominees').once('value');
        let total = 0;
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                total += (child.val().votes || 0);
                return false;
            });
        }
        res.json({ total });
    } catch (err) {
        next(err);
    }
});

export default router;
