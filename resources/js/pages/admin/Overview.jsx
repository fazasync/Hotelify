import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import StatCard from '../../components/StatCard';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import { useNavigate } from 'react-router-dom';

export default function Overview() {
    const navigate = useNavigate();
    const [occupancy, setOccupancy] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const [recentReservations, setRecentReservations] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        api.get('/reports/occupancy').then((res) => setOccupancy(res.data.data)).catch(() => {});
        api.get('/reports/revenue').then((res) => setRevenue(res.data.data)).catch(() => {});
        api.get('/reservations?per_page=5&sort=id&sort_dir=desc').then((res) => setRecentReservations(res.data.data?.data || res.data.data || [])).catch(() => {});
        api.get('/rooms').then((res) => setRooms(res.data.data?.data || res.data.data || [])).catch(() => {});
    }, []);

    const roomStatusCounts = { available: 0, occupied: 0, maintenance: 0 };
    rooms.forEach((r) => {
        if (roomStatusCounts[r.status] !== undefined) roomStatusCounts[r.status]++;
    });

    const statusColors = { available: '#22C55E', occupied: '#EF4444', maintenance: '#F59E0B' };

    const reservationColumns = [
        { key: 'booking_code', label: 'Booking Code' },
        { key: 'guest', label: 'Guest', render: (row) => row.guest?.name || row.guest_name || '-' },
        { key: 'room', label: 'Room', render: (row) => row.room?.room_number || row.room_number || '-' },
        { key: 'status', label: 'Status', render: (row) => <Badge status={row.status}>{row.status}</Badge> },
        { key: 'created_at', label: 'Date', render: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : '-' },
    ];

    const quickActions = [
        { label: 'New Reservation', path: '/admin/reservations' },
        { label: 'Check-In', path: '/admin/checkin' },
        { label: 'Check-Out', path: '/admin/checkout' },
        { label: 'View Reports', path: '/admin/reports' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard Overview</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <StatCard title="Total Rooms" value={occupancy?.total_rooms || 0} color="#C8A96B" />
                <StatCard title="Available" value={occupancy?.available_rooms || 0} color="#22C55E" />
                <StatCard title="Occupied" value={occupancy?.occupied_rooms || 0} color="#F59E0B" />
                <StatCard title="Revenue" value={revenue ? `Rp ${Number(revenue.total_revenue).toLocaleString('id-ID')}` : '0'} color="#C8A96B" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6">
                    <h2 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Activity</h2>
                    {recentReservations.length > 0 ? (
                        <Table columns={reservationColumns} data={recentReservations} />
                    ) : (
                        <p className="text-sm text-[#64748B]">No recent reservations</p>
                    )}
                </div>

                <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6">
                    <h2 className="text-lg font-semibold text-[#1E293B] mb-4">Room Status Overview</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {rooms.map((room) => (
                            <div
                                key={room.id}
                                className="w-5 h-5 rounded-full"
                                style={{ backgroundColor: statusColors[room.status] || '#94A3B8' }}
                                title={`Room ${room.room_number}: ${room.status}`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                            <span className="text-[#1E293B]">Available ({roomStatusCounts.available})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                            <span className="text-[#1E293B]">Occupied ({roomStatusCounts.occupied})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                            <span className="text-[#1E293B]">Maintenance ({roomStatusCounts.maintenance})</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <motion.button
                            key={action.path}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(action.path)}
                            className="px-6 py-4 bg-[#C8A96B] text-white rounded-[16px] font-medium hover:bg-[#b8954f] transition-all cursor-pointer text-center"
                        >
                            {action.label}
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
