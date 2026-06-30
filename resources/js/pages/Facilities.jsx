import { motion } from 'framer-motion';

const facilities = [
    { name: 'Swimming Pool', desc: 'Infinity pool with panoramic city views and poolside service.', icon: '🏊', color: 'from-blue-500 to-cyan-500' },
    { name: 'Fine Dining', desc: 'World-class cuisine by renowned chefs across three restaurants.', icon: '🍽️', color: 'from-amber-500 to-orange-500' },
    { name: 'Fitness Center', desc: 'State-of-the-art gym with personal trainers available.', icon: '💪', color: 'from-green-500 to-emerald-500' },
    { name: 'Luxury Spa', desc: 'Traditional and modern wellness treatments in a serene setting.', icon: '💆', color: 'from-purple-500 to-pink-500' },
    { name: 'Business Center', desc: 'Fully equipped meeting rooms and business facilities.', icon: '💼', color: 'from-gray-500 to-slate-500' },
    { name: 'Free WiFi', desc: 'High-speed fiber internet throughout the hotel premises.', icon: '📶', color: 'from-sky-500 to-indigo-500' },
    { name: 'Valet Parking', desc: 'Secure parking with 24/7 valet service.', icon: '🚗', color: 'from-red-500 to-rose-500' },
    { name: 'Kids Club', desc: 'Supervised activities and entertainment for children.', icon: '🎨', color: 'from-yellow-500 to-amber-500' },
    { name: 'Concierge', desc: 'Personal concierge service for reservations and recommendations.', icon: '🎯', color: 'from-teal-500 to-cyan-500' },
];

export default function Facilities() {
    return (
        <div className="pt-24">
            <section className="relative py-20 px-6 bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A96B] rounded-full blur-[200px]" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-playfair text-5xl lg:text-6xl font-bold text-white"
                    >
                        Hotel Facilities
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-0.5 bg-[#C8A96B] mx-auto mt-6"
                    />
                    <p className="mt-6 text-lg text-[#94A3B8] max-w-2xl mx-auto">
                        Everything you need for a perfect stay — from relaxation to recreation.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((f, i) => (
                        <motion.div
                            key={f.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group p-8 rounded-[20px] bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#C8A96B]/20"
                        >
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${f.color} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform`}>
                                {f.icon}
                            </div>
                            <h3 className="font-playfair text-xl font-bold text-[#1E293B] mb-3">{f.name}</h3>
                            <p className="text-[#64748B] leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
