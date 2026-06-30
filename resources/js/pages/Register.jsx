import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRegister } from '../hooks/useAuth';
import Toast from '../components/Toast';

export default function Register() {
    const navigate = useNavigate();
    const register = useRegister();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '';
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ message: '', type: 'error', isOpen: false });
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', phone: '', address: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register.mutateAsync(form);
            if (redirect) {
                navigate(`/login?redirect=${encodeURIComponent(redirect)}`);
            } else {
                navigate('/login');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed';
            setError(msg);
            setToast({ message: msg, type: 'error', isOpen: true });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#FAF8F5] to-white pt-24 pb-16">
            <Toast message={toast.message} type={toast.type} isOpen={toast.isOpen} onClose={() => setToast((p) => ({ ...p, isOpen: false }))} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="text-3xl font-playfair font-bold text-[#C8A96B]">Hotelify</Link>
                    <h1 className="text-2xl font-bold text-[#0F172A] mt-6">Create Account</h1>
                    <p className="text-[#64748B] mt-2">Join Hotelify for exclusive benefits</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[24px] shadow-lg border border-gray-100 space-y-5">
                    {error && (
                        <div className="p-4 rounded-[12px] bg-[#EF4444]/10 text-[#EF4444] text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Full Name</label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Phone</label>
                        <input
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            placeholder="+62 812-3456-7890"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Address</label>
                        <textarea
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all resize-none"
                            placeholder="Your address"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Password</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            minLength={8}
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            placeholder="Min. 8 characters"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={form.password_confirmation}
                            onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            placeholder="Repeat password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={register.isPending}
                        className="w-full py-3 bg-gradient-to-r from-[#C8A96B] to-[#b8954f] text-white rounded-[14px] font-medium hover:from-[#b8954f] hover:to-[#a8884f] transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {register.isPending ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <p className="text-center text-sm text-[#64748B]">
                        Already have an account?{' '}
                        <Link to={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'} className="text-[#C8A96B] font-medium hover:underline">Sign In</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
