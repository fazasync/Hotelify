export default function Table({ columns, data, onRowClick }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-200">
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-3 text-sm font-semibold text-[#64748B] uppercase tracking-wider">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr
                            key={row.id || i}
                            className="border-b border-gray-100 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                            onClick={() => onRowClick?.(row)}
                        >
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-3 text-sm text-[#1E293B]">
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}