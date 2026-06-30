import { Link } from 'react-router-dom';

const quickLinks = [
    { to: '/rooms', label: 'Rooms & Suites' },
    { to: '/facilities', label: 'Facilities' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
];

const contactInfo = [
    { label: 'Jl. Trans Kalimantan No 1. Handil Bakti', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: '+62 21 1234 5678', icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z' },
    { label: 'info@hotelify.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

const socialIcons = [
    { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
    { label: 'Instagram', path: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 12a4 4 0 110-8 4 4 0 010 8zm0-6a2 2 0 100 4 2 2 0 000-4zm5-2a1 1 0 110-2 1 1 0 010 2z' },
    { label: 'X (Twitter)', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM10 15.09V8.41l5.59 3.34L10 15.09z' },
];

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-white">
            <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A96B]/30 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                    <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
                        <div className="lg:col-span-4">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="relative w-10 h-10">
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#C8A96B] to-[#a8884f] rotate-45" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[#0F172A] font-bold text-sm">H</span>
                                    </div>
                                </div>
                                <span className="text-xl font-playfair font-bold text-[#C8A96B]">Hotelify</span>
                            </div>
                            <p className="text-[#64748B] text-sm leading-relaxed max-w-xs">
                                Luxury Stays, Exceptional Experiences. Where every moment is crafted for your comfort and delight.
                            </p>
                            <div className="mt-6 flex gap-3">
                                {socialIcons.map((s) => (
                                    <a
                                        key={s.label}
                                        href="#"
                                        aria-label={s.label}
                                        className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center group hover:border-[#C8A96B]/50 hover:bg-[#C8A96B]/10 transition-all"
                                    >
                                        <svg className="w-4 h-4 text-[#64748B] group-hover:text-[#C8A96B] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path d={s.path} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C8A96B] mb-6">
                                Quick Links
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {quickLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="text-[#94A3B8] hover:text-white transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-3">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C8A96B] mb-6">
                                Contact
                            </h3>
                            <ul className="flex flex-col gap-4">
                                {contactInfo.map((item) => (
                                    <li key={item.label} className="flex items-start gap-3">
                                        <svg className="w-4 h-4 text-[#C8A96B] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path d={item.icon} />
                                        </svg>
                                        <span className="text-[#94A3B8] text-sm">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-3">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C8A96B] mb-6">
                                Newsletter
                            </h3>
                            <p className="text-[#64748B] text-sm mb-4">
                                Get exclusive offers and updates.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#C8A96B]/50 transition-colors"
                                />
                                <button className="px-4 py-2.5 bg-[#C8A96B] text-[#0F172A] text-sm font-medium rounded-xl hover:bg-[#b8954f] transition-colors cursor-pointer">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#475569] text-xs">
                        &copy; {new Date().getFullYear()} Hotelify. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-[#475569] hover:text-[#94A3B8] text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-[#475569] hover:text-[#94A3B8] text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
