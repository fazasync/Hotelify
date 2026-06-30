import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminTopbar({ title = 'Dashboard' }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
            <h2 className="text-lg font-semibold text-[#1E293B]">{title}</h2>
            <div className="flex items-center gap-4">
                <span className="text-sm text-[#64748B]">{user?.name}</span>
                <span className="px-2 py-0.5 bg-[#C8A96B]/10 text-[#C8A96B] text-xs rounded-full font-medium capitalize">
                    {user?.role}
                </span>
                <button onClick={handleLogout} className="text-sm text-[#EF4444] hover:underline cursor-pointer">
                    Logout
                </button>
            </div>
        </header>
    );
}
