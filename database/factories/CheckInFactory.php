<?php

namespace Database\Factories;

use App\Models\CheckIn;
use App\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;

class CheckInFactory extends Factory
{
    protected $model = CheckIn::class;

    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::factory(),
            'checked_in_at' => now(),
        ];
    }
}