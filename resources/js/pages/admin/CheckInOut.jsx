import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Badge from '../../components/Badge';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import Modal from '../../components/Modal';

export default function CheckInOut({ type }) {
    const [query, setQuery] = useState('');
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
    const [submitting, setSubmitting] = useState(false);

    const isCheckin = type === 'checkin';
    const title = isCheckin ? 'Check-In' : 'Check-Out';
    const requiredStatus = isCheckin ? 'confirmed' : 'checked_in';

    const searchReservations = async () => {
        if (!query.trim()) return;
        try {
            setLoading(true);
            setResult(null);
            const params = { status: requiredStatus };
            if (query.includes('@')) {
                params.email = query;
            } else {
                params.booking_code = query;
            }
            const res = await api.get('/reservations', { params });
            setReservations(res.data.data?.data || res.data.data || []);
        } catch {
            setToast({ open: true, message: 'Search failed', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleProcess = async () => {
        if (!selected) return;
        try {
            setSubmitting(true);
            const endpoint = isCheckin ? '/checkin' : '/checkout';
            const res = await api.post(endpoint, { reservation_id: selected.id });
            setResult(res.data);
            setShowResult(true);
            setReservations([]);
            setSelected(null);
            setQuery('');
            setToast({ open: true, message: res.data.message || `${title} successful`, type: 'success' });
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || `${title} failed`, type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Toast isOpen={toast.open} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, open: false })} />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#1E293B]">{title}</h1>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                    <h2 className="text-lg font-semibold text-[#1E293B] mb-4">Search Reservation</h2>
                    <p className="text-sm text-[#64748B] mb-4">
                        Search by booking code or guest email for {isCheckin ? 'confirmed' : 'checked-in'} reservations.
                    </p>

                    <div className="flex gap-3">
                        <div className="flex-1">
                            <Input
                                placeholder="Booking code or email..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchReservations()}
                            />
                        </div>
                        <Button onClick={searchReservations} disabled={!query.trim() || loading}>Search</Button>
                    </div>

                    {loading && <LoadingSpinner text={`Searching ${isCheckin ? 'confirmed' : 'checked-in'} reservations...`} />}

                    {!loading && reservations.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium text-[#64748B]">{reservations.length} reservation(s) found</p>
                            {reservations.map((r) => (
                                <div
                                    key={r.id}
                                    onClick={() => setSelected(selected?.id === r.id ? null : r)}
                                    className={`p-4 rounded-[16px] border-2 cursor-pointer transition-all ${
                                        selected?.id === r.id ? 'border-[#C8A96B] bg-[#C8A96B]/5' : 'border-gray-100 hover:border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-[#1E293B]">{r.booking_code}</span>
                                        <Badge status={r.status}>{r.status}</Badge>
                                    </div>
                                    <div className="text-sm text-[#64748B] space-y-1">
                                        <p>Guest: {r.guest?.full_name || r.guest_name}</p>
                                        <p>Room: {r.room?.room_number} | {formatDate(r.check_in)} - {formatDate(r.check_out)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && reservations.length === 0 && query && (
                        <div className="mt-4 text-center py-6 text-[#64748B] text-sm">
                            No {isCheckin ? 'confirmed' : 'checked-in'} reservations found
                        </div>
                    )}

                    {selected && (
                        <div className="mt-4">
                            <Button onClick={handleProcess} disabled={submitting} className="w-full">
                                {submitting ? 'Processing...' : title}
                            </Button>
                        </div>
                    )}
                </div>

                {showResult && result && (
                    <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                        <h2 className="text-lg font-semibold text-[#1E293B] mb-4">Result</h2>
                        <div className="p-4 bg-[#22C55E]/5 rounded-[16px] border border-[#22C55E]/20">
                            <p className="text-[#22C55E] font-medium mb-3">{result.message}</p>
                            <div className="text-sm text-[#1E293B] space-y-2">
                                {result.data?.reservation && (
                                    <>
                                        <div className="flex justify-between"><span className="text-[#64748B]">Booking Code</span><span className="font-medium">{result.data.reservation.booking_code}</span></div>
                                        <div className="flex justify-between"><span className="text-[#64748B]">Guest</span><span>{result.data.reservation.guest?.full_name || result.data.reservation.guest_name}</span></div>
                                        <div className="flex justify-between"><span className="text-[#64748B]">Room</span><span>{result.data.reservation.room?.room_number}</span></div>
                                        <div className="flex justify-between"><span className="text-[#64748B]">Check-In</span><span>{formatDate(result.data.reservation.check_in)}</span></div>
                                        <div className="flex justify-between"><span className="text-[#64748B]">Check-Out</span><span>{formatDate(result.data.reservation.check_out)}</span></div>
                                        <div className="flex justify-between"><span className="text-[#64748B]">Status</span><Badge status={result.data.reservation.status}>{result.data.reservation.status}</Badge></div>
                                    </>
                                )}
                                {result.data?.room && (
                                    <div className="flex justify-between"><span className="text-[#64748B]">Room Number</span><span className="font-medium">{result.data.room.room_number}</span></div>
                                )}
                                {result.data?.guest && (
                                    <div className="flex justify-between"><span className="text-[#64748B]">Guest Name</span><span>{result.data.guest.full_name}</span></div>
                                )}
                            </div>
                        </div>
                        <Button variant="outline" className="mt-4 w-full" onClick={() => { setShowResult(false); setResult(null); }}>
                            Done
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
