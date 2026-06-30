const statusColors = {
    available: 'bg-[#22C55E]/10 text-[#22C55E]',
    occupied: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    maintenance: 'bg-[#EF4444]/10 text-[#EF4444]',
    pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    confirmed: 'bg-[#22C55E]/10 text-[#22C55E]',
    checked_in: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    checked_out: 'bg-[#64748B]/10 text-[#64748B]',
    cancelled: 'bg-[#EF4444]/10 text-[#EF4444]',
    verified: 'bg-[#22C55E]/10 text-[#22C55E]',
    failed: 'bg-[#EF4444]/10 text-[#EF4444]',
    refunded: 'bg-[#64748B]/10 text-[#64748B]',
};

export default function Badge({ status, children }) {
    const color = statusColors[status] || 'bg-gray-100 text-gray-600';
    return (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${color}`}>
            {children || status}
        </span>
    );
}