import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingWidget from '../components/BookingWidget';
import TestimonialCarousel from '../components/TestimonialCarousel';
import GalleryGrid from '../components/GalleryGrid';

const facilities = [
    { name: 'Swimming Pool', desc: 'Infinity pool with panoramic city views and poolside service.', icon: '<path d="M2 12h20M2 12a8 8 0 0116 0M2 12a8 8 0 0016 0M18 12a6 6 0 01-12 0" strokeLinecap="round"/><path d="M8 16l2-4M16 16l-2-4M12 20v-4"/>' },
    { name: 'Fine Dining', desc: 'World-class cuisine by renowned chefs in three distinctive restaurants.', icon: '<path d="M12 2v20M4 8h16M6 8v8a6 6 0 0012 0V8"/><circle cx="12" cy="8" r="2"/>' },
    { name: 'Fitness Center', desc: 'State-of-the-art gym with personal training and wellness programs.', icon: '<path d="M6.5 6.5L17.5 17.5M6.5 17.5L17.5 6.5"/><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>' },
    { name: 'Luxury Spa', desc: 'Traditional and modern wellness treatments in a serene sanctuary.', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>' },
    { name: 'Free WiFi', desc: 'High-speed fiber internet throughout the hotel premises.', icon: '<path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>' },
    { name: 'Valet Parking', desc: 'Secure parking with 24/7 professional valet service.', icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9M15 21V9"/>' },
];

const rooms = [
    {
        name: 'Deluxe Room', capacity: '2 Guests', price: '1.500.000',
        amenities: ['King Bed', 'City View', 'Free WiFi', 'Mini Bar'],
        pattern: 'radial-gradient(circle at 0% 0%, rgba(200,169,107,0.4) 0%, transparent 60%), radial-gradient(circle at 100% 100%, rgba(15,23,42,0.6) 0%, transparent 50%)',
    },
    {
        name: 'Executive Suite', capacity: '3 Guests', price: '2.800.000',
        amenities: ['King Bed', 'Ocean View', 'Living Room', 'Jacuzzi'],
        pattern: 'radial-gradient(ellipse at 50% 0%, rgba(15,23,42,0.8) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(200,169,107,0.3) 0%, transparent 50%)',
    },
    {
        name: 'Presidential Suite', capacity: '4 Guests', price: '5.500.000',
        amenities: ['King Bed', 'Panoramic View', 'Private Pool', 'Butler'],
        pattern: 'linear-gradient(135deg, rgba(200,169,107,0.3) 0%, rgba(15,23,42,0.5) 50%, rgba(200,169,107,0.2) 100%)',
    },
];

const whyChooseUs = [
    { number: '01', title: 'Premium Comfort', desc: 'Luxurious rooms with world-class amenities crafted for your ultimate comfort and relaxation throughout your stay.' },
    { number: '02', title: 'Easy Booking', desc: 'Seamless online reservation system with instant confirmation. Book your perfect stay in just a few simple clicks.' },
    { number: '03', title: '24/7 Support', desc: 'Dedicated staff available around the clock to serve your every need and ensure a flawless experience.' },
];

export default function Home() {
    return (
        <div>
            {/* ── Hero ── */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1120]" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-[#C8A96B]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#C8A96B]/8 rounded-full blur-[100px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full text-[#C8A96B] text-xs font-medium tracking-wide mb-6 border border-white/5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]" />
                                Premium Hotel Experience
                            </span>
                            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                                Luxury Stays,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96B] via-[#d4b87a] to-[#C8A96B]">
                                    Exceptional
                                </span>
                                <br />
                                Experiences.
                            </h1>
                            <p className="mt-5 text-base md:text-lg text-[#94A3B8] max-w-lg leading-relaxed">
                                Experience world-class hospitality at Hotelify. Premium rooms, exquisite dining, and unforgettable moments await you.
                            </p>
                            <div className="mt-8 flex gap-3">
                                <Link
                                    to="/rooms"
                                    className="group px-6 py-3 bg-[#C8A96B] text-[#0F172A] text-sm font-semibold rounded-xl hover:bg-[#b8954f] transition-all shadow-lg shadow-[#C8A96B]/25 flex items-center gap-2"
                                >
                                    Book Now
                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M13 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/rooms"
                                    className="px-6 py-3 text-white/80 text-sm font-medium border border-white/15 rounded-xl hover:bg-white/5 hover:border-white/30 hover:text-white transition-all"
                                >
                                    Explore Rooms
                                </Link>
                            </div>

                            <div className="flex gap-8 mt-10 pt-8 border-t border-white/[0.06]">
                                {[
                                    { value: '4.9', label: 'Guest Rating' },
                                    { value: '500+', label: 'Happy Guests' },
                                    { value: '15', label: 'Room Types' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <span className="text-xl font-bold text-white">{stat.value}</span>
                                        <span className="block text-[11px] text-[#475569] mt-0.5 tracking-wide">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#0F172A] border border-white/[0.06]">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: 'linear-gradient(135deg, rgba(200,169,107,0.15) 0%, transparent 50%), repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px)',
                                    }} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-5 rotate-45">
                                                <span className="-rotate-45 text-3xl text-white/40 font-playfair font-bold">H</span>
                                            </div>
                                            <p className="text-white/30 text-xs uppercase tracking-[0.2em]">Welcome to</p>
                                            <p className="text-white/70 font-playfair text-3xl font-bold mt-2">Hotelify</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#C8A96B]/30 rounded-tl-xl" />
                                    <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#C8A96B]/30 rounded-br-xl" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Booking Widget ── */}
            <BookingWidget />

            {/* ── Featured Rooms ── */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.15em]">
                            Accommodations
                        </span>
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#0F172A] mt-3">
                            Featured Rooms
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {rooms.map((room, i) => (
                            <motion.div
                                key={room.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                            >
                                <div className="relative h-48 overflow-hidden" style={{ background: room.pattern }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-[#1E293B] shadow-sm">
                                        {room.capacity}
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <span className="text-white text-lg font-bold">Rp {room.price}</span>
                                        <span className="text-white/60 text-xs ml-1">/night</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-playfair text-lg font-bold text-[#1E293B]">{room.name}</h3>
                                    <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                                        {room.amenities.map((a) => (
                                            <span key={a} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-[#64748B]">
                                                <span className="w-1 h-1 rounded-full bg-[#C8A96B]" />
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        to="/rooms"
                                        className="block text-center py-2.5 bg-[#C8A96B] text-white text-sm font-medium rounded-xl hover:bg-[#b8954f] transition-all"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Hotel Facilities ── */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.15em]">
                            Facilities
                        </span>
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#0F172A] mt-3">
                            Hotel Amenities
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {facilities.map((f, i) => (
                            <motion.div
                                key={f.name}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative p-5 rounded-xl bg-[#FAF8F5] hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all duration-300 cursor-pointer"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-[#C8A96B] rounded-l-xl transition-colors duration-300" />
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:bg-[#C8A96B]/10 transition-colors">
                                        <svg className="w-5 h-5 text-[#C8A96B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            {f.icon}
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-[#1E293B] group-hover:text-[#C8A96B] transition-colors">
                                            {f.name}
                                        </h3>
                                        <p className="text-[#64748B] text-xs mt-1 leading-relaxed">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-24 px-6 bg-[#FAF8F5]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.15em]">
                            Why Us
                        </span>
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#0F172A] mt-3">
                            Why Choose Hotelify?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {whyChooseUs.map((item, i) => (
                            <motion.div
                                key={item.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <span className="text-5xl font-bold text-[#C8A96B]/8 absolute top-3 right-4 font-playfair leading-none">
                                    {item.number}
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8A96B] to-[#a8884f] flex items-center justify-center text-white font-bold text-sm mb-4">
                                    {item.number}
                                </div>
                                <h3 className="text-base font-semibold text-[#1E293B] mb-2">{item.title}</h3>
                                <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <TestimonialCarousel />

            {/* ── Gallery ── */}
            <GalleryGrid />

            {/* ── CTA Section ── */}
            <section className="relative py-28 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1120]" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A96B]/5 rounded-full blur-[150px]" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.15em]">
                            Your Stay Awaits
                        </span>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">
                            Book Your Perfect<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96B] to-[#d4b87a]">Stay Today</span>
                        </h2>
                        <p className="mt-4 text-[#94A3B8] text-base max-w-xl mx-auto leading-relaxed">
                            Experience unparalleled luxury and comfort. Book directly for the best rates and exclusive benefits.
                        </p>
                        <Link
                            to="/rooms"
                            className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-[#C8A96B] text-[#0F172A] font-semibold rounded-xl hover:bg-[#b8954f] transition-all shadow-lg shadow-[#C8A96B]/25"
                        >
                            Book Now
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}