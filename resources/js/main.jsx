import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { publicRoutes } from './routes';

const queryClient = new QueryClient();

function App() {
    const element = useRoutes(publicRoutes);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {element}
            </AuthProvider>
        </QueryClientProvider>
    );
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);