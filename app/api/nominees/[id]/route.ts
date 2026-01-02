import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function formatVotes(votes: number): string {
    if (votes >= 1000000) return `${(votes / 1000000).toFixed(1)}M`;
    if (votes >= 1000) return `${(votes / 1000).toFixed(1)}k`;
    return votes.toString();
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!adminDb) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        const snapshot = await adminDb.ref(`nominees/${id}`).once('value');
        if (!snapshot.exists()) {
            return NextResponse.json({ error: 'Nominee not found' }, { status: 404 });
        }

        const nominee = snapshot.val();

        return NextResponse.json({
            id,
            ...nominee,
            votes_display: formatVotes(nominee.votes || 0)
        });

    } catch (error) {
        console.error('Nominee Detail API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
