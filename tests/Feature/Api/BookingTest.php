<?php

namespace Tests\Feature\Api;

use App\Models\Guest;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_check_availability()
    {
        $roomType = RoomType::factory()->create();
        Room::factory()->create(['room_type_id' => $roomType->id]);

        $response = $this->postJson('/api/v1/bookings/check-availability', [
            'room_type_id' => $roomType->id,
            'check_in' => now()->addDay()->format('Y-m-d'),
            'check_out' => now()->addDays(3)->format('Y-m-d'),
        ]);

        $response->assertOk();
    }

    public function test_can_create_booking()
    {
        $roomType = RoomType::factory()->create();
        $room = Room::factory()->create(['room_type_id' => $roomType->id]);
        $guest = Guest::factory()->create();

        $response = $this->postJson('/api/v1/bookings', [
            'guest_id' => $guest->id,
            'room_id' => $room->id,
            'check_in' => now()->addDay()->format('Y-m-d'),
            'check_out' => now()->addDays(3)->format('Y-m-d'),
            'total_price' => 1500000,
        ]);

        $response->assertCreated();
    }
}