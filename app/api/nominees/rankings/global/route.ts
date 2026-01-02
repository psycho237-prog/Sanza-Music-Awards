import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function formatVotes(votes: number): string {
    if (votes >= 1000000) return `${(votes / 1000000).toFixed(1)}M`;
    if (votes >= 1000) return `${(votes / 1000).toFixed(1)}k`;
    return votes.toString();
}

export async function GET() {
    try {
        if (!adminDb) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        const snapshot = await adminDb.ref('nominees').once('value');
        let nominees: any[] = [];
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                nominees.push({ id: child.key, ...child.val() });
                return false;
            });
        }

        const ranked = nominees
            .sort((a, b) => (b.votes || 0) - (a.votes || 0))
            .map((n, i) => ({
                ...n,
                rank: i + 1,
                votes_display: formatVotes(n.votes || 0)
            }));

        return NextResponse.json(ranked);

    } catch (error) {
        console.error('Global Rankings API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
