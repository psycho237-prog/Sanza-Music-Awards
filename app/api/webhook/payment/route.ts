import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { processSuccessfulPayment, markTransactionFailed } from '@/lib/voteProcessor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({ status: 'active', message: 'Payment Webhook active' });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { reference, status } = body;

        console.log('[Webhook] Received:', body);

        if (!reference) {
            return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
        }

        if (!adminDb) {
            return NextResponse.json({ message: 'No DB access' });
        }

        // Find transaction
        const snapshot = await adminDb.ref('transactions')
            .orderByChild('mesombReference')
            .equalTo(reference)
            .limitToFirst(1)
            .once('value');

        if (!snapshot.exists()) {
            console.error(`[Webhook] Transaction not found for: ${reference}`);
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }

        const data = snapshot.val();
        const transactionId = Object.keys(data)[0];
        const transaction = data[transactionId];

        if (status === 'SUCCESS') {
            const result = await processSuccessfulPayment({
                id: transactionId,
                nomineeId: transaction.nomineeId,
                voteCount: transaction.voteCount
            }, status);

            if (result.success) {
                return NextResponse.json({ success: true });
            }
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        if (status === 'FAILED' || status === 'CANCELED') {
            await markTransactionFailed(transactionId, `MeSomb: ${status}`, status);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ received: true });

    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
