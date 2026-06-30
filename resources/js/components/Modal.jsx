import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, title, children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-[24px] p-6 w-full max-w-lg shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {title && (
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-[#1E293B]">{title}</h2>
                                <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] text-2xl leading-none cursor-pointer">&times;</button>
                            </div>
                        )}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}