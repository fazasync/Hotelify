import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Button from '../components/Button';

export default function RoomDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        api.get(`/room-types/${id}`).then((res) => setRoom(res.data.data)).catch(() => {});
    }, [id]);

    if (!room) return <div className="text-center py-20 text-[#64748B]">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="h-[400px] bg-gradient-to-br from-[#C8A96B] to-[#0F172A] rounded-[24px] mb-8 flex items-center justify-center">
                    <h1 className="text-white font-playfair text-5xl">{room.name}</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold text-[#1E293B]">{room.name}</h2>
                        <p className="text-[#64748B] mt-4">{room.description}</p>
                        <div className="flex gap-6 mt-6">
                            <div className="bg-[#F1F5F9] px-4 py-3 rounded-[14px]">
                                <p className="text-sm text-[#64748B]">Capacity</p>
                                <p className="font-semibold text-[#1E293B]">{room.capacity} guests</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] h-fit sticky top-6">
                        <p className="text-3xl font-bold text-[#C8A96B]">
                            Rp {Number(room.base_price).toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm text-[#64748B]">per night</p>
                        <Button className="w-full mt-6" onClick={() => navigate(`/reserve?room_type_id=${id}`)}>Reserve Now</Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}