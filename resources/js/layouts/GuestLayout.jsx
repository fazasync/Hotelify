import { Outlet } from 'react-router-dom';

export default function GuestLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] to-white">
            <main>
                <Outlet />
            </main>
        </div>
    );
}
