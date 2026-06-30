import { loadStripe } from '@stripe/stripe-js';

let stripePromise = null;

export function getStripe() {
    const key = import.meta.env.VITE_STRIPE_KEY;
    if (!stripePromise && key) {
        stripePromise = loadStripe(key);
    }
    return stripePromise;
}
