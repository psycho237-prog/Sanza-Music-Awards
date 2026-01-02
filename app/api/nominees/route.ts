import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { calculatePercentages } from '@/lib/percentageCalculator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function formatVotes(votes: number): string {
    if (votes >= 1000000) return `${(votes / 1000000).toFixed(1)}M`;
    if (votes >= 1000) return `${(votes / 1000).toFixed(1)}k`;
    return votes.toString();
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('categoryId');

        if (!adminDb) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        const snapshot = await adminDb.ref('nominees').once('value');
        let nominees: any[] = [];
        if (snapshot.exists()) {
            snapshot.forEach((child: any) => {
                nominees.push({ id: child.key, ...child.val() });
                return false;
            });
        }

        if (categoryId) {
            nominees = nominees.filter((n: any) => String(n.category_id) === categoryId);
        }

        const enrichedNominees = calculatePercentages(nominees);

        return NextResponse.json(enrichedNominees.map((n: any) => ({
            ...n,
            votes_display: formatVotes(n.votes || 0)
        })).sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0)));

    } catch (error) {
        console.error('Nominees API error:', error);
        return NextResponse.json({ error: 'Failed to fetch nominees' }, { status: 500 });
    }
}
