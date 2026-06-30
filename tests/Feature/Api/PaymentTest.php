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

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);
    }

    public function test_can_create_payment()
    {
        $this->actingAsAdmin();
        $roomType = RoomType::factory()->create();
        $room = Room::factory()->create(['room_type_id' => $roomType->id]);
        $guest = Guest::factory()->create();
        $reservation = Reservation::factory()->create([
            'guest_id' => $guest->id,
            'room_id' => $room->id,
        ]);

        $response = $this->postJson('/api/v1/payments', [
            'reservation_id' => $reservation->id,
            'amount' => 2500000,
            'payment_method' => 'credit_card',
        ]);

        $response->assertCreated()
            ->assertJsonStructure(['success', 'message', 'data']);
    }

    public function test_can_verify_payment()
    {
        $this->actingAsAdmin();
        $roomType = RoomType::factory()->create();
        $room = Room::factory()->create(['room_type_id' => $roomType->id]);
        $guest = Guest::factory()->create();
        $reservation = Reservation::factory()->create([
            'guest_id' => $guest->id,
            'room_id' => $room->id,
        ]);

        $payment = $this->postJson('/api/v1/payments', [
            'reservation_id' => $reservation->id,
            'amount' => 2500000,
        ])->json('data');

        $response = $this->postJson("/api/v1/payments/{$payment['id']}/verify");

        $response->assertOk()
            ->assertJson(['success' => true, 'message' => 'Payment verified']);
    }

    public function test_payment_requires_valid_reservation()
    {
        $this->actingAsAdmin();
        $response = $this->postJson('/api/v1/payments', [
            'reservation_id' => 999,
            'amount' => 2500000,
        ]);

        $response->assertStatus(422);
    }
}
