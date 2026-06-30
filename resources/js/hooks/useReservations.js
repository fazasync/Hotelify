import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useReservations() {
    return useQuery({
        queryKey: ['reservations'],
        queryFn: () => api.get('/reservations').then((r) => r.data.data),
    });
}

export function useCreateReservation() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.post('/reservations', data).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['reservations'] }),
    });
}

export function useCheckAvailability() {
    return useMutation({
        mutationFn: (params) => api.post('/bookings/check-availability', params).then((r) => r.data),
    });
}

export function useCreateBooking() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.post('/bookings', data).then((r) => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['reservations'] });
            qc.invalidateQueries({ queryKey: ['rooms'] });
        },
    });
}
