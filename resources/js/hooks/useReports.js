import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useRevenueReport(params = {}) {
    return useQuery({
        queryKey: ['report-revenue', params],
        queryFn: () => api.get('/reports/revenue', { params }).then((r) => r.data.data),
    });
}

export function useOccupancyReport(params = {}) {
    return useQuery({
        queryKey: ['report-occupancy', params],
        queryFn: () => api.get('/reports/occupancy', { params }).then((r) => r.data.data),
    });
}

export function useBookingsReport(params = {}) {
    return useQuery({
        queryKey: ['report-bookings', params],
        queryFn: () => api.get('/reports/bookings', { params }).then((r) => r.data.data),
    });
}

export function useGuestsReport(params = {}) {
    return useQuery({
        queryKey: ['report-guests', params],
        queryFn: () => api.get('/reports/guests', { params }).then((r) => r.data.data),
    });
}
