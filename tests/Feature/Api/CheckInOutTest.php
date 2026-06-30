<?php

namespace Tests\Feature\Api;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Guest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CheckInOutTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_check_in()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);

        $roomType = RoomType::factory()->create();
        $room = Room::factory()->create(['room_type_id' => $roomType->id, 'status' => 'available']);
        $guest = Guest::factory()->create();
        $reservation = Reservation::factory()->create([
            'guest_id' => $guest->id,
            'room_id' => $room->id,
            'status' => 'confirmed',
        ]);

        $response = $this->postJson('/api/v1/checkin', [
            'reservation_id' => $reservation->id,
        ]);

        $response->assertOk()
            ->assertJsonStructure(['success', 'message', 'data']);
    }

    public function test_can_check_out()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);

        $roomType = RoomType::factory()->create();
        $room = Room::factory()->create(['room_type_id' => $roomType->id, 'status' => 'occupied']);
        $guest = Guest::factory()->create();
        $reservation = Reservation::factory()->create([
            'guest_id' => $guest->id,
            'room_id' => $room->id,
            'status' => 'checked_in',
        ]);

        $response = $this->postJson('/api/v1/checkout', [
            'reservation_id' => $reservation->id,
        ]);

        $response->assertOk()
            ->assertJsonStructure(['success', 'message', 'data']);
    }

    public function test_checkin_requires_confirmed_reservation()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);

        $roomType = RoomType::factory()->create();
        $room = Room::factory()->create(['room_type_id' => $roomType->id]);
        $guest = Guest::factory()->create();
        $reservation = Reservation::factory()->create([
            'guest_id' => $guest->id,
            'room_id' => $room->id,
            'status' => 'pending',
        ]);

        $response = $this->postJson('/api/v1/checkin', [
            'reservation_id' => $reservation->id,
        ]);

        $response->assertStatus(422);
    }
}
