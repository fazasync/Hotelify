import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Settings() {
    const [settings, setSettings] = useState({
        hotel_name: 'Hotelify',
        address: 'Jl. Hotelify No. 1, Jakarta',
        phone: '+62 21 1234 5678',
        email: 'info@hotelify.com',
        check_in_time: '14:00',
        check_out_time: '12:00',
        currency: 'IDR',
        tax_rate: '11',
    });
    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1E293B]">Hotel Settings</h1>
                <p className="text-[#64748B] mt-1">Manage your hotel configuration</p>
            </div>

            <form onSubmit={handleSave} className="max-w-2xl space-y-6">
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                    <h2 className="font-semibold text-lg text-[#1E293B] mb-4">General Information</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-[#1E293B] mb-1">Hotel Name</label>
                            <input
                                value={settings.hotel_name}
                                onChange={(e) => setSettings({ ...settings, hotel_name: e.target.value })}
                                className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1E293B] mb-1">Currency</label>
                            <select
                                value={settings.currency}
                                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            >
                                <option value="IDR">IDR (Rp)</option>
                                <option value="USD">USD ($)</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#1E293B] mb-1">Address</label>
                            <input
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1E293B] mb-1">Phone</label>
                            <input
                                value={settings.phone}
                                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1E293B] mb-1">Email</label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                    <h2 className="font-semibold text-lg text-[#1E293B] mb-4">Check-In / Check-Out</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-[#1E293B] mb-1">Check-In Time</label>
                            <input
                                type="time"
                                value={settings.check_in_time}
                                onChange={(e) => setSettings({ ...settings, check_in_time: e.target.value })}
                                className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1E293B] mb-1">Check-Out Time</label>
                            <input
                                type="time"
                                value={settings.check_out_time}
                                onChange={(e) => setSettings({ ...settings, check_out_time: e.target.value })}
                                className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                    <h2 className="font-semibold text-lg text-[#1E293B] mb-4">Tax & Fees</h2>
                    <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-1">Tax Rate (%)</label>
                        <input
                            type="number"
                            value={settings.tax_rate}
                            onChange={(e) => setSettings({ ...settings, tax_rate: e.target.value })}
                            className="w-full px-4 py-3 rounded-[14px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C8A96B] transition-all max-w-xs"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`px-8 py-3 rounded-[14px] font-medium transition-all cursor-pointer ${saved ? 'bg-[#22C55E] text-white' : 'bg-[#C8A96B] text-white hover:bg-[#b8954f]'}`}
                >
                    {saved ? 'Saved! ✓' : 'Save Settings'}
                </button>
            </form>
        </motion.div>
    );
}
