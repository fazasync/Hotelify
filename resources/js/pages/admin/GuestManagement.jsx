import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';

export default function GuestManagement() {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [form, setForm] = useState({ full_name: '', email: '', phone: '', identity_number: '', address: '' });
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
    const [submitting, setSubmitting] = useState(false);

    const fetchGuests = async () => {
        try {
            setLoading(true);
            const res = await api.get('/guests');
            setGuests(res.data.data?.data || res.data.data || []);
        } catch {
            setToast({ open: true, message: 'Failed to load guests', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchGuests(); }, []);

    const openEdit = (guest) => {
        setEditing(guest);
        setForm({
            full_name: guest.full_name,
            email: guest.email || '',
            phone: guest.phone || '',
            identity_number: guest.identity_number || '',
            address: guest.address || '',
        });
        setShowEditModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editing) return;
        try {
            setSubmitting(true);
            await api.put(`/guests/${editing.id}`, form);
            setToast({ open: true, message: 'Guest updated', type: 'success' });
            setShowEditModal(false);
            fetchGuests();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Update failed', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleting) return;
        try {
            await api.delete(`/guests/${deleting.id}`);
            setToast({ open: true, message: 'Guest deleted', type: 'success' });
            setShowDeleteModal(false);
            setDeleting(null);
            fetchGuests();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Delete failed', type: 'error' });
        }
    };

    const filtered = guests.filter((g) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return g.full_name?.toLowerCase().includes(q) || g.email?.toLowerCase().includes(q) || g.phone?.includes(q);
    });

    const columns = [
        { key: 'full_name', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address', render: (row) => (row.address?.length > 40 ? row.address.slice(0, 40) + '...' : row.address || '-') },
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
                <h1 className="text-2xl font-bold text-[#1E293B]">Guest Management</h1>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search guests..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-sm px-4 py-2.5 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all text-sm"
                    />
                </div>

                {loading ? (
                    <LoadingSpinner text="Loading guests..." />
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12 text-[#64748B]">
                        <p>No guests found</p>
                    </div>
                ) : (
                    <Table columns={columns} data={filtered} />
                )}
            </div>

            <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Guest">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
                    <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    <Input label="Identity Number" value={form.identity_number} onChange={(e) => setForm({ ...form, identity_number: e.target.value })} />
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Address</label>
                        <textarea
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            rows={3}
                        />
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                        <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)}>Cancel</Button>
                        <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Update'}</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Guest">
                <p className="text-[#64748B] mb-4">Are you sure you want to delete <strong>{deleting?.full_name}</strong>?</p>
                <div className="flex gap-3 justify-end">
                    <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="outline" className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white" onClick={handleDelete}>Delete</Button>
                </div>
            </Modal>
        </motion.div>
    );
}
