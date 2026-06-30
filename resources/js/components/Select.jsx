export default function Select({ label, error, options = [], className = '', ...props }) {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-[#1E293B] mb-1">{label}</label>}
            <select
                className={`w-full px-4 py-3 rounded-[14px] border border-gray-200 bg-white text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#C8A96B] focus:border-transparent transition-all appearance-none ${className}`}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-[#EF4444] mt-1">{error}</p>}
        </div>
    );
}
