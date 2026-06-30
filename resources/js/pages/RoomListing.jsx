import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/Card';

export default function RoomListing() {
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        api.get('/room-types').then((res) => setRoomTypes(res.data.data?.data || res.data.data || [])).catch(() => {});
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-playfair text-4xl lg:text-5xl font-bold text-[#0F172A] text-center"
            >
                Our Rooms
            </motion.h1>
            <p className="text-center text-[#64748B] mt-4 max-w-xl mx-auto">
                Choose from our selection of premium rooms designed for your comfort.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {roomTypes.map((room, i) => (
                    <motion.div
                        key={room.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Link to={`/rooms/${room.id}`}>
                            <Card className="p-6">
                                <div className="h-48 bg-gradient-to-br from-[#C8A96B] to-[#0F172A] rounded-[16px] mb-4 flex items-center justify-center">
                                    <span className="text-white font-playfair text-lg">{room.name}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-[#1E293B]">{room.name}</h3>
                                <p className="text-[#64748B] text-sm mt-2 line-clamp-2">{room.description}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-sm text-[#64748B]">Capacity: {room.capacity} guests</span>
                                    <span className="text-lg font-bold text-[#C8A96B]">
                                        Rp {Number(room.base_price).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}