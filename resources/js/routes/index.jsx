import MainLayout from '../layouts/MainLayout';
import GuestLayout from '../layouts/GuestLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthGuard from '../components/AuthGuard';
import Home from '../pages/Home';
import RoomListing from '../pages/RoomListing';
import RoomDetail from '../pages/RoomDetail';
import Facilities from '../pages/Facilities';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import Reserve from '../pages/Reserve';
import MyReservations from '../pages/MyReservations';
import Profile from '../pages/Profile';
import Overview from '../pages/admin/Overview';
import RoomManagement from '../pages/admin/RoomManagement';
import RoomTypeManagement from '../pages/admin/RoomTypeManagement';
import FacilityManagement from '../pages/admin/FacilityManagement';
import ReservationManagement from '../pages/admin/ReservationManagement';
import GuestManagement from '../pages/admin/GuestManagement';
import PaymentManagement from '../pages/admin/PaymentManagement';
import CheckInOut from '../pages/admin/CheckInOut';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';

export const publicRoutes = [
    {
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/rooms', element: <RoomListing /> },
            { path: '/rooms/:id', element: <RoomDetail /> },
            { path: '/facilities', element: <Facilities /> },
            { path: '/about', element: <About /> },
            { path: '/contact', element: <Contact /> },
            { path: '/reserve', element: <AuthGuard><Reserve /></AuthGuard> },
            { path: '/my-reservations', element: <AuthGuard><MyReservations /></AuthGuard> },
            { path: '/profile', element: <AuthGuard><Profile /></AuthGuard> },
        ],
    },
    {
        element: <GuestLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/forgot-password', element: <ForgotPassword /> },
        ],
    },
    {
        element: (
            <ProtectedRoute roles={['admin', 'receptionist', 'manager', 'owner']}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        path: '/admin',
        children: [
            { path: '', element: <Overview /> },
            { path: 'rooms', element: <RoomManagement /> },
            { path: 'room-types', element: <RoomTypeManagement /> },
            { path: 'facilities', element: <FacilityManagement /> },
            { path: 'reservations', element: <ReservationManagement /> },
            { path: 'guests', element: <GuestManagement /> },
            { path: 'payments', element: <PaymentManagement /> },
            { path: 'checkin', element: <CheckInOut type="checkin" /> },
            { path: 'checkout', element: <CheckInOut type="checkout" /> },
            { path: 'reports', element: <Reports /> },
            { path: 'settings', element: <Settings /> },
        ],
    },
];
