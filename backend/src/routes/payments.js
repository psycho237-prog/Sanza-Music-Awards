import { Router } from 'express';
import { Payment } from '@hachther/mesomb';
import { mockData } from '../config/database.js'; // Keep for mock data for now
import { getDb } from '../config/firebase.js'; // Use Firebase
import { config } from '../config/env.js';

const router = Router();

// In-memory transactions for mock mode
let mockTransactions = [];

// Price per vote in XAF
const PRICE_PER_VOTE = 105;

// Operator codes for MeSomb
const OPERATOR_CODES = {
    'MOMO': 'MTN',
    'OM': 'ORANGE',
};

// User-friendly error messages for common payment errors
const ERROR_MESSAGES = {
    // Insufficient funds
    'INSUFFICIENT_BALANCE': 'Solde insuffisant. Veuillez recharger votre compte.',
    'INSUFFICIENT_FUNDS': 'Solde insuffisant. Veuillez recharger votre compte.',
    'NOT_ENOUGH_MONEY': 'Solde insuffisant. Veuillez recharger votre compte.',
    'LOW_BALANCE': 'Solde insuffisant. Veuillez recharger votre compte.',
    'LOW_BALANCE_OR_PAYEE_LIMIT_REACHED_OR_NOT_ALLOWED': 'Solde insuffisant ou limite atteinte.',

    // Timeout / User didn't confirm
    'TIMEOUT': 'Délai expiré. Vous n\'avez pas confirmé à temps.',
    'USER_TIMEOUT': 'Délai expiré. Veuillez confirmer plus rapidement.',
    'TRANSACTION_TIMEOUT': 'Transaction expirée. Veuillez réessayer.',
    'PENDING_TIMEOUT': 'Vous n\'avez pas confirmé la transaction à temps.',

    // User cancelled
    'CANCELLED': 'Transaction annulée par l\'utilisateur.',
    'USER_CANCELLED': 'Vous avez annulé la transaction.',
    'CANCELED': 'Transaction annulée.',

    // Invalid phone number
    'INVALID_PHONE': 'Numéro de téléphone invalide.',
    'INVALID_NUMBER': 'Numéro de téléphone invalide.',
    'INVALID_PHONENUMBER': 'Numéro de téléphone invalide.',
    'PHONE_NOT_FOUND': 'Ce numéro n\'est pas enregistré pour Mobile Money.',

    // Account issues
    'ACCOUNT_BLOCKED': 'Votre compte Mobile Money est bloqué.',
    'ACCOUNT_LOCKED': 'Votre compte est temporairement verrouillé.',
    'ACCOUNT_NOT_ACTIVE': 'Votre compte Mobile Money n\'est pas actif.',

    // Network/Operator issues
    'OPERATOR_ERROR': 'Erreur de l\'opérateur. Veuillez réessayer.',
    'NETWORK_ERROR': 'Problème de réseau. Veuillez réessayer.',
    'SERVICE_UNAVAILABLE': 'Service momentanément indisponible.',

    // Transaction limits
    'LIMIT_EXCEEDED': 'Limite de transaction dépassée.',
    'DAILY_LIMIT': 'Limite journalière atteinte.',

    // Generic
    'FAILED': 'Paiement échoué. Veuillez réessayer.',
    'ERROR': 'Une erreur est survenue. Veuillez réessayer.',
    'DECLINED': 'Transaction refusée.',
};

// Function to get user-friendly error message
function getErrorMessage(apiError, apiMessage) {
    // Check if we have a translation for the error code
    const errorCode = (apiError || '').toUpperCase().replace(/[\s-]/g, '_');

    if (ERROR_MESSAGES[errorCode]) {
        return ERROR_MESSAGES[errorCode];
    }

    // Check keywords in the message
    const msg = (apiMessage || apiError || '').toLowerCase();

    if (msg.includes('insuffi') || msg.includes('balance') || msg.includes('solde')) {
        return ERROR_MESSAGES['INSUFFICIENT_BALANCE'];
    }
    if (msg.includes('timeout') || msg.includes('expire') || msg.includes('délai')) {
        return ERROR_MESSAGES['TIMEOUT'];
    }
    if (msg.includes('cancel') || msg.includes('annul')) {
        return ERROR_MESSAGES['CANCELLED'];
    }
    if (msg.includes('invalid') || msg.includes('phone') || msg.includes('number')) {
        return ERROR_MESSAGES['INVALID_PHONE'];
    }
    if (msg.includes('block') || msg.includes('lock')) {
        return ERROR_MESSAGES['ACCOUNT_BLOCKED'];
    }
    if (msg.includes('limit')) {
        return ERROR_MESSAGES['LIMIT_EXCEEDED'];
    }

    // Return the original message if no translation found
    return apiMessage || apiError || 'Paiement échoué. Veuillez réessayer.';
}

// POST /api/payments/initiate - Start a payment with MeSomb
router.post('/initiate', async (req, res, next) => {
    try {
        const { nomineeId, voteCount, phoneNumber, paymentMethod } = req.body;

        // Validation
        if (!nomineeId || !voteCount || !phoneNumber || !paymentMethod) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['nomineeId', 'voteCount', 'phoneNumber', 'paymentMethod'],
            });
        }

        if (!['MOMO', 'OM'].includes(paymentMethod)) {
            return res.status(400).json({
                error: 'Invalid payment method. Use MOMO or OM',
            });
        }

        // Validate phone number (9 digits for Cameroon)
        const cleanPhone = phoneNumber.replace(/\D/g, '');
        if (cleanPhone.length !== 9) {
            return res.status(400).json({
                error: 'Phone number must be 9 digits',
            });
        }

        const amount = parseInt(voteCount) * PRICE_PER_VOTE;
        const paymentRef = `VOTE_${nomineeId}_${Date.now()}`;

        // Find nominee name for transaction record
        const nominee = mockData.nominees.find(n => n.id === parseInt(nomineeId));

        // Create transaction record
        const transaction = {
            id: Date.now(),
            nominee_id: parseInt(nomineeId),
            nominee_name: nominee?.name || 'Unknown',
            votes_count: parseInt(voteCount),
            amount,
            payment_method: paymentMethod,
            phone_number: `+237${cleanPhone}`,
            status: 'pending',
            payment_ref: paymentRef,
            created_at: new Date().toISOString(),
        };

        const db = getDb();
        const { apiKey, appKey } = config.mesomb || {};

        // Check if MeSomb is configured
        if (!apiKey || !appKey) {
            // Mock mode: simulate payment
            console.log(`📱 Mock payment initiated: ${paymentMethod} | ${transaction.phone_number} | ${amount} XAF`);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 95% success rate in mock mode
            const success = Math.random() > 0.05;

            if (success) {
                transaction.status = 'success';
                transaction.external_tx_id = `MOCK_${Date.now()}`;
                mockTransactions.unshift(transaction);

                // Update nominee votes
                if (nominee) {
                    nominee.votes += transaction.votes_count;
                }

                return res.json({
                    success: true,
                    transactionId: transaction.id,
                    message: 'Payment successful! Votes have been added.',
                    transaction,
                });
            } else {
                transaction.status = 'failed';
                transaction.error = 'Payment declined by operator';
                mockTransactions.unshift(transaction);

                return res.status(402).json({
                    success: false,
                    error: 'Payment failed',
                    message: 'Payment was declined. Please try again.',
                    transactionId: transaction.id,
                });
            }
        }

        // Production: Use MeSomb SDK
        console.log(`📱 MeSomb payment: ${paymentMethod} | ${transaction.phone_number} | ${amount} XAF`);

        try {
            const payment = new Payment({
                applicationKey: appKey,
                accessKey: apiKey,
            });

            const collectionResponse = await payment.collect({
                amount: amount,
                service: OPERATOR_CODES[paymentMethod],
                phoneNumber: cleanPhone,
                country: 'CM',
                currency: 'XAF',
                payer: cleanPhone,
                fees: false,
                message: `Voting for ${nominee?.name || 'Nominee'}`,
            });

            console.log('MeSomb response:', collectionResponse);

            if (collectionResponse.isOperationSuccess()) {
                const transactionData = collectionResponse.transaction;

                transaction.status = transactionData.status === 'SUCCESS' ? 'success' : 'pending';
                transaction.external_tx_id = transactionData.pk;
                mockTransactions.unshift(transaction);

                // Save to database if available
                if (db) {
                    await db.ref(`transactions/${transaction.id}`).set(transaction);
                }

                if (transaction.status === 'success') {
                    // Update votes
                    if (nominee) {
                        nominee.votes += transaction.votes_count;
                    }

                    // Update database votes atomically
                    if (db) {
                        await db.ref(`nominees/${transaction.nominee_id}/votes`).transaction((current) => (current || 0) + transaction.votes_count);
                    }
                }

                return res.json({
                    success: true,
                    transactionId: transaction.id,
                    paymentId: transactionData.pk,
                    status: transaction.status,
                    message: transaction.status === 'success'
                        ? 'Payment successful!'
                        : 'Payment initiated. Please confirm on your phone.',
                });
            } else {
                // Operation failed at initiation
                transaction.status = 'failed';
                transaction.error = 'Failed to initiate payment. Please try again.';
                mockTransactions.unshift(transaction);

                return res.status(400).json({
                    success: false,
                    error: transaction.error,
                    transactionId: transaction.id,
                });
            }
        } catch (apiError) {
            console.error('MeSomb API error:', apiError);

            // Handle MeSomb specific error responses
            let userError = 'Payment failed. Please try again.';
            if (apiError.message) {
                userError = getErrorMessage('FAILED', apiError.message);
            }

            transaction.status = 'failed';
            transaction.error = userError;
            mockTransactions.unshift(transaction);

            return res.status(402).json({
                success: false,
                error: userError,
                transactionId: transaction.id,
            });
        }
    } catch (err) {
        next(err);
    }
});

// GET /api/payments/status/:id - Check payment status
router.get('/status/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const db = getDb();

        // Check mock transactions first
        const tx = mockTransactions.find(t => t.id === parseInt(id) || t.payment_ref === id);

        if (tx) {
            // MeSomb is synchronous usually, but if it was pending we might need to check
            // However, MeSomb status check is usually done via a separate request if needed
            // For now, if it's already success/failed we just return it
            return res.json(tx);
        }

        // Check database (Realtime DB)
        if (db) {
            const txRef = db.ref(`transactions/${id}`);
            const snapshot = await txRef.once('value');

            if (snapshot.exists()) {
                const data = snapshot.val();

                // If it's still pending in DB, we could try to verify with MeSomb
                // But for the MVP, the initiation status is usually final for collect
                return res.json(data);
            }

            // Check by payment_ref
            const querySnapshot = await db.ref('transactions')
                .orderByChild('payment_ref')
                .equalTo(id)
                .limitToFirst(1)
                .once('value');

            if (querySnapshot.exists()) {
                const val = Object.values(querySnapshot.val())[0];
                return res.json(val);
            }
        }

        return res.status(404).json({ error: 'Transaction not found' });
    } catch (err) {
        next(err);
    }
});

// Export mock transactions for admin route
export { mockTransactions };
export default router;
