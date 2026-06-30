import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState({ message: '', type: 'error', isOpen: false });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(email, password);
            const role = res.data.user.role;
            if (redirect) {
                navigate(redirect);
            } else if (role === 'guest') {
                navigate('/');
            } else {
                navigate('/admin');
            }
        } catch (err) {
            setToast({
                message: err.response?.data?.message || 'Akun tidak ditemukan. Periksa email dan password Anda.',
                type: 'error',
                isOpen: true,
            });
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

                    <h1 className="text-2xl font-bold text-[#0F172A]">Welcome back</h1>
                    <p className="text-[#64748B] text-sm mt-1">Sign in to your account</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Username"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all placeholder:text-[#94A3B8]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all placeholder:text-[#94A3B8]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] transition-all cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/forgot-password" className="text-sm text-[#C8A96B] font-medium hover:underline">Forgot password?</Link>
                    </div>

                    {redirect && (
                        <p className="text-center text-sm text-[#C8A96B] mt-4 bg-[#C8A96B]/5 rounded-xl py-2 px-4">
                            Silakan login terlebih dahulu untuk melanjutkan reservasi.
                        </p>
                    )}

                    <p className="text-center text-sm text-[#64748B] mt-6">
                        Don&apos;t have an account?{' '}
                        <Link to={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register'} className="text-[#C8A96B] font-medium hover:underline">Sign up</Link>
                    </p>
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
                        Sign in to manage your bookings, access exclusive offers, and more.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
