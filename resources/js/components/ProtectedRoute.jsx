import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, roles = [] }) {
    const { user, loading } = useAuth();

    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
                <div className="w-8 h-8 border-3 border-[#C8A96B]/20 border-t-[#C8A96B] rounded-full animate-spin" />
            </div>
        );
    }

    if (!user && !loading) {
        return <Navigate to="/login" replace />;
    }

    if (user && roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
