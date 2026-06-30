<?php

namespace Database\Factories;

use App\Models\CheckOut;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;

class CheckOutFactory extends Factory
{
    protected $model = CheckOut::class;

    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::factory(),
            'checked_out_at' => now(),
        ];
    }
}