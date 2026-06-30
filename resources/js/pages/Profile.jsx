import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../services/api';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Profile() {
    const [toast, setToast] = useState({ message: '', type: 'error', isOpen: false });

    const { data: user, isLoading, refetch } = useQuery({
        queryKey: ['auth-me'],
        queryFn: () => api.get('/auth/me').then((r) => r.data.data),
    });

    const [profile, setProfile] = useState({ name: '', phone: '', address: '' });
    const [password, setPassword] = useState({ current_password: '', new_password: '', new_password_confirmation: '' });

    useEffect(() => {
        if (user) {
            setProfile({ name: user.name || '', phone: user.phone || '', address: user.address || '' });
        }
    }, [user]);

    const updateProfile = useMutation({
        mutationFn: (data) => api.post('/auth/update-profile', data).then((r) => r.data),
        onSuccess: (res) => {
            refetch();
            setSuccessMsg('Profile updated successfully');
            setToast({ message: 'Profile updated successfully', type: 'success', isOpen: true });
        },
        onError: (err) => {
            setToast({ message: err.response?.data?.message || 'Failed to update profile', type: 'error', isOpen: true });
        },
    });

    const updatePassword = useMutation({
        mutationFn: (data) => api.post('/auth/update-password', data).then((r) => r.data),
        onSuccess: () => {
            setPassword({ current_password: '', new_password: '', new_password_confirmation: '' });
            setToast({ message: 'Password updated successfully', type: 'success', isOpen: true });
        },
        onError: (err) => {
            setToast({ message: err.response?.data?.message || 'Failed to update password', type: 'error', isOpen: true });
        },
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        updateProfile.mutate(profile);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        updatePassword.mutate({
            current_password: password.current_password,
            new_password: password.new_password,
            new_password_confirmation: password.new_password_confirmation,
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16 flex items-center justify-center">
                <LoadingSpinner text="Loading profile..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
            <Toast message={toast.message} type={toast.type} isOpen={toast.isOpen} onClose={() => setToast((p) => ({ ...p, isOpen: false }))} />
            <div className="max-w-2xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-playfair font-bold text-[#0F172A]">My Profile</h1>
                    <p className="text-[#64748B] mt-1">Manage your account information and password</p>

                    <div className="mt-8 bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
                        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-[#C8A96B]/10 flex items-center justify-center">
                                <span className="text-2xl font-semibold text-[#C8A96B]">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-[#1E293B]">{user?.name}</h2>
                                <p className="text-sm text-[#64748B]">{user?.email}</p>
                            </div>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="mt-6 space-y-5">
                            <h3 className="text-base font-semibold text-[#1E293B]">Personal Information</h3>

                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Full Name</label>
                                <input value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Email</label>
                                <input value={user?.email || ''} readOnly
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-[#64748B] cursor-not-allowed" />
                                <p className="text-xs text-[#94A3B8] mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Phone</label>
                                <input value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    placeholder="+62 812-3456-7890"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Address</label>
                                <textarea value={profile.address}
                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all resize-none" />
                            </div>

                            <button type="submit" disabled={updateProfile.isPending}
                                className="w-full py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] disabled:opacity-50 transition-all cursor-pointer">
                                {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>

                    <div className="mt-6 bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
                        <form onSubmit={handlePasswordSubmit} className="space-y-5">
                            <h3 className="text-base font-semibold text-[#1E293B]">Change Password</h3>

                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Current Password</label>
                                <input type="password" value={password.current_password}
                                    onChange={(e) => setPassword({ ...password, current_password: e.target.value })}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">New Password</label>
                                <input type="password" value={password.new_password}
                                    onChange={(e) => setPassword({ ...password, new_password: e.target.value })}
                                    required minLength={8}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1.5">Confirm New Password</label>
                                <input type="password" value={password.new_password_confirmation}
                                    onChange={(e) => setPassword({ ...password, new_password_confirmation: e.target.value })}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all" />
                            </div>

                            <button type="submit" disabled={updatePassword.isPending}
                                className="w-full py-2.5 bg-[#0F172A] text-white text-sm font-semibold rounded-xl hover:bg-[#1e293b] disabled:opacity-50 transition-all cursor-pointer">
                                {updatePassword.isPending ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
