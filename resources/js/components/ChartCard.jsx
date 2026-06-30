import { motion } from 'framer-motion';

export default function ChartCard({ title, value, subtitle, icon, color = 'gold', children, className = '' }) {
    const colors = {
        gold: 'from-[#C8A96B] to-[#a8884f]',
        blue: 'from-[#3B82F6] to-[#2563EB]',
        green: 'from-[#22C55E] to-[#16A34A]',
        purple: 'from-[#8B5CF6] to-[#7C3AED]',
        red: 'from-[#EF4444] to-[#DC2626]',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 ${className}`}
        >
            {value && (
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm text-[#64748B]">{title}</p>
                        <p className="text-2xl font-bold text-[#1E293B] mt-1">{value}</p>
                        {subtitle && <p className="text-xs text-[#94A3B8] mt-1">{subtitle}</p>}
                    </div>
                    {icon && (
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white text-xl`}>
                            {icon}
                        </div>
                    )}
                </div>
            )}
            {children}
        </motion.div>
    );
}
