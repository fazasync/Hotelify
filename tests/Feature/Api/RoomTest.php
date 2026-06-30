<?php

namespace Tests\Feature\Api;

use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoomTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);
    }

    public function test_can_list_rooms()
    {
        RoomType::factory()->create();
        Room::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/rooms');

        $response->assertOk();
    }

    public function test_can_create_room()
    {
        $this->actingAsAdmin();
        $roomType = RoomType::factory()->create();

        $response = $this->postJson('/api/v1/rooms', [
            'room_type_id' => $roomType->id,
            'room_number' => '101',
            'floor' => 1,
        ]);

        $response->assertCreated();
    }

    public function test_can_show_room()
    {
        $roomType = RoomType::factory()->create();
        $room = Room::factory()->create();

        $response = $this->getJson("/api/v1/rooms/{$room->id}");

        $response->assertOk();
    }

    public function test_cannot_create_duplicate_room_number()
    {
        $this->actingAsAdmin();
        $roomType = RoomType::factory()->create();
        Room::factory()->create(['room_number' => '101']);

        $response = $this->postJson('/api/v1/rooms', [
            'room_type_id' => $roomType->id,
            'room_number' => '101',
            'floor' => 1,
        ]);

        $response->assertStatus(422);
    }
}