<?php

namespace Database\Seeders;

use App\Models\Facility;
use App\Models\RoomType;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@hotelify.test',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Receptionist',
            'email' => 'receptionist@hotelify.test',
            'password' => bcrypt('password'),
            'role' => 'receptionist',
        ]);

        User::factory()->create([
            'name' => 'Manager',
            'email' => 'manager@hotelify.test',
            'password' => bcrypt('password'),
            'role' => 'manager',
        ]);

        User::factory()->create([
            'name' => 'Owner',
            'email' => 'owner@hotelify.test',
            'password' => bcrypt('password'),
            'role' => 'owner',
        ]);

        $roomTypes = ['Deluxe', 'Superior', 'Suite', 'Standard', 'Presidential Suite'];
        foreach ($roomTypes as $name) {
            RoomType::factory()->create(['name' => $name]);
        }

        $facilities = ['Swimming Pool', 'Restaurant', 'Gym', 'Spa', 'WiFi', 'Parking', 'Room Service', 'Bar', 'Conference Room'];
        foreach ($facilities as $name) {
            Facility::factory()->create(['name' => $name]);
        }

        if (Setting::count() === 0) {
            Setting::factory()->create();
        }
    }
}
