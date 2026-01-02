import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!adminDb) {
            // Mock stats for demonstration
            return NextResponse.json({
                totalVotes: 12500,
                totalRevenue: 1312500,
                totalTransactions: 450,
                successfulTransactions: 420,
                pendingTransactions: 15,
                failedTransactions: 15,
                successRate: 93
            });
        }

        // In a real app, you would aggregate these from your database
        // For now, returning a summary object
        const snapshot = await adminDb.ref('stats').once('value');
        const stats = snapshot.val() || {
            totalVotes: 0,
            totalRevenue: 0,
            totalTransactions: 0,
            successfulTransactions: 0,
            pendingTransactions: 0,
            failedTransactions: 0,
            successRate: 0
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
