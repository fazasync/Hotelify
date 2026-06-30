import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const base = 'px-6 py-3 rounded-[16px] font-medium transition-all duration-200 disabled:opacity-50 cursor-pointer';
    const variants = {
        primary: 'bg-[#C8A96B] text-white hover:bg-[#b8954f]',
        secondary: 'bg-[#0F172A] text-white hover:bg-[#1e293b]',
        outline: 'border-2 border-[#C8A96B] text-[#C8A96B] hover:bg-[#C8A96B] hover:text-white',
        ghost: 'text-[#64748B] hover:text-[#1E293B]',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}