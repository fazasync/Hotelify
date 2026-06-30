<?php

namespace Database\Factories;

use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReportFactory extends Factory
{
    protected $model = Report::class;

    public function definition(): array
    {
        return [
            'report_type' => fake()->randomElement(['revenue', 'occupancy', 'booking', 'guest']),
            'generated_by' => User::factory(),
        ];
    }
}