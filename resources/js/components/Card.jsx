import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, ...props }) {
    return (
        <motion.div
            whileHover={hover ? { y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' } : {}}
            className={`bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}