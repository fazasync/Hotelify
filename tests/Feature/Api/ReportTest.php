<?php

namespace Tests\Feature\Api;

use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);
    }

    public function test_can_get_occupancy_report()
    {
        $this->actingAsAdmin();
        $roomType = RoomType::factory()->create();
        Room::factory()->count(5)->create(['room_type_id' => $roomType->id]);

        $response = $this->getJson('/api/v1/reports/occupancy');

        $response->assertOk()
            ->assertJsonStructure(['success', 'data' => ['total_rooms', 'occupied_rooms', 'available_rooms', 'occupancy_rate']]);
    }

    public function test_can_get_bookings_report()
    {
        $this->actingAsAdmin();
        $response = $this->getJson('/api/v1/reports/bookings');

        $response->assertOk();
    }

    public function test_can_get_revenue_report()
    {
        $this->actingAsAdmin();
        $response = $this->getJson('/api/v1/reports/revenue');

        $response->assertOk();
    }
}