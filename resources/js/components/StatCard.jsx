import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon, color = '#C8A96B' }) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-[#64748B]">{title}</p>
                    <p className="text-3xl font-bold text-[#1E293B] mt-1">{value}</p>
                </div>
                {icon && (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20`, color }}>
                        {icon}
                    </div>
                )}
            </div>
        </motion.div>
    );
}