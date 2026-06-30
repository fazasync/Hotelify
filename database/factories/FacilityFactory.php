<?php

namespace Database\Factories;

use App\Models\Facility;
use Illuminate\Database\Eloquent\Factories\Factory;

class FacilityFactory extends Factory
{
    protected $model = Facility::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement([
                'Swimming Pool', 'Restaurant', 'Gym', 'Spa', 'WiFi',
                'Parking', 'Room Service', 'Bar', 'Conference Room',
            ]),
            'icon' => null,
        ];
    }
}