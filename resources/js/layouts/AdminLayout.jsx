import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const sidebarLinks = [
    { to: '/admin', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { to: '/admin/rooms', label: 'Rooms', icon: 'M19 9l-7 7-7-7' },
    { to: '/admin/room-types', label: 'Room Types', icon: 'M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M9 5h6M12 12v5M9 16h6' },
    { to: '/admin/facilities', label: 'Facilities', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.5 5.5L21 10l-5.5 2.5L13 18l-2.5-5.5L5 10l5.5-2.5L13 2z' },
    { to: '/admin/reservations', label: 'Reservations', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { to: '/admin/guests', label: 'Guests', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { to: '/admin/payments', label: 'Payments', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { to: '/admin/checkin', label: 'Check-In', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { to: '/admin/checkout', label: 'Check-Out', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { to: '/admin/reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { to: '/admin/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const isActive = (path) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    const NavIcon = ({ d }) => (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
        </svg>
    );

    return (
        <div className="min-h-screen bg-[#F1F5F9] flex">
            <aside className={`bg-[#0F172A] text-white transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-16'}`}>
                <div className="p-4 flex items-center justify-between h-16">
                    {sidebarOpen && <span className="text-xl font-playfair font-bold text-[#C8A96B]">Hotelify</span>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-white text-xl cursor-pointer p-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7' : 'M13 5l7 7-7 7M5 5l7 7-7 7'} />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 mt-2 px-2 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                                isActive(link.to) ? 'bg-[#C8A96B]/10 text-[#C8A96B]' : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <NavIcon d={link.icon} />
                            {sidebarOpen && <span>{link.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-3 border-t border-white/10">
                    {sidebarOpen && user && (
                        <div className="text-xs text-white/40 px-3 py-2">
                            <span className="capitalize">{user.role}</span>
                        </div>
                    )}
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
                    <h2 className="text-lg font-semibold text-[#1E293B]">Admin Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-sm text-[#64748B] hover:text-[#1E293B] transition-colors">View Site</Link>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="w-8 h-8 rounded-full bg-[#C8A96B]/10 flex items-center justify-center">
                                <span className="text-xs font-semibold text-[#C8A96B]">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-[#1E293B] leading-tight">{user?.name}</p>
                                <p className="text-xs text-[#64748B] capitalize">{user?.role}</p>
                            </div>
                            <button onClick={handleLogout} className="text-sm text-[#EF4444] hover:bg-[#FEF2F2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto">
                    <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        <Outlet />
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
