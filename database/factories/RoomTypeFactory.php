<?php

namespace Database\Factories;

use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomTypeFactory extends Factory
{
    protected $model = RoomType::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement(['Deluxe', 'Superior', 'Suite', 'Standard', 'Presidential Suite', 'Family Room']),
            'description' => fake()->sentence(),
            'capacity' => fake()->numberBetween(1, 6),
            'base_price' => fake()->randomFloat(2, 200000, 5000000),
        ];
    }
}