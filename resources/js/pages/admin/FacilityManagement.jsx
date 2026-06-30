import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';

export default function FacilityManagement() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [form, setForm] = useState({ name: '' });
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
    const [submitting, setSubmitting] = useState(false);

    const fetchFacilities = async () => {
        try {
            setLoading(true);
            const res = await api.get('/facilities');
            setFacilities(res.data.data?.data || res.data.data || []);
        } catch {
            setToast({ open: true, message: 'Failed to load facilities', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchFacilities(); }, []);

    const openAdd = () => {
        setEditing(null);
        setForm({ name: '' });
        setShowModal(true);
    };

    const openEdit = (facility) => {
        setEditing(facility);
        setForm({ name: facility.name });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            if (editing) {
                await api.put(`/facilities/${editing.id}`, form);
                setToast({ open: true, message: 'Facility updated', type: 'success' });
            } else {
                await api.post('/facilities', form);
                setToast({ open: true, message: 'Facility created', type: 'success' });
            }
            setShowModal(false);
            fetchFacilities();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Operation failed', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleting) return;
        try {
            await api.delete(`/facilities/${deleting.id}`);
            setToast({ open: true, message: 'Facility deleted', type: 'success' });
            setShowDeleteModal(false);
            setDeleting(null);
            fetchFacilities();
        } catch (err) {
            setToast({ open: true, message: err.response?.data?.message || 'Delete failed', type: 'error' });
        }
    };

    const filtered = facilities.filter((f) => {
        if (!search) return true;
        return f.name?.toLowerCase().includes(search.toLowerCase());
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'created_at', label: 'Created At', render: (row) => formatDate(row.created_at) },
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
                <h1 className="text-2xl font-bold text-[#1E293B]">Facility Management</h1>
                <Button onClick={openAdd}>Add Facility</Button>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search facilities..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-sm px-4 py-2.5 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all text-sm"
                    />
                </div>

                {loading ? (
                    <LoadingSpinner text="Loading facilities..." />
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12 text-[#64748B]">
                        <p>No facilities found</p>
                    </div>
                ) : (
                    <Table columns={columns} data={filtered} />
                )}
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Facility' : 'Add Facility'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <div className="flex gap-3 justify-end pt-2">
                        <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : editing ? 'Update' : 'Create'}</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Facility">
                <p className="text-[#64748B] mb-4">Are you sure you want to delete <strong>{deleting?.name}</strong>?</p>
                <div className="flex gap-3 justify-end">
                    <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="outline" className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white" onClick={handleDelete}>Delete</Button>
                </div>
            </Modal>
        </motion.div>
    );
}
