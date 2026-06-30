import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth as useAuthContext } from '../contexts/AuthContext';

export function useLogin() {
    const { setUser } = useAuthContext();
    return useMutation({
        mutationFn: (data) => api.post('/auth/login', data).then((r) => r.data),
        onSuccess: (res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (data) => api.post('/auth/register', data).then((r) => r.data),
    });
}

export function useLogout() {
    const { setUser } = useAuthContext();
    return useMutation({
        mutationFn: () => api.post('/auth/logout').then((r) => r.data),
        onSuccess: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        },
    });
}
