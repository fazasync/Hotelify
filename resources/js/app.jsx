import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { publicRoutes } from './routes';

export default function App() {
    const element = useRoutes(publicRoutes);

    return (
        <AuthProvider>
            {element}
        </AuthProvider>
    );
}