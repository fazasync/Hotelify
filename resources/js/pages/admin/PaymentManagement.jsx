import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import Button from '../../components/Button';

export default function PaymentManagement() {
    const [payments, setPayments] = useState([]);

    const fetchPayments = () => {
        api.get('/payments').then((res) => setPayments(res.data.data?.data || res.data.data || [])).catch(() => {});
    };

    useEffect(() => { fetchPayments(); }, []);

    const verifyPayment = async (id) => {
        try {
            await api.post(`/payments/${id}/verify`);
            fetchPayments();
        } catch {}
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'reservation_id', label: 'Reservation' },
        { key: 'amount', label: 'Amount', render: (row) => `Rp ${Number(row.amount).toLocaleString('id-ID')}` },
        { key: 'payment_method', label: 'Method' },
        { key: 'status', label: 'Status', render: (row) => <Badge status={row.status}>{row.status}</Badge> },
        {
            key: 'actions', label: 'Actions',
            render: (row) => row.status === 'pending' ? (
                <Button onClick={() => verifyPayment(row.id)} className="!py-1 !px-3 !text-xs">Verify</Button>
            ) : null,
        },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-[#1E293B] mb-6">Payment Management</h1>
            <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <Table columns={columns} data={payments} />
            </div>
        </motion.div>
    );
}