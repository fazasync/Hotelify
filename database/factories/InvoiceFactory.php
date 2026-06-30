<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::factory(),
            'invoice_number' => 'INV-' . strtoupper(fake()->unique()->bothify('####??')),
            'total' => fake()->randomFloat(2, 200000, 10000000),
        ];
    }
}