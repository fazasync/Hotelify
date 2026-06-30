import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function usePayments() {
    return useQuery({
        queryKey: ['payments'],
        queryFn: () => api.get('/payments').then((r) => r.data.data),
    });
}

export function useCreatePayment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.post('/payments', data).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['payments'] }),
    });
}

export function useVerifyPayment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }) => api.post(`/payments/${id}/verify`, data).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['payments'] }),
    });
}
