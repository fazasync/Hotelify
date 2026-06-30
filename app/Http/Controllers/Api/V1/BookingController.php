<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\BookingService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(
        protected BookingService $bookingService
    ) {}

    public function checkAvailability(\Illuminate\Http\Request $request)
    {
        $request->validate([
            'room_type_id' => ['nullable', 'exists:room_types,id'],
            'check_in' => ['required', 'date', 'after_or_equal:today'],
            'check_out' => ['required', 'date', 'after:check_in'],
        ]);

        $result = $this->bookingService->checkAvailability($request->all());

        return $this->success($result);
    }

    public function store(Request $request)
    {
        $request->validate([
            'guest_id' => ['required', 'exists:guests,id'],
            'room_id' => ['required', 'exists:rooms,id'],
            'check_in' => ['required', 'date'],
            'check_out' => ['required', 'date', 'after:check_in'],
            'total_price' => ['required', 'numeric', 'min:0'],
        ]);

        $booking = $this->bookingService->createBooking($request->all());

        return $this->success($booking, 'Booking created', 201);
    }

    public function reserve(Request $request)
    {
        $request->validate([
            'room_id' => ['required', 'exists:rooms,id'],
            'check_in' => ['required', 'date', 'after:today'],
            'check_out' => ['required', 'date', 'after:check_in'],
            'total_price' => ['required', 'numeric', 'min:0'],
            'guest_name' => ['required', 'string', 'max:255'],
            'guest_email' => ['required', 'email'],
            'guest_phone' => ['nullable', 'string', 'max:20'],
            'guest_address' => ['nullable', 'string', 'max:500'],
        ]);

        $booking = $this->bookingService->makeReservation($request->all());

        return $this->success($booking, 'Reservation created successfully', 201);
    }
}