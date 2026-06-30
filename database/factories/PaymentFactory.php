<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::factory(),
            'amount' => fake()->randomFloat(2, 200000, 10000000),
            'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'cash', 'e_wallet']),
            'status' => fake()->randomElement(['pending', 'verified', 'failed', 'refunded']),
        ];
    }
}