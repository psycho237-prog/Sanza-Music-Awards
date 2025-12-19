import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Minus, Plus, Lock, Smartphone, CreditCard, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import { useVotes } from '../context/VoteContext';

const VoteModal = ({ isOpen, onClose, nominee }) => {
    const [voteCount, setVoteCount] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('MOMO'); // 'MOMO' or 'OM'
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { incrementVote } = useVotes();

    // Payment API Configuration (Future Integration)
    const PAYMENT_CONFIG = {
        MTN_MOMO: {
            apiKey: '', // Add MTN API Key here
            merchantId: '',
            environment: 'sandbox' // or 'production'
        },
        ORANGE_MONEY: {
            apiKey: '', // Add Orange Money API Key here
            merchantId: '',
            environment: 'sandbox'
        }
    };

    const pricePerVote = 105;
    const totalPrice = voteCount * pricePerVote;

    const handleVoteChange = (delta) => {
        setVoteCount(prev => {
            const count = typeof prev === 'string' ? 1 : prev;
            return Math.max(1, count + delta);
        });
    };

    const handleShare = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('nomineeId', nominee.id);
        navigator.clipboard.writeText(url.toString());
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };


    const handleClose = () => {
        setVoteCount(1);
        setPhoneNumber('');
        setIsLoading(false);
        onClose();
    };

    const processPayment = async (method, phone, amount) => {
        setIsLoading(true);
        console.log(`Processing ${method} payment for ${phone} - Amount: ${amount} XAF`);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (method === 'MOMO') {
                // TODO: Integrate MTN Mobile Money CM API
                // Example: const response = await mtnApi.requestToPay({ phone, amount, ...PAYMENT_CONFIG.MTN_MOMO });
                console.log('MTN MOMO API Call placeholder');
            } else if (method === 'OM') {
                // TODO: Integrate Orange Money CM API
                // Example: const response = await orangeApi.payment({ phone, amount, ...PAYMENT_CONFIG.ORANGE_MONEY });
                console.log('Orange Money API Call placeholder');
            }

            return { success: true };
        } catch (error) {
            console.error('Payment failed:', error);
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !nominee) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 max-h-[90vh] overflow-y-auto scrollbar-hide"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 z-30 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            {/* Nominee Info */}
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="relative w-24 h-24 mb-4">
                                    <img
                                        src={nominee.image}
                                        alt={nominee.name}
                                        className="w-full h-full object-cover rounded-2xl shadow-xl"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold mb-1">{nominee.name}</h3>
                                <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">Best Male Vocalist</p>

                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="gap-2 rounded-full text-[10px] font-bold bg-white/5 hover:bg-white/10 text-gray-400 border-none px-4"
                                    onClick={handleShare}
                                >
                                    {isCopied ? (
                                        <>
                                            <Check size={12} /> Link Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Share2 size={12} /> Share profile
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Vote Counter */}
                            <div className="bg-white/5 rounded-3xl p-6 mb-6 border border-white/5">
                                <p className="text-center text-gray-500 text-[10px] mb-4 uppercase tracking-widest font-bold">Number of Votes</p>
                                <div className="flex items-center justify-center gap-8">
                                    <button
                                        onClick={() => handleVoteChange(-1)}
                                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={voteCount}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (!isNaN(val) && val >= 1) {
                                                setVoteCount(val);
                                            } else if (e.target.value === '') {
                                                setVoteCount('');
                                            }
                                        }}
                                        onBlur={() => {
                                            if (voteCount === '' || voteCount < 1) {
                                                setVoteCount(1);
                                            }
                                        }}
                                        className="bg-transparent text-4xl font-bold text-center w-24 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        onClick={() => handleVoteChange(1)}
                                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="space-y-4 mb-8">
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">Payment Method</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setPaymentMethod('MOMO')}
                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'MOMO'
                                            ? 'border-secondary bg-secondary/10'
                                            : 'border-white/5 bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <Smartphone size={20} className={paymentMethod === 'MOMO' ? 'text-secondary' : 'text-gray-400'} />
                                        <span translate="no" className="text-[10px] font-bold uppercase">Mobile Money</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('OM')}
                                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'OM'
                                            ? 'border-secondary bg-secondary/10'
                                            : 'border-white/5 bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <CreditCard size={20} className={paymentMethod === 'OM' ? 'text-secondary' : 'text-gray-400'} />
                                        <span translate="no" className="text-[10px] font-bold uppercase">Orange Money</span>
                                    </button>
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div className="mb-8">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">+237</span>
                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        maxLength={9}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            if (val.length <= 9) {
                                                setPhoneNumber(val);
                                            }
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-4 focus:outline-none focus:border-secondary transition-colors font-bold text-sm"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                className="w-full py-4 text-sm font-bold rounded-2xl shadow-lg shadow-secondary/20 mb-4 flex items-center justify-center gap-2"
                                disabled={isLoading || phoneNumber.length < 9}
                                onClick={async () => {
                                    const result = await processPayment(paymentMethod, phoneNumber, totalPrice);
                                    if (result.success) {
                                        incrementVote(nominee.id, voteCount);
                                        handleClose();
                                        navigate('/vote-success');
                                    } else {
                                        alert('Payment failed. Please try again.');
                                    }
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        PROCESSING...
                                    </>
                                ) : (
                                    `VOTE NOW • ${totalPrice} XAF`
                                )}
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                <Lock size={12} /> Secure Payment
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VoteModal;
