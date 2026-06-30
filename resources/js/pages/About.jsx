import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const stats = [
    { value: '15+', label: 'Years of Excellence' },
    { value: '500+', label: 'Happy Guests' },
    { value: '15', label: 'Room Types' },
    { value: '4.9', label: 'Guest Rating' },
];

const values = [
    { title: 'Excellence', desc: 'We strive for perfection in every aspect of your stay.' },
    { title: 'Hospitality', desc: 'Warm, personalized service that makes you feel at home.' },
    { title: 'Luxury', desc: 'Premium amenities and attention to the finest details.' },
    { title: 'Sustainability', desc: 'Committed to eco-friendly practices and responsible tourism.' },
];

export default function About() {
    return (
        <div className="pt-24">
            <section className="relative py-20 px-6 bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#C8A96B] rounded-full blur-[128px]" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-playfair text-5xl lg:text-6xl font-bold text-white"
                    >
                        About Hotelify
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-0.5 bg-[#C8A96B] mx-auto mt-6"
                    />
                    <p className="mt-6 text-lg text-[#94A3B8] max-w-3xl mx-auto">
                        Where luxury meets comfort — discover the story behind Hotelify.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#C8A96B] text-sm font-semibold uppercase tracking-[0.2em]">Our Story</span>
                        <h2 className="font-playfair text-4xl font-bold text-[#0F172A] mt-4 leading-tight">
                            A Legacy of<br />Luxurious Hospitality
                        </h2>
                        <div className="w-16 h-0.5 bg-[#C8A96B] mt-6" />
                        <p className="mt-6 text-[#64748B] leading-relaxed">
                            Founded with a vision to redefine luxury hospitality, Hotelify has been providing exceptional experiences for over a decade. Our commitment to excellence, attention to detail, and warm Indonesian hospitality make every stay unforgettable.
                        </p>
                        <p className="mt-4 text-[#64748B] leading-relaxed">
                            From our meticulously designed rooms to our world-class dining and wellness facilities, every aspect of Hotelify is crafted to exceed expectations.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="rounded-[24px] overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#C8A96B] to-[#0F172A] flex items-center justify-center">
                            <span className="text-white/20 text-8xl font-playfair font-bold">H</span>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#C8A96B]/20 rounded-[24px] -z-10" />
                    </motion.div>
                </div>
            </section>

            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <p className="text-3xl md:text-4xl font-bold text-[#C8A96B]">{s.value}</p>
                            <p className="text-sm text-[#64748B] mt-2">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-[#C8A96B] text-sm font-semibold uppercase tracking-[0.2em]">Our Values</span>
                        <h2 className="font-playfair text-4xl font-bold text-[#0F172A] mt-4">What We Stand For</h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-[20px] bg-[#FAF8F5] text-center hover:bg-[#0F172A] group transition-all duration-500"
                            >
                                <h3 className="font-playfair text-xl font-bold text-[#1E293B] group-hover:text-white transition-colors">{v.title}</h3>
                                <p className="text-[#64748B] text-sm mt-3 leading-relaxed group-hover:text-[#94A3B8] transition-colors">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#0F172A] text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-playfair text-4xl font-bold text-white">Ready to Experience Hotelify?</h2>
                    <p className="text-[#94A3B8] mt-4">Book your stay today and discover true luxury.</p>
                    <Link to="/rooms" className="inline-block mt-8 px-8 py-4 bg-[#C8A96B] text-white rounded-[16px] font-medium hover:bg-[#b8954f] transition-all">
                        Book Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
