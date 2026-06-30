<?php

namespace App\Repositories;

use App\Models\Reservation;

class ReservationRepository extends BaseRepository
{
    protected array $searchable = ['booking_code'];

    public function __construct(Reservation $reservation)
    {
        parent::__construct($reservation);
    }

    public function findByBookingCode(string $code)
    {
        return $this->model->where('booking_code', $code)->first();
    }

    public function findByGuest(int $guestId)
    {
        return $this->model->where('guest_id', $guestId)->get();
    }

    public function findActiveByRoom(int $roomId)
    {
        return $this->model
            ->where('room_id', $roomId)
            ->whereIn('status', ['confirmed', 'checked_in'])
            ->first();
    }
}