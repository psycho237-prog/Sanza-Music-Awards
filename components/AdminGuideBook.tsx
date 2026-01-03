"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, CreditCard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

interface AdminGuideBookProps {
    isOpen: boolean;
    onClose: () => void;
}

const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'statuses', label: 'Statuses', icon: Clock },
    { id: 'errors', label: 'Errors', icon: AlertTriangle },
];

const AdminGuideBook = ({ isOpen, onClose }: AdminGuideBookProps) => {
    const [activeTab, setActiveTab] = useState('overview');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[80vh] md:h-[600px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>

                    {/* Sidebar / Tabs */}
                    <div className="md:w-64 bg-white/5 border-r border-white/5 p-6 flex flex-col gap-2">
                        <h2 className="text-xl font-black text-white mb-6 tracking-wide flex items-center gap-2">
                            <Book className="text-[#FDB931]" />
                            ADMIN<span className="text-[#FDB931]">GUIDE</span>
                        </h2>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-[#FDB931] text-black shadow-[0_0_20px_rgba(253,185,49,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}

                        <div className="mt-auto pt-6 border-t border-white/10">
                            <p className="text-[10px] text-gray-500 text-center">
                                Sanza Music Awards <br /> Admin System v2.0
                            </p>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-4">Dashboard Overview</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Welcome to the command center of the Sanza Music Awards. This dashboard provides real-time insights into voting activity, revenue, and nominee performance.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <h4 className="font-bold text-[#FDB931] mb-2 flex items-center gap-2">
                                            <CheckCircle size={16} /> Data Synchronization
                                        </h4>
                                        <p className="text-xs text-gray-400">
                                            All data flows instantly from the Firebase Realtime Database. Any vote cast by a user is immediately reflected here.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <h4 className="font-bold text-[#FDB931] mb-2 flex items-center gap-2">
                                            <CheckCircle size={16} /> Live Transactions
                                        </h4>
                                        <p className="text-xs text-gray-400">
                                            Monitor payments as they happen. The transaction feed updates automatically without needing to refresh the page.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'payments' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-4">Payment Workflows</h3>
                                <p className="text-gray-300">
                                    The system integrates with <strong className="text-white">MeSomb</strong> to handle Mobile Money and Orange Money transactions securely.
                                </p>

                                <div className="space-y-4 mt-4">
                                    <div className="flex gap-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <span className="font-bold text-blue-400">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-blue-400">Initiation</h4>
                                            <p className="text-sm text-gray-400 mt-1">
                                                User selects a nominee and a vote pack, enters their phone number, and confirms. The system sends a request to MeSomb.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                            <span className="font-bold text-purple-400">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-purple-400">User Confirmation</h4>
                                            <p className="text-sm text-gray-400 mt-1">
                                                MeSomb prompts the user on their phone (USSD push) to enter their PIN code.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <span className="font-bold text-green-400">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-green-400">Verification</h4>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Our backend verifies the payment status. If successful, votes are incremented and recorded in the database.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'statuses' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-4">Transaction Statuses</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                                            <span className="font-bold text-yellow-500">PENDING</span>
                                        </div>
                                        <p className="text-sm text-gray-400 text-right">
                                            Payment initiated. Waiting for user to enter PIN. <br />
                                            <span className="text-xs opacity-50">System polls for status.</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <span className="font-bold text-green-500">SUCCESS</span>
                                        </div>
                                        <p className="text-sm text-gray-400 text-right">
                                            Payment confirmed. Votes added. <br />
                                            <span className="text-xs opacity-50">Revenue updated.</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <span className="font-bold text-red-500">FAILED</span>
                                        </div>
                                        <p className="text-sm text-gray-400 text-right">
                                            Declined, insufficient funds, or timeout. <br />
                                            <span className="text-xs opacity-50">No votes added.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'errors' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-4">Common Errors & Solutions</h3>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                        <h4 className="font-bold text-white mb-1">Timeouts</h4>
                                        <p className="text-sm text-gray-400">
                                            If a user takes too long to enter their PIN (usually &gt; 2 mins), the transaction may timeout.
                                            <br /><strong className="text-red-400">Solution:</strong> Ask the user to retry and be ready to approve the prompt.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                        <h4 className="font-bold text-white mb-1">Insufficient Funds</h4>
                                        <p className="text-sm text-gray-400">
                                            The user's mobile money account balance is too low.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                        <h4 className="font-bold text-white mb-1">Network/API Errors</h4>
                                        <p className="text-sm text-gray-400">
                                            Occasional connectivity issues with the MeSomb gateway. The system auto-retries, but persistent failures may require developer attention.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdminGuideBook;
