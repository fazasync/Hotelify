import { motion } from 'framer-motion';
import { useState } from 'react';
import api from '../services/api';
import Toast from '../components/Toast';

const contactInfo = [
    { icon: '📍', label: 'Address', value: 'Jl. Trans Kalimantan No 1. Handil Bakti' },
    { icon: '📞', label: 'Phone', value: '+62 21 1234 5678' },
    { icon: '✉️', label: 'Email', value: 'info@hotelify.com' },
    { icon: '🕐', label: 'Office Hours', value: '24 hours / 7 days' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/contact', form);
            setToast({ open: true, message: 'Message sent successfully. We will get back to you soon.', type: 'success' });
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch {
            setToast({ open: true, message: 'Failed to send message. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="pt-24">
            <Toast
                message={toast.message}
                type={toast.type}
                isOpen={toast.open}
                onClose={() => setToast({ ...toast, open: false })}
            />
            <section className="relative py-20 px-6 bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A96B] rounded-full blur-[200px]" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-playfair text-5xl lg:text-6xl font-bold text-white"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-0.5 bg-[#C8A96B] mx-auto mt-6"
                    />
                    <p className="mt-6 text-lg text-[#94A3B8] max-w-2xl mx-auto">
                        We'd love to hear from you. Reach out with any questions or requests.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#C8A96B] text-sm font-semibold uppercase tracking-[0.2em]">Get in Touch</span>
                        <h2 className="font-playfair text-4xl font-bold text-[#0F172A] mt-4">Send Us a Message</h2>
                        <div className="w-16 h-0.5 bg-[#C8A96B] mt-6" />

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#1E293B] mb-1">Name</label>
                                    <input
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#1E293B] mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1">Subject</label>
                                <input
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1E293B] mb-1">Message</label>
                                <textarea
                                    rows="5"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-[#C8A96B] text-white rounded-[14px] font-medium hover:bg-[#b8954f] transition-all cursor-pointer"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#C8A96B] text-sm font-semibold uppercase tracking-[0.2em]">Contact Info</span>
                        <h2 className="font-playfair text-4xl font-bold text-[#0F172A] mt-4">Visit Us</h2>
                        <div className="w-16 h-0.5 bg-[#C8A96B] mt-6" />

                        <div className="mt-8 space-y-6">
                            {contactInfo.map((item) => (
                                <div key={item.label} className="flex items-start gap-4 p-5 rounded-[16px] bg-[#FAF8F5]">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#64748B]">{item.label}</p>
                                        <p className="font-medium text-[#1E293B]">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 rounded-[20px] bg-gradient-to-br from-[#C8A96B] to-[#a8884f] text-center">
                            <p className="text-white font-semibold">Book Directly for Best Rates</p>
                            <p className="text-white/80 text-sm mt-1">Call us at +62 21 1234 5678</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
