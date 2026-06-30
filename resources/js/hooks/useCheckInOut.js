import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useCheckIn() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.post('/checkin', data).then((r) => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['reservations'] });
            qc.invalidateQueries({ queryKey: ['rooms'] });
        },
    });
}

export function useCheckOut() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.post('/checkout', data).then((r) => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['reservations'] });
            qc.invalidateQueries({ queryKey: ['rooms'] });
        },
    });
}
