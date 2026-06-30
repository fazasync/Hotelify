import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RoomCard({ room, index = 0 }) {
    const gradients = [
        'from-[#C8A96B] to-[#a8884f]',
        'from-[#0F172A] to-[#1E293B]',
        'from-[#C8A96B] to-[#0F172A]',
        'from-[#1E293B] to-[#334155]',
        'from-[#a8884f] to-[#C8A96B]',
    ];
    const gradient = gradients[index % gradients.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        >
            <div className={`relative h-56 bg-gradient-to-br ${gradient} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-6xl font-playfair font-bold">{room.name?.[0] || 'R'}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    {room.capacity || `${room.max_occupancy || '?'} Guests`}
                </div>
                {room.price && (
                    <div className="absolute bottom-4 left-4">
                        <span className="text-white font-bold text-lg">Rp {Number(room.price).toLocaleString('id-ID')}</span>
                        <span className="text-white/60 text-xs ml-1">/night</span>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-[#1E293B] mb-2">{room.name}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4 line-clamp-2">{room.description || 'Luxurious room with premium amenities for a memorable stay.'}</p>
                {room.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities.slice(0, 4).map((a) => (
                            <span key={a} className="px-3 py-1 bg-[#FAF8F5] rounded-full text-xs text-[#64748B]">{a}</span>
                        ))}
                    </div>
                )}
                <Link
                    to={`/rooms/${room.id}`}
                    className="block text-center py-3 border border-[#C8A96B] text-[#C8A96B] rounded-[14px] font-medium hover:bg-[#C8A96B] hover:text-white transition-all"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
}
