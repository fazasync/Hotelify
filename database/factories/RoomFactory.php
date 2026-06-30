<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition(): array
    {
        return [
            'room_type_id' => RoomType::factory(),
            'room_number' => fake()->unique()->bothify('##'),
            'floor' => fake()->numberBetween(1, 10),
            'status' => fake()->randomElement(['available', 'occupied', 'maintenance']),
        ];
    }
}