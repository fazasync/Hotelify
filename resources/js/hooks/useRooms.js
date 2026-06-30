import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useRoomTypes() {
    return useQuery({
        queryKey: ['room-types'],
        queryFn: () => api.get('/room-types').then((r) => r.data.data),
    });
}

export function useRoomType(id) {
    return useQuery({
        queryKey: ['room-type', id],
        queryFn: () => api.get(`/room-types/${id}`).then((r) => r.data.data),
        enabled: !!id,
    });
}

export function useCreateRoomType() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.post('/room-types', data).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['room-types'] }),
    });
}

export function useRooms() {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: () => api.get('/rooms').then((r) => r.data.data),
    });
}

export function useRoom(id) {
    return useQuery({
        queryKey: ['room', id],
        queryFn: () => api.get(`/rooms/${id}`).then((r) => r.data.data),
        enabled: !!id,
    });
}

export function useCreateRoom() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api.post('/rooms', data).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['rooms'] }),
    });
}

export function useFacilities() {
    return useQuery({
        queryKey: ['facilities'],
        queryFn: () => api.get('/facilities').then((r) => r.data.data),
    });
}
