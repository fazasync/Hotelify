import { motion } from 'framer-motion';

const galleryItems = [
    { id: 1, label: 'Grand Lobby', span: 'md:col-span-2 md:row-span-2', pattern: 'diamond' },
    { id: 2, label: 'Premium Suite', span: '', pattern: 'dots' },
    { id: 3, label: 'Fine Dining', span: '', pattern: 'lines' },
    { id: 4, label: 'Infinity Pool', span: 'md:col-span-2', pattern: 'waves' },
    { id: 5, label: 'Spa & Wellness', span: '', pattern: 'grid' },
    { id: 6, label: 'Event Hall', span: '', pattern: 'circles' },
];

const patterns = {
    diamond: 'radial-gradient(circle at 30% 50%, rgba(200,169,107,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(15,23,42,0.3) 0%, transparent 50%)',
    dots: 'radial-gradient(rgba(200,169,107,0.2) 1.5px, transparent 1.5px)',
    lines: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,169,107,0.08) 20px, rgba(200,169,107,0.08) 21px)',
    waves: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,107,0.2) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(15,23,42,0.3) 0%, transparent 60%)',
    grid: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(200,169,107,0.06) 30px, rgba(200,169,107,0.06) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(200,169,107,0.06) 30px, rgba(200,169,107,0.06) 31px)',
    circles: 'radial-gradient(circle at 20% 30%, rgba(200,169,107,0.1) 0%, transparent 30%), radial-gradient(circle at 80% 70%, rgba(200,169,107,0.08) 0%, transparent 30%)',
};

export default function GalleryGrid() {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-[#C8A96B] text-xs font-semibold uppercase tracking-[0.15em]">
                        Gallery
                    </span>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#0F172A] mt-3">
                        Our Luxurious Spaces
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[200px]">
                    {galleryItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className={'relative rounded-xl overflow-hidden group cursor-pointer ' + (item.span || '')}
                        >
                            <div
                                className="absolute inset-0 bg-[#0F172A] transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: patterns[item.pattern], backgroundSize: item.pattern === 'dots' ? '20px 20px' : 'auto' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/80 font-playfair text-sm md:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">
                                    {item.label}
                                </span>
                            </div>
                            <div className="absolute bottom-3 left-3">
                                <span className="text-white/40 text-xs font-medium">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
