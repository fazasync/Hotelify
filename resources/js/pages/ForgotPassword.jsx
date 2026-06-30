import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Toast from '../components/Toast';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [toast, setToast] = useState({ message: '', type: 'error', isOpen: false });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/forgot-password', { email });
            setSent(true);
        } catch (err) {
            setToast({
                message: err.response?.data?.message || 'Failed to send reset link',
                type: 'error',
                isOpen: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <Toast message={toast.message} type={toast.type} isOpen={toast.isOpen} onClose={() => setToast((p) => ({ ...p, isOpen: false }))} />

            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm"
                >
                    <Link to="/" className="inline-flex items-center gap-2 mb-10">
                        <div className="relative w-8 h-8">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#C8A96B] to-[#a8884f] rotate-45" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[#0F172A] font-bold text-xs">H</span>
                            </div>
                        </div>
                        <span className="text-lg font-playfair font-bold text-[#1E293B]">Hotelify</span>
                    </Link>

                    {sent ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="w-14 h-14 mx-auto bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-7 h-7 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-[#0F172A] text-center">Check Your Email</h1>
                            <p className="text-[#64748B] text-sm mt-2 text-center">
                                We&apos;ve sent a password reset link to <strong className="text-[#1E293B]">{email}</strong>. Please check your inbox and follow the instructions.
                            </p>
                            <div className="mt-6 bg-[#F1F5F9] rounded-xl px-4 py-3 text-sm text-[#64748B]">
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4 shrink-0 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Didn&apos;t receive the email? Check your spam folder or try again.
                                </p>
                            </div>
                            <button onClick={() => setSent(false)}
                                className="w-full mt-4 py-2.5 text-sm text-[#C8A96B] font-medium hover:underline cursor-pointer">
                                Try a different email
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-[#0F172A]">Forgot password?</h1>
                            <p className="text-[#64748B] text-sm mt-1">Enter your email and we&apos;ll send you a reset link.</p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all placeholder:text-[#94A3B8]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] disabled:opacity-50 transition-all cursor-pointer"
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>

                            <p className="text-center text-sm text-[#64748B] mt-6">
                                Remember your password?{' '}
                                <Link to="/login" className="text-[#C8A96B] font-medium hover:underline">Sign in</Link>
                            </p>
                        </>
                    )}
                </motion.div>
            </div>

            <div className="hidden lg:flex flex-1 bg-[#0B1120] items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute w-[400px] h-[400px] bg-[#C8A96B]/5 rounded-full blur-[120px]" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 text-center px-12"
                >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 rotate-45">
                        <span className="-rotate-45 text-2xl text-white/40 font-playfair font-bold">H</span>
                    </div>
                    <h2 className="font-playfair text-3xl font-bold text-white">Luxury Stays,</h2>
                    <h2 className="font-playfair text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96B] to-[#d4b87a]">Exceptional Experiences.</h2>
                    <p className="text-[#64748B] text-sm mt-4 max-w-xs mx-auto">
                        Enter your email to receive a password reset link and regain access to your account.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
