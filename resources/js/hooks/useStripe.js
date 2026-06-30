import { useMutation } from '@tanstack/react-query';
import api from '../services/api';

export function useCreatePaymentIntent() {
    return useMutation({
        mutationFn: (reservationId) =>
            api.post('/stripe/create-payment-intent', { reservation_id: reservationId }).then((r) => r.data.data),
    });
}
