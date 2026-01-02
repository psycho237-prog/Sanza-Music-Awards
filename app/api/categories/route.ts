import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (!adminDb) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        const snapshot = await adminDb.ref('categories').once('value');
        const categories: any[] = [];

        if (snapshot.exists()) {
            snapshot.forEach(child => {
                categories.push({ id: child.key, ...child.val() });
                return false;
            });
        }

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Categories API error:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
