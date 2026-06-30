import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Business Traveler',
        quote: 'Absolutely stunning hotel! The room was immaculate, the staff went above and beyond, and the dining experience was world-class.',
        rating: 5,
        initials: 'SJ',
    },
    {
        name: 'Michael Chen',
        role: 'Family Vacation',
        quote: 'Our family had an unforgettable stay. The kids loved the pool, and we enjoyed the spa. Every detail was remarkable.',
        rating: 5,
        initials: 'MC',
    },
    {
        name: 'Emma Williams',
        role: 'Honeymoon',
        quote: 'The perfect honeymoon destination. Romantic ambiance, breathtaking views, and impeccable service. Truly magical.',
        rating: 5,
        initials: 'EW',
    },
    {
        name: 'David Kumar',
        role: 'Business Executive',
        quote: 'I have stayed at many luxury hotels, but Hotelify stands out. The concierge service and room quality are exceptional.',
        rating: 5,
        initials: 'DK',
    },
];

export default function TestimonialCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const t = testimonials[current];

    return (
        <section className="py-24 px-6 bg-[#FAF8F5]">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.15em]">
                            Testimonials
                        </span>
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#0F172A] mt-3">
                            What Our Guests Say
                        </h2>
                    </div>

                    <div className="relative min-h-[240px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
                                    <svg className="absolute top-6 left-6 w-8 h-8 text-[#C8A96B]/20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                    <div className="relative z-10">
                                        <div className="flex gap-1 mb-5">
                                            {Array.from({ length: t.rating }).map((_, i) => (
                                                <span key={i} className="text-[#C8A96B] text-lg">★</span>
                                            ))}
                                        </div>
                                        <p className="text-[#64748B] leading-relaxed text-base md:text-lg">
                                            &ldquo;{t.quote}&rdquo;
                                        </p>
                                        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                                            <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-xs font-semibold">
                                                {t.initials}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-[#1E293B] text-sm">{t.name}</h4>
                                                <p className="text-[#94A3B8] text-xs">{t.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={'w-2 h-2 rounded-full transition-all cursor-pointer ' + (i === current ? 'bg-[#C8A96B] w-6' : 'bg-gray-300 hover:bg-gray-400')}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
