import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import StatCard from '../../components/StatCard';

const barColors = {
    confirmed: '#22C55E',
    checked_in: '#3B82F6',
    checked_out: '#64748B',
    cancelled: '#EF4444',
    pending: '#F59E0B',
};

export default function Reports() {
    const [revenue, setRevenue] = useState(null);
    const [occupancy, setOccupancy] = useState(null);
    const [bookingStats, setBookingStats] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchRevenue = (start, end) => {
        let url = '/reports/revenue';
        const params = [];
        if (start) params.push(`start_date=${start}`);
        if (end) params.push(`end_date=${end}`);
        if (params.length) url += '?' + params.join('&');
        api.get(url).then((res) => setRevenue(res.data.data)).catch(() => {});
    };

    useEffect(() => {
        api.get('/reports/occupancy').then((res) => setOccupancy(res.data.data)).catch(() => {});
        api.get('/reports/bookings').then((res) => setBookingStats(res.data.data)).catch(() => {});
        fetchRevenue('', '');
    }, []);

    const handleDateFilter = () => {
        fetchRevenue(startDate, endDate);
    };

    const bookingEntries = bookingStats ? Object.entries(bookingStats).filter(([k]) => k !== 'total') : [];
    const maxCount = Math.max(...bookingEntries.map(([, v]) => v), 1);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-[#1E293B] mb-6">Reports & Analytics</h1>

            <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 mb-8">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-4">Date Range Filter</h2>
                <div className="flex items-end gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="px-4 py-2 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="px-4 py-2 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                        />
                    </div>
                    <button
                        onClick={handleDateFilter}
                        className="px-6 py-2 bg-[#C8A96B] text-white rounded-[14px] font-medium hover:bg-[#b8954f] transition-all cursor-pointer"
                    >
                        Apply
                    </button>
                </div>
            </div>

            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">Occupancy</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Rooms" value={occupancy?.total_rooms || 0} />
                <StatCard title="Occupied" value={occupancy?.occupied_rooms || 0} />
                <StatCard title="Available" value={occupancy?.available_rooms || 0} />
                <StatCard title="Rate" value={`${occupancy?.occupancy_rate || 0}%`} />
            </div>

            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">Revenue</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <StatCard title="Total Revenue" value={revenue ? `Rp ${Number(revenue.total_revenue).toLocaleString('id-ID')}` : '0'} />
            </div>

            <h2 className="text-lg font-semibold text-[#1E293B] mb-3">Bookings</h2>
            <div className="grid md:grid-cols-5 gap-4 mb-6">
                <StatCard title="Total" value={bookingStats?.total || 0} />
                <StatCard title="Confirmed" value={bookingStats?.confirmed || 0} />
                <StatCard title="Checked In" value={bookingStats?.checked_in || 0} />
                <StatCard title="Checked Out" value={bookingStats?.checked_out || 0} />
                <StatCard title="Cancelled" value={bookingStats?.cancelled || 0} />
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-4">Booking Status Distribution</h2>
                <div className="space-y-4">
                    {bookingEntries.map(([status, count]) => (
                        <div key={status}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-[#1E293B] capitalize">{status.replace('_', ' ')}</span>
                                <span className="text-[#64748B]">{count}</span>
                            </div>
                            <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(count / maxCount) * 100}%`, backgroundColor: barColors[status] || '#94A3B8' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
