import { Router } from 'express';
import { mockData } from '../config/database.js'; // Keep for mock data for now
import { getDb } from '../config/firebase.js'; // Use Firebase
import { config } from '../config/env.js';

const router = Router();

// Monetbil API Configuration
const MONETBIL_API_URL = 'https://api.monetbil.com/payment/v1/placePayment';
const MONETBIL_CHECK_URL = 'https://api.monetbil.com/payment/v1/checkPayment';

// In-memory transactions for mock mode
let mockTransactions = [];

// Price per vote in XAF
const PRICE_PER_VOTE = 105;

// Operator codes for Monetbil
const OPERATOR_CODES = {
    'MOMO': 'CM_MTNMOBILEMONEY',  // MTN Mobile Money Cameroon
    'OM': 'CM_ORANGEMONEY',       // Orange Money Cameroon
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

// POST /api/payments/initiate - Start a payment with Monetbil
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
        const serviceKey = config.monetbil?.serviceKey;

        // Check if Monetbil is configured
        if (!serviceKey) {
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

        // Production: Use Monetbil API
        console.log(`📱 Monetbil payment: ${paymentMethod} | ${transaction.phone_number} | ${amount} XAF`);

        const monetbilPayload = {
            service: serviceKey,
            phonenumber: `237${cleanPhone}`,
            amount: amount,
            country: 'CM',
            currency: 'XAF',
            operator: OPERATOR_CODES[paymentMethod],
            payment_ref: paymentRef,
            item_ref: `nominee_${nomineeId}`,
            notify_url: `${config.frontendUrl}/api/payments/callback`,
        };

        try {
            const response = await fetch(MONETBIL_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(monetbilPayload),
            });

            const result = await response.json();
            console.log('Monetbil response:', result);

            if (result.success === '1' || result.status === 'REQUEST_ACCEPTED') {
                transaction.status = 'pending';
                transaction.external_tx_id = result.paymentId || result.payment_id;
                mockTransactions.unshift(transaction);

                // Save to database if available
                if (db) {
                    // Realtime Database: Use transaction ID as key
                    await db.ref(`transactions/${transaction.id}`).set(transaction);
                }

                return res.json({
                    success: true,
                    transactionId: transaction.id,
                    paymentId: result.paymentId,
                    status: 'pending',
                    message: 'Payment initiated. Please confirm on your phone.',
                });
            } else {
                const userError = getErrorMessage(result.status, result.message);
                transaction.status = 'failed';
                transaction.error = userError;
                mockTransactions.unshift(transaction);

                return res.status(402).json({
                    success: false,
                    error: userError,
                    transactionId: transaction.id,
                });
            }
        } catch (apiError) {
            console.error('Monetbil API error:', apiError);
            const userError = getErrorMessage('NETWORK_ERROR', apiError.message);
            transaction.status = 'failed';
            transaction.error = userError;
            mockTransactions.unshift(transaction);

            return res.status(500).json({
                success: false,
                error: userError,
            });
        }
    } catch (err) {
        next(err);
    }
});

// POST /api/payments/callback - Monetbil webhook callback
router.post('/callback', async (req, res, next) => {
    try {
        const {
            payment_ref,
            status,
            transaction_id,
            phone,
            amount,
            message
        } = req.body;

        console.log(`📞 Monetbil callback: ${payment_ref} | Status: ${status}`);

        const db = getDb();

        // Find transaction by payment_ref
        const tx = mockTransactions.find(t => t.payment_ref === payment_ref);

        if (tx) {
            const newStatus = status === '1' ? 'success' : 'failed';
            tx.status = newStatus;
            tx.external_tx_id = transaction_id;

            // If successful, add votes
            if (newStatus === 'success' && tx.status !== 'success') {
                const nominee = mockData.nominees.find(n => n.id === tx.nominee_id);
                if (nominee) {
                    nominee.votes += tx.votes_count;
                }
            }

            // Update database if available
            if (db) {
                // RTDB needs to query by child property
                const transactionsRef = db.ref('transactions');
                const snapshot = await transactionsRef.orderByChild('payment_ref').equalTo(payment_ref).once('value');

                if (snapshot.exists()) {
                    const updates = {};
                    snapshot.forEach((childSnapshot) => {
                        updates[`${childSnapshot.key}/status`] = newStatus;
                        updates[`${childSnapshot.key}/external_tx_id`] = transaction_id;
                    });

                    await transactionsRef.update(updates);

                    // Increment votes atomically
                    if (newStatus === 'success') {
                        const nomineeRef = db.ref(`nominees/${tx.nominee_id}`);
                        // Use transaction for atomic increment
                        await nomineeRef.child('votes').transaction((currentVotes) => {
                            return (currentVotes || 0) + tx.votes_count;
                        });
                    }
                }
            }
        }

        // Monetbil expects a simple OK response
        res.json({ received: true, status: tx?.status });
    } catch (err) {
        console.error('Callback error:', err);
        res.json({ received: true, error: err.message });
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
            // If pending and we have Monetbil configured, check with their API
            if (tx.status === 'pending' && config.monetbil?.serviceKey && tx.external_tx_id) {
                try {
                    const checkResponse = await fetch(MONETBIL_CHECK_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            paymentId: tx.external_tx_id,
                            service: config.monetbil.serviceKey,
                        }),
                    });
                    const checkResult = await checkResponse.json();

                    console.log('Monetbil Check Raw:', JSON.stringify(checkResult));

                    if (['1', 'SUCCESS', '200', '201'].includes(checkResult.status?.toString())) {
                        tx.status = 'success';
                        // Update votes
                        const nominee = mockData.nominees.find(n => n.id === tx.nominee_id);
                        if (nominee) {
                            nominee.votes += tx.votes_count;
                        }
                    } else if (
                        ['-1', '0', 'FAILED', 'CANCELLED'].includes(checkResult.status?.toString()) ||
                        checkResult.error_msg ||
                        (checkResult.message && !['1', 'SUCCESS'].includes(checkResult.status))
                    ) {
                        // Check multiple fields for the error message
                        const rawError = checkResult.error_msg || checkResult.message || checkResult.description || 'Transaction failed';

                        tx.status = 'failed';
                        tx.error = getErrorMessage('FAILED', rawError);
                    }
                } catch (e) {
                    console.error('Status check error:', e);
                }
            }

            return res.json(tx);
        }

        // Check database (Realtime DB)
        if (db) {
            // Check by ID directly
            const txRef = db.ref(`transactions/${id}`);
            const snapshot = await txRef.once('value');

            if (snapshot.exists()) {
                return res.json(snapshot.val());
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
