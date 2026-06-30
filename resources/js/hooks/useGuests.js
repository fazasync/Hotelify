import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useGuests() {
    return useQuery({
        queryKey: ['guests'],
        queryFn: () => api.get('/guests').then((r) => r.data.data),
    });
}

export function useCreateGuest() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.post('/guests', data).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['guests'] }),
    });
}

export function useUpdateGuest() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }) => api.put(`/guests/${id}`, data).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['guests'] }),
    });
}

export function useDeleteGuest() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.delete(`/guests/${id}`).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['guests'] }),
    });
}
