import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/rooms', label: 'Rooms & Suites' },
    { to: '/reserve', label: 'Reserve' },
    { to: '/facilities', label: 'Facilities' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location]);

    const isStaff = user && ['admin', 'receptionist', 'manager', 'owner'].includes(user.role);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
                    scrolled
                        ? 'bg-[#0F172A]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]'
                        : 'bg-gradient-to-b from-black/40 to-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative w-9 h-9">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#C8A96B] to-[#a8884f] rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[#0F172A] font-bold text-sm">H</span>
                            </div>
                        </div>
                        <span className="text-xl font-playfair font-bold text-white tracking-wide">
                            Hotelify
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                                    location.pathname === link.to
                                        ? 'text-[#C8A96B] bg-white/5'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <div className="relative">
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition-all cursor-pointer">
                                    <div className="w-7 h-7 rounded-full bg-[#C8A96B]/20 flex items-center justify-center">
                                        <span className="text-xs font-semibold text-[#C8A96B]">{user.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">{user.name}</span>
                                    <svg className={`w-4 h-4 text-white/60 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-[#1E293B]">{user.name}</p>
                                                <p className="text-xs text-[#64748B] capitalize">{user.role}</p>
                                            </div>
                                            {isStaff && (
                                                <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1E293B] hover:bg-[#F1F5F9] transition-colors">
                                                    <svg className="w-4 h-4 text-[#C8A96B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                    </svg>
                                                    Dashboard
                                                </Link>
                                            )}
                                            <Link to="/my-reservations" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1E293B] hover:bg-[#F1F5F9] transition-colors">
                                                <svg className="w-4 h-4 text-[#C8A96B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                My Reservations
                                            </Link>
                                            <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1E293B] hover:bg-[#F1F5F9] transition-colors">
                                                <svg className="w-4 h-4 text-[#C8A96B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Profile
                                            </Link>
                                            <button onClick={() => { setUserMenuOpen(false); logout(); }}
                                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors cursor-pointer">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 text-sm font-medium text-[#0F172A] bg-[#C8A96B] rounded-xl hover:bg-[#b8954f] transition-all shadow-lg shadow-[#C8A96B]/25"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/reserve"
                                    className="px-5 py-2 text-sm font-medium text-white border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all"
                                >
                                    Book Now
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="lg:hidden relative z-50 w-8 h-8 flex items-center justify-center cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="w-5 h-4 relative">
                            <span className={`absolute left-0 top-0 w-full h-[2px] bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 top-[7px]' : ''}`} />
                            <span className={`absolute left-0 top-[7px] w-full h-[2px] bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                            <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 bottom-[7px]' : ''}`} />
                        </div>
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-[#0F172A]/98 backdrop-blur-2xl lg:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.to}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <Link
                                        to={link.to}
                                        onClick={() => setMenuOpen(false)}
                                        className={`text-2xl font-playfair transition-colors ${
                                            location.pathname === link.to
                                                ? 'text-[#C8A96B]'
                                                : 'text-white/60 hover:text-white'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col gap-3 w-full max-w-xs mt-8 pt-8 border-t border-white/10"
                            >
                                {user ? (
                                    <>
                                        <div className="text-center text-white/60 text-sm mb-2">{user.name}</div>
                                        {isStaff && (
                                            <Link to="/admin" onClick={() => setMenuOpen(false)}
                                                className="w-full text-center px-6 py-3 text-[#C8A96B] border border-[#C8A96B] rounded-xl font-medium hover:bg-[#C8A96B] hover:text-white transition-all">
                                                Dashboard
                                            </Link>
                                        )}
                                        <button onClick={() => { setMenuOpen(false); logout(); }}
                                            className="w-full text-center px-6 py-3 text-[#EF4444] border border-[#EF4444]/30 rounded-xl font-medium hover:bg-[#EF4444] hover:text-white transition-all cursor-pointer">
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setMenuOpen(false)}
                                            className="w-full text-center px-6 py-3 text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all">
                                            Sign In
                                        </Link>
                                        <Link to="/register" onClick={() => setMenuOpen(false)}
                                            className="w-full text-center px-6 py-3 text-[#0F172A] bg-[#C8A96B] rounded-xl font-medium hover:bg-[#b8954f] transition-all">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                                {!user && (
                                    <Link to="/reserve" onClick={() => setMenuOpen(false)}
                                        className="w-full text-center px-6 py-3 text-[#C8A96B] border border-[#C8A96B] rounded-xl font-medium hover:bg-[#C8A96B] hover:text-white transition-all">
                                        Book Now
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
