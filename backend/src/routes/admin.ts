import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { mockData, Nominee, Transaction } from '../config/database.js';
import { mockTransactions } from './payments.js';
import { getDb } from '../config/firebase.js';

const router = Router();

// All admin routes require authentication
router.use(authMiddleware as any);

// GET /api/admin/stats - Dashboard statistics
router.get('/stats', async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const db = getDb();

        if (!db) {
            // Mock mode
            const totalVotes = mockData.nominees.reduce((sum, n) => sum + n.votes, 0);
            const totalRevenue = mockTransactions
                .filter(t => t.status === 'success')
                .reduce((sum, t) => sum + t.amount, 0);
            const totalTransactions = mockTransactions.length;
            const successfulTransactions = mockTransactions.filter(t => t.status === 'success').length;
            const pendingTransactions = mockTransactions.filter(t => t.status === 'pending').length;
            const failedTransactions = mockTransactions.filter(t => t.status === 'failed').length;

            return res.json({
                totalVotes,
                totalRevenue,
                totalTransactions,
                successfulTransactions,
                pendingTransactions,
                failedTransactions,
                successRate: totalTransactions > 0
                    ? ((successfulTransactions / totalTransactions) * 100).toFixed(1)
                    : 0,
            });
        }

        // Get stats from Firebase RTDB
        const [nomineesSnap, transactionsSnap] = await Promise.all([
            db.ref('nominees').once('value'),
            db.ref('transactions').once('value'),
        ]);

        let totalVotes = 0;
        if (nomineesSnap.exists()) {
            nomineesSnap.forEach(child => {
                totalVotes += (child.val().votes || 0);
                return false;
            });
        }

        let totalRevenue = 0;
        let successfulTransactions = 0;
        let pendingTransactions = 0;
        let failedTransactions = 0;
        let totalTransactions = 0;

        if (transactionsSnap.exists()) {
            transactionsSnap.forEach(child => {
                const tx = child.val();
                totalTransactions++;
                if (tx.status === 'success') {
                    totalRevenue += tx.amount;
                    successfulTransactions++;
                } else if (tx.status === 'pending') {
                    pendingTransactions++;
                } else if (tx.status === 'failed') {
                    failedTransactions++;
                }
                return false;
            });
        }

        res.json({
            totalVotes,
            totalRevenue,
            totalTransactions,
            successfulTransactions,
            pendingTransactions,
            failedTransactions,
            successRate: totalTransactions > 0
                ? ((successfulTransactions / totalTransactions) * 100).toFixed(1)
                : 0,
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/admin/transactions - List all transactions (real-time)
router.get('/transactions', async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { status, limit = 50, offset = 0 } = req.query;
        const db = getDb();

        if (!db) {
            // Mock mode
            let txs = [...mockTransactions];

            if (status) {
                txs = txs.filter(t => t.status === (status as string));
            }

            const paginated = txs.slice(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string));

            return res.json({
                transactions: paginated,
                total: txs.length,
                limit: parseInt(limit as string),
                offset: parseInt(offset as string),
            });
        }

        let txQuery = db.ref('transactions').orderByChild('created_at');
        const snapshot = await txQuery.once('value');

        let txs: any[] = [];
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                const tx = { id: child.key, ...child.val() };
                if (!status || tx.status === status) {
                    txs.push(tx);
                }
                return false;
            });
        }

        // Sort descending (RTDB doesn't do desc easily on server)
        txs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        const paginated = txs.slice(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string));

        res.json({
            transactions: paginated,
            total: txs.length,
            limit: parseInt(limit as string),
            offset: parseInt(offset as string),
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/admin/top-nominees - Top nominees by votes
router.get('/top-nominees', async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { limit = 10 } = req.query;
        const db = getDb();

        if (!db) {
            const sorted = [...mockData.nominees]
                .sort((a, b) => b.votes - a.votes)
                .slice(0, parseInt(limit as string));
            return res.json(sorted);
        }

        const snapshot = await db.ref('nominees').orderByChild('votes').limitToLast(parseInt(limit as string)).once('value');
        let nominees: any[] = [];
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                nominees.push({ id: child.key, ...child.val() });
                return false;
            });
        }

        res.json(nominees.sort((a, b) => b.votes - a.votes));
    } catch (err) {
        next(err);
    }
});

// GET /api/admin/recent-activity - Recent transactions for live feed
router.get('/recent-activity', async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { limit = 20 } = req.query;
        const db = getDb();

        if (!db) {
            const recent = mockTransactions.slice(0, parseInt(limit as string));
            return res.json(recent);
        }

        const snapshot = await db.ref('transactions').orderByChild('created_at').limitToLast(parseInt(limit as string)).once('value');
        let transactions: any[] = [];
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                transactions.push({ id: child.key, ...child.val() });
                return false;
            });
        }

        res.json(transactions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (err) {
        next(err);
    }
});

export default router;
