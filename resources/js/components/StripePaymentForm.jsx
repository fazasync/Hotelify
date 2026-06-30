import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function StripePaymentForm({ amount, onSuccess, onError }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formatPrice = (val) => `Rp ${Number(val).toLocaleString('id-ID')}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage('');

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/reservations',
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
            if (onError) onError(error);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            if (onSuccess) onSuccess(paymentIntent);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#F8FAFC] rounded-xl p-5">
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="p-4 rounded-[12px] bg-[#EF4444]/10 text-[#EF4444] text-sm text-center">
                    {errorMessage}
                </div>
            )}

            <div className="bg-[#FFF8F0] border border-[#C8A96B]/20 rounded-xl p-4">
                <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Total to Pay</span>
                    <span className="font-bold text-[#C8A96B] text-lg">{formatPrice(amount)}</span>
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full py-3 bg-[#C8A96B] text-white text-sm font-semibold rounded-xl hover:bg-[#b8954f] disabled:opacity-50 transition-all cursor-pointer"
            >
                {isProcessing ? 'Processing Payment...' : `Pay ${formatPrice(amount)}`}
            </button>
        </form>
    );
}
