<?php

namespace Tests\Feature\Api;

use App\Models\Guest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GuestTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);
    }

    public function test_can_list_guests()
    {
        $this->actingAsAdmin();
        Guest::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/guests');

        $response->assertOk();
    }

    public function test_can_create_guest()
    {
        $this->actingAsAdmin();
        $response = $this->postJson('/api/v1/guests', [
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '08123456789',
        ]);

        $response->assertCreated();
    }

    public function test_can_update_guest()
    {
        $this->actingAsAdmin();
        $guest = Guest::factory()->create();

        $response = $this->putJson("/api/v1/guests/{$guest->id}", [
            'full_name' => 'Updated Name',
        ]);

        $response->assertOk();
    }

    public function test_can_delete_guest()
    {
        $this->actingAsAdmin();
        $guest = Guest::factory()->create();

        $response = $this->deleteJson("/api/v1/guests/{$guest->id}");

        $response->assertOk();
    }
}