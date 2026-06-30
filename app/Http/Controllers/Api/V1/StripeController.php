<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\StripeService;
use App\Models\Reservation;
use App\Models\Payment;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    public function __construct(
        protected StripeService $stripeService
    ) {}

    public function createPaymentIntent(Request $request)
    {
        $request->validate([
            'reservation_id' => ['required', 'exists:reservations,id'],
        ]);

        $reservation = Reservation::findOrFail($request->reservation_id);

        $payment = Payment::firstOrCreate(
            ['reservation_id' => $reservation->id],
            [
                'amount' => $reservation->total_price,
                'payment_method' => 'stripe',
                'status' => 'pending',
            ]
        );

        if ($payment->stripe_payment_intent_id) {
            $intent = \Stripe\PaymentIntent::retrieve($payment->stripe_payment_intent_id);
        } else {
            $intent = $this->stripeService->createPaymentIntent($payment, $reservation);
        }

        return $this->success([
            'client_secret' => $intent->client_secret,
            'payment_id' => $payment->id,
        ]);
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            $this->stripeService->handleWebhook($payload, $sigHeader);
            return response()->json(['status' => 'ok']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
