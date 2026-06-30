export default function Input({ label, error, className = '', ...props }) {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-[#1E293B] mb-1">{label}</label>}
            <input
                className={`w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#C8A96B] focus:border-transparent transition-all ${className}`}
                {...props}
            />
            {error && <p className="text-sm text-[#EF4444] mt-1">{error}</p>}
        </div>
    );
}