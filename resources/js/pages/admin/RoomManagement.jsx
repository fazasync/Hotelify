import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';

export default function RoomManagement() {
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [form, setForm] = useState({ room_number: '', room_type_id: '', floor: '', status: 'available' });
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
    const [submitting, setSubmitting] = useState(false);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const res = await api.get('/rooms');
            setRooms(res.data.data?.data || res.data.data || []);
        } catch {
            setToast({ open: true, message: 'Failed to load rooms', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const fetchRoomTypes = async () => {
        try {
            const res = await api.get('/room-types');
            setRoomTypes(res.data.data?.data || res.data.data || []);
        } catch {
            // silent
        }
    };

    useEffect(() => { fetchRooms(); }, []);

    const openAdd = () => {
        setEditing(null);
        setForm({ room_number: '', room_type_id: '', floor: '', status: 'available' });
        fetchRoomTypes();
        setShowModal(true);
    };

    const openEdit = (room) => {
        setEditing(room);
        setForm({
            room_number: room.room_number,
            room_type_id: room.room_type_id || room.room_type?.id || '',
            floor: room.floor,
            status: room.status,
        });
        fetchRoomTypes();
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            if (editing) {
                await api.put(`/rooms/${editing.id}`, form);
                setToast({ open: true, message: 'Room updated', type: 'success' });
            } else {
                await api.post('/rooms', form);
                setToast({ open: true, message: 'Room created', type: 'success' });
            }
            setShowModal(false);
            fetchRooms();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Operation failed', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleting) return;
        try {
            await api.delete(`/rooms/${deleting.id}`);
            setToast({ open: true, message: 'Room deleted', type: 'success' });
            setShowDeleteModal(false);
            setDeleting(null);
            fetchRooms();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Delete failed', type: 'error' });
        }
    };

    const filtered = rooms.filter((r) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return r.room_number?.toLowerCase().includes(q) || r.room_type?.name?.toLowerCase().includes(q);
    });

    const columns = [
        { key: 'room_number', label: 'Room Number' },
        { key: 'room_type', label: 'Room Type', render: (row) => row.room_type?.name || '-' },
        { key: 'floor', label: 'Floor' },
        { key: 'status', label: 'Status', render: (row) => <Badge status={row.status}>{row.status}</Badge> },
        {
            key: 'actions', label: 'Actions',
            render: (row) => (
                <div className="flex gap-2">
                    <Button variant="outline" className="!py-1 !px-3 !text-xs" onClick={() => openEdit(row)}>Edit</Button>
                    <Button variant="ghost" className="!py-1 !px-3 !text-xs text-[#EF4444]" onClick={() => { setDeleting(row); setShowDeleteModal(true); }}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Toast isOpen={toast.open} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, open: false })} />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#1E293B]">Room Management</h1>
                <Button onClick={openAdd}>Add Room</Button>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-sm px-4 py-2.5 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all text-sm"
                    />
                </div>

                {loading ? (
                    <LoadingSpinner text="Loading rooms..." />
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12 text-[#64748B]">
                        <p>No rooms found</p>
                    </div>
                ) : (
                    <Table columns={columns} data={filtered} />
                )}
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Room' : 'Add Room'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Room Number" value={form.room_number} onChange={(e) => setForm({ ...form, room_number: e.target.value })} required />
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Room Type</label>
                        <select
                            value={form.room_type_id}
                            onChange={(e) => setForm({ ...form, room_type_id: e.target.value })}
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            required
                        >
                            <option value="">Select room type</option>
                            {roomTypes.map((rt) => (
                                <option key={rt.id} value={rt.id}>{rt.name}</option>
                            ))}
                        </select>
                    </div>
                    <Input label="Floor" type="number" value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} required />
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Status</label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                        >
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                        <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : editing ? 'Update' : 'Create'}</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Room">
                <p className="text-[#64748B] mb-4">Are you sure you want to delete room <strong>{deleting?.room_number}</strong>?</p>
                <div className="flex gap-3 justify-end">
                    <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="outline" className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white" onClick={handleDelete}>Delete</Button>
                </div>
            </Modal>
        </motion.div>
    );
}
