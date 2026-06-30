import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../services/api';

export function useCheckAvailability(params) {
    return useQuery({
        queryKey: ['check-availability', params],
        queryFn: () => api.post('/bookings/check-availability', params).then((r) => r.data),
        enabled: !!params?.check_in && !!params?.check_out,
    });
}

export function useRoomTypes() {
    return useQuery({
        queryKey: ['room-types'],
        queryFn: () => api.get('/room-types').then((r) => r.data.data?.data || r.data.data || []),
    });
}

export function useRooms() {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: () => api.get('/rooms').then((r) => r.data.data?.data || r.data.data || []),
    });
}

export function useCreateReservation() {
    return useMutation({
        mutationFn: (data) => api.post('/bookings/reserve', data).then((r) => r.data),
    });
}
