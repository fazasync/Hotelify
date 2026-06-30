<?php

namespace Tests\Feature\Api;

use App\Models\RoomType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoomTypeTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);
    }

    public function test_can_list_room_types()
    {
        RoomType::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/room-types');

        $response->assertOk();
    }

    public function test_can_create_room_type()
    {
        $this->actingAsAdmin();
        $response = $this->postJson('/api/v1/room-types', [
            'name' => 'Deluxe Suite',
            'description' => 'A luxurious suite',
            'capacity' => 2,
            'base_price' => 500000,
        ]);

        $response->assertCreated();
    }

    public function test_can_show_room_type()
    {
        $roomType = RoomType::factory()->create();

        $response = $this->getJson("/api/v1/room-types/{$roomType->id}");

        $response->assertOk();
    }

    public function test_can_update_room_type()
    {
        $this->actingAsAdmin();
        $roomType = RoomType::factory()->create();

        $response = $this->putJson("/api/v1/room-types/{$roomType->id}", [
            'name' => 'Updated Suite',
            'capacity' => 4,
            'base_price' => 750000,
        ]);

        $response->assertOk();
    }

    public function test_can_delete_room_type()
    {
        $this->actingAsAdmin();
        $roomType = RoomType::factory()->create();

        $response = $this->deleteJson("/api/v1/room-types/{$roomType->id}");

        $response->assertOk();
    }
}