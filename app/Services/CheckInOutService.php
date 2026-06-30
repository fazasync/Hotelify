<?php

namespace App\Services;

use App\Models\CheckIn;
use App\Models\CheckOut;
use App\Repositories\ReservationRepository;
use App\Repositories\RoomRepository;

class CheckInOutService
{
    public function __construct(
        protected ReservationRepository $reservationRepository,
        protected RoomRepository $roomRepository
    ) {}

    public function checkIn(int $reservationId)
    {
        $reservation = $this->reservationRepository->find($reservationId);

        if ($reservation->status !== 'confirmed') {
            throw new \Exception('Reservation must be confirmed before check-in');
        }

        $checkIn = CheckIn::create([
            'reservation_id' => $reservation->id,
            'checked_in_at' => now(),
        ]);

        $reservation->update(['status' => 'checked_in']);
        $this->roomRepository->update($reservation->room_id, ['status' => 'occupied']);

        return $checkIn->load('reservation.room');
    }

    public function checkOut(int $reservationId)
    {
        $reservation = $this->reservationRepository->find($reservationId);

        if ($reservation->status !== 'checked_in') {
            throw new \Exception('Reservation must be checked in before check-out');
        }

        $checkOut = CheckOut::create([
            'reservation_id' => $reservation->id,
            'checked_out_at' => now(),
        ]);

        $reservation->update(['status' => 'checked_out']);
        $this->roomRepository->update($reservation->room_id, ['status' => 'available']);

        return $checkOut->load('reservation.room');
    }
}