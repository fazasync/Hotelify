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

export default function RoomTypeManagement() {
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', capacity: '', base_price: '' });
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
    const [submitting, setSubmitting] = useState(false);

    const fetchRoomTypes = async () => {
        try {
            setLoading(true);
            const res = await api.get('/room-types');
            setRoomTypes(res.data.data?.data || res.data.data || []);
        } catch {
            setToast({ open: true, message: 'Failed to load room types', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRoomTypes(); }, []);

    const openAdd = () => {
        setEditing(null);
        setForm({ name: '', description: '', capacity: '', base_price: '' });
        setShowModal(true);
    };

    const openEdit = (rt) => {
        setEditing(rt);
        setForm({ name: rt.name, description: rt.description || '', capacity: rt.capacity, base_price: rt.base_price });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            if (editing) {
                await api.put(`/room-types/${editing.id}`, form);
                setToast({ open: true, message: 'Room type updated', type: 'success' });
            } else {
                await api.post('/room-types', form);
                setToast({ open: true, message: 'Room type created', type: 'success' });
            }
            setShowModal(false);
            fetchRoomTypes();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Operation failed', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleting) return;
        try {
            await api.delete(`/room-types/${deleting.id}`);
            setToast({ open: true, message: 'Room type deleted', type: 'success' });
            setShowDeleteModal(false);
            setDeleting(null);
            fetchRoomTypes();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Delete failed', type: 'error' });
        }
    };

    const filtered = roomTypes.filter((rt) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return rt.name?.toLowerCase().includes(q) || rt.description?.toLowerCase().includes(q);
    });

    const formatRp = (val) => `Rp ${Number(val).toLocaleString('id-ID')}`;

    const columns = [
        { key: 'name', label: 'Name' },
        {
            key: 'description', label: 'Description',
            render: (row) => (row.description?.length > 50 ? row.description.slice(0, 50) + '...' : row.description || '-'),
        },
        { key: 'capacity', label: 'Capacity' },
        { key: 'base_price', label: 'Base Price', render: (row) => formatRp(row.base_price) },
        { key: 'status', label: 'Status', render: (row) => <Badge status={row.status || 'available'}>{row.status || 'available'}</Badge> },
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
                <h1 className="text-2xl font-bold text-[#1E293B]">Room Type Management</h1>
                <Button onClick={openAdd}>Add Room Type</Button>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search room types..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-sm px-4 py-2.5 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all text-sm"
                    />
                </div>

                {loading ? (
                    <LoadingSpinner text="Loading room types..." />
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12 text-[#64748B]">
                        <p>No room types found</p>
                    </div>
                ) : (
                    <Table columns={columns} data={filtered} />
                )}
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Room Type' : 'Add Room Type'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            rows={3}
                        />
                    </div>
                    <Input label="Capacity" type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required />
                    <Input label="Base Price" type="number" value={form.base_price} onChange={(e) => setForm({ ...form, base_price: e.target.value })} required />
                    <div className="flex gap-3 justify-end pt-2">
                        <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : editing ? 'Update' : 'Create'}</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Room Type">
                <p className="text-[#64748B] mb-4">Are you sure you want to delete <strong>{deleting?.name}</strong>?</p>
                <div className="flex gap-3 justify-end">
                    <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="outline" className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white" onClick={handleDelete}>Delete</Button>
                </div>
            </Modal>
        </motion.div>
    );
}
