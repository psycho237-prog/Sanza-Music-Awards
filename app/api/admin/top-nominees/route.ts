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

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!adminDb) {
            // Mock top nominees
            return NextResponse.json([
                { id: '1', name: 'Charlotte Dipanda', votes: 1250, votes_display: '1.3k' },
                { id: '2', name: 'Fally Ipupa', votes: 1100, votes_display: '1.1k' },
                { id: '3', name: 'Locko', votes: 950, votes_display: '950' }
            ]);
        }

        const snapshot = await adminDb.ref('nominees')
            .orderByChild('votes')
            .limitToLast(limit)
            .once('value');

        const nominees: any[] = [];
        snapshot.forEach(child => {
            const data = child.val();
            nominees.unshift({
                id: child.key,
                name: data.name,
                votes: data.votes,
                votes_display: data.votes >= 1000 ? `${(data.votes / 1000).toFixed(1)}k` : data.votes.toString()
            });
            return false;
        });

        return NextResponse.json(nominees);
    } catch (error) {
        console.error('Admin top nominees error:', error);
        return NextResponse.json({ error: 'Failed to fetch top nominees' }, { status: 500 });
    }
}
