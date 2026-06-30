<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Payment;
use App\Models\Reservation;
use App\Mail\ReservationConfirmed;
use Illuminate\Support\Facades\Mail;

class StripeService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function createPaymentIntent(Payment $payment, Reservation $reservation): PaymentIntent
    {
        $intent = PaymentIntent::create([
            'amount' => (int) round($payment->amount * 100),
            'currency' => 'usd',
            'metadata' => [
                'payment_id' => $payment->id,
                'reservation_id' => $reservation->id,
                'booking_code' => $reservation->booking_code,
            ],
        ]);

        $payment->update([
            'stripe_payment_intent_id' => $intent->id,
        ]);

        return $intent;
    }

    public function handleWebhook(string $payload, string $sigHeader): void
    {
        $event = \Stripe\Webhook::constructEvent(
            $payload,
            $sigHeader,
            config('services.stripe.webhook_secret')
        );

        switch ($event->type) {
            case 'payment_intent.succeeded':
                $this->handlePaymentSucceeded($event->data->object);
                break;

            case 'payment_intent.payment_failed':
                $this->handlePaymentFailed($event->data->object);
                break;
        }
    }

    protected function handlePaymentSucceeded(PaymentIntent $intent): void
    {
        $payment = Payment::where('stripe_payment_intent_id', $intent->id)->first();
        if (!$payment) return;

        $payment->update([
            'status' => 'verified',
            'stripe_payment_method_id' => $intent->payment_method,
        ]);

        $reservation = $payment->reservation;
        if ($reservation) {
            $reservation->update(['status' => 'confirmed']);

            $guest = $reservation->guest;
            if ($guest && $guest->email) {
                Mail::to($guest->email)->send(new ReservationConfirmed($reservation));
            }
        }
    }

    protected function handlePaymentFailed(PaymentIntent $intent): void
    {
        $payment = Payment::where('stripe_payment_intent_id', $intent->id)->first();
        if (!$payment) return;

        $payment->update(['status' => 'failed']);
    }
}
