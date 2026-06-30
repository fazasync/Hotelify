import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookingWidget() {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('2');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (checkIn) params.set('check_in', checkIn);
        if (checkOut) params.set('check_out', checkOut);
        if (guests) params.set('guests', guests);
        window.location.href = '/rooms?' + params.toString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative z-20 -mt-16 mx-auto max-w-5xl px-6"
        >
            <form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-5 md:p-6 border border-gray-100"
            >
                <div className="grid md:grid-cols-4 gap-3 items-end">
                    <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748B] mb-1.5">
                            Check In
                        </label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[#1E293B] text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748B] mb-1.5">
                            Check Out
                        </label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[#1E293B] text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748B] mb-1.5">
                            Guests
                        </label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[#1E293B] text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A96B] focus:border-[#C8A96B] transition-all appearance-none"
                        >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-2.5 bg-[#C8A96B] text-white text-sm font-medium rounded-xl hover:bg-[#b8954f] transition-all shadow-sm cursor-pointer"
                    >
                        Search Availability
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
