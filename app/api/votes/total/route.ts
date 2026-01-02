import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function formatVotes(total: number): string {
    if (total >= 1000000) return `${(total / 1000000).toFixed(1)}M+`;
    if (total >= 1000) return `${(total / 1000).toFixed(1)}k+`;
    return total.toString();
}

export async function GET() {
    try {
        if (!adminDb) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        let total = 0;
        const snapshot = await adminDb.ref('nominees').once('value');
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                total += (child.val().votes || 0);
                return false;
            });
        }

        return NextResponse.json({
            total,
            formatted: formatVotes(total)
        });

    } catch (error) {
        console.error('Total Votes API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
