import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
    const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

    return (
        <div className="flex flex-col items-center justify-center gap-3 py-12">
            <motion.div
                className={`${sizes[size]} border-3 border-[#C8A96B]/20 border-t-[#C8A96B] rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-sm text-[#64748B]">{text}</p>
        </div>
    );
}
