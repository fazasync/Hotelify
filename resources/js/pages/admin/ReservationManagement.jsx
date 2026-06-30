import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';

export default function ReservationManagement() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detail, setDetail] = useState(null);
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const params = {};
            if (search) params.booking_code = search;
            if (statusFilter) params.status = statusFilter;
            const res = await api.get('/reservations', { params });
            setReservations(res.data.data?.data || res.data.data || []);
        } catch {
            setToast({ open: true, message: 'Failed to load reservations', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchReservations(); }, [statusFilter]);

    useEffect(() => {
        const timer = setTimeout(() => { fetchReservations(); }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const viewDetail = (reservation) => {
        setDetail(reservation);
        setShowDetailModal(true);
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/reservations/${id}`, { status });
            setToast({ open: true, message: `Reservation ${status}`, type: 'success' });
            fetchReservations();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Update failed', type: 'error' });
        }
    };

    const cancelReservation = async (id) => {
        try {
            await api.put(`/reservations/${id}`, { status: 'cancelled' });
            setToast({ open: true, message: 'Reservation cancelled', type: 'success' });
            fetchReservations();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Cancel failed', type: 'error' });
        }
    };

    const formatRp = (val) => `Rp ${Number(val).toLocaleString('id-ID')}`;

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const nextStatus = (status) => {
        const flow = { pending: 'confirmed', confirmed: 'checked_in', checked_in: 'checked_out' };
        return flow[status];
    };

    const columns = [
        { key: 'booking_code', label: 'Booking Code' },
        { key: 'guest', label: 'Guest Name', render: (row) => row.guest?.full_name || row.guest_name || '-' },
        { key: 'room', label: 'Room', render: (row) => row.room?.room_number || '-' },
        { key: 'check_in', label: 'Check-In', render: (row) => formatDate(row.check_in) },
        { key: 'check_out', label: 'Check-Out', render: (row) => formatDate(row.check_out) },
        { key: 'total_price', label: 'Total Price', render: (row) => formatRp(row.total_price) },
        { key: 'status', label: 'Status', render: (row) => <Badge status={row.status}>{row.status}</Badge> },
        {
            key: 'actions', label: 'Actions',
            render: (row) => (
                <div className="flex gap-2 items-center">
                    <Button variant="outline" className="!py-1 !px-3 !text-xs" onClick={() => viewDetail(row)}>View</Button>
                    {nextStatus(row.status) && (
                        <Button className="!py-1 !px-3 !text-xs" onClick={() => updateStatus(row.id, nextStatus(row.status))}>
                            {nextStatus(row.status) === 'checked_in' ? 'Check In' : nextStatus(row.status) === 'checked_out' ? 'Check Out' : 'Confirm'}
                        </Button>
                    )}
                    {['pending', 'confirmed'].includes(row.status) && (
                        <Button variant="ghost" className="!py-1 !px-3 !text-xs text-[#EF4444]" onClick={() => cancelReservation(row.id)}>Cancel</Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Toast isOpen={toast.open} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, open: false })} />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#1E293B]">Reservation Management</h1>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <div className="mb-4 flex gap-3 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by booking code..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-sm px-4 py-2.5 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all text-sm"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all text-sm"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="checked_in">Checked In</option>
                        <option value="checked_out">Checked Out</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {loading ? (
                    <LoadingSpinner text="Loading reservations..." />
                ) : reservations.length === 0 ? (
                    <div className="text-center py-12 text-[#64748B]">
                        <p>No reservations found</p>
                    </div>
                ) : (
                    <Table columns={columns} data={reservations} />
                )}
            </div>

            <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Reservation Details">
                {detail && (
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-3">
                            <div><span className="text-[#64748B]">Booking Code</span><p className="font-medium">{detail.booking_code}</p></div>
                            <div><span className="text-[#64748B]">Status</span><p><Badge status={detail.status}>{detail.status}</Badge></p></div>
                            <div><span className="text-[#64748B]">Guest</span><p className="font-medium">{detail.guest?.full_name || detail.guest_name}</p></div>
                            <div><span className="text-[#64748B]">Email</span><p>{detail.guest?.email || '-'}</p></div>
                            <div><span className="text-[#64748B]">Phone</span><p>{detail.guest?.phone || '-'}</p></div>
                            <div><span className="text-[#64748B]">Room</span><p>{detail.room?.room_number || '-'}</p></div>
                            <div><span className="text-[#64748B]">Check-In</span><p>{formatDate(detail.check_in)}</p></div>
                            <div><span className="text-[#64748B]">Check-Out</span><p>{formatDate(detail.check_out)}</p></div>
                            <div><span className="text-[#64748B]">Total Price</span><p className="font-semibold text-[#C8A96B]">{formatRp(detail.total_price)}</p></div>
                            {detail.adults && <div><span className="text-[#64748B]">Adults</span><p>{detail.adults}</p></div>}
                            {detail.children && <div><span className="text-[#64748B]">Children</span><p>{detail.children}</p></div>}
                            {detail.notes && (
                                <div className="col-span-2">
                                    <span className="text-[#64748B]">Notes</span>
                                    <p>{detail.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}
