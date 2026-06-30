import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/Card';
import Badge from '../components/Badge';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MyReservations() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['my-reservations'],
        queryFn: () => api.get('/my-reservations').then((r) => r.data.data?.data || r.data.data || []),
    });

    const formatPrice = (val) => `Rp ${Number(val).toLocaleString('id-ID')}`;

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16 flex items-center justify-center">
                <LoadingSpinner text="Loading your reservations..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-14 h-14 mx-auto bg-[#EF4444]/10 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-7 h-7 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-[#1E293B]">Failed to load reservations</h2>
                    <p className="text-[#64748B] text-sm mt-1">{error?.response?.data?.message || 'Something went wrong'}</p>
                </div>
            </div>
        );
    }

    const reservations = data || [];

    return (
        <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-playfair font-bold text-[#0F172A]">My Reservations</h1>
                            <p className="text-[#64748B] mt-1">View and manage your booking history</p>
                        </div>
                        <Link to="/reserve"
                            className="px-5 py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] transition-all">
                            Book a Room
                        </Link>
                    </div>

                    {reservations.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-16 h-16 mx-auto bg-[#C8A96B]/10 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-[#C8A96B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-[#1E293B]">No reservations yet</h2>
                            <p className="text-[#64748B] text-sm mt-1">Start planning your stay at Hotelify.</p>
                            <Link to="/reserve"
                                className="inline-block mt-6 px-6 py-2.5 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] transition-all">
                                Make a Reservation
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid gap-4">
                            {reservations.map((res, i) => (
                                <motion.div
                                    key={res.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Card className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-semibold text-[#C8A96B]">{res.booking_code}</span>
                                                    <Badge status={res.status}>{res.status?.replace('_', ' ')}</Badge>
                                                </div>
                                                <p className="text-sm font-medium text-[#1E293B]">
                                                    {res.room?.room_type?.name || 'Room'} — Room {res.room?.room_number || 'N/A'}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-[#64748B]">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {formatDate(res.check_in)}
                                                    </span>
                                                    <span className="text-[#94A3B8]">→</span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {formatDate(res.check_out)}
                                                    </span>
                                                </div>
                                                {res.guest_name && (
                                                    <p className="text-xs text-[#94A3B8]">Guest: {res.guest_name}</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-[#C8A96B]">{formatPrice(res.total_price)}</p>
                                                <p className="text-xs text-[#64748B] mt-1">
                                                    {res.guests || 1} guest{res.guests > 1 ? 's' : ''} · {res.nights || 1} night{res.nights > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
