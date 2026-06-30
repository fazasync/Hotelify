<?php

namespace App\Services;

use App\Models\Guest;
use App\Models\Reservation;
use App\Repositories\GuestRepository;
use App\Repositories\ReservationRepository;
use App\Repositories\RoomRepository;
use Illuminate\Support\Str;

class BookingService
{
    public function __construct(
        protected ReservationRepository $reservationRepository,
        protected RoomRepository $roomRepository,
        protected GuestRepository $guestRepository
    ) {}

    public function checkAvailability(array $data): array
    {
        $roomTypeId = $data['room_type_id'] ?? null;
        $checkIn = $data['check_in'];
        $checkOut = $data['check_out'];

        $rooms = $roomTypeId
            ? $this->roomRepository->findByRoomType($roomTypeId)
            : $this->roomRepository->findAvailable();

        $available = $rooms->filter(function ($room) use ($checkIn, $checkOut) {
            $conflicting = $this->reservationRepository->findActiveByRoom($room->id);
            if (!$conflicting) return true;

            return $checkOut <= $conflicting->check_in || $checkIn >= $conflicting->check_out;
        });

        return [
            'available_rooms' => $available->load('roomType'),
            'check_in' => $checkIn,
            'check_out' => $checkOut,
        ];
    }

    public function createBooking(array $data): Reservation
    {
        $data['booking_code'] = 'HTL-' . strtoupper(Str::random(8));
        $data['status'] = 'confirmed';

        $reservation = $this->reservationRepository->create($data);

        $this->roomRepository->update($data['room_id'], ['status' => 'occupied']);

        return $reservation;
    }

    public function makeReservation(array $data): Reservation
    {
        $guest = $this->guestRepository->findByEmail($data['guest_email']);
        if (!$guest) {
            $guest = $this->guestRepository->create([
                'full_name' => $data['guest_name'],
                'email' => $data['guest_email'],
                'phone' => $data['guest_phone'] ?? null,
                'address' => $data['guest_address'] ?? null,
            ]);
        }

        $data['guest_id'] = $guest->id;
        $data['booking_code'] = 'HTL-' . strtoupper(Str::random(8));
        $data['status'] = 'pending';

        $reservation = $this->reservationRepository->create([
            'guest_id' => $data['guest_id'],
            'room_id' => $data['room_id'],
            'booking_code' => $data['booking_code'],
            'check_in' => $data['check_in'],
            'check_out' => $data['check_out'],
            'total_price' => $data['total_price'],
            'status' => $data['status'],
        ]);

        return $reservation;
    }


}