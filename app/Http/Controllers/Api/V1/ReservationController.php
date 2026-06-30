<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StoreReservationRequest;
use App\Http\Requests\Reservation\UpdateReservationRequest;
use App\Services\ReservationService;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function __construct(
        protected ReservationService $reservationService
    ) {}

    public function index(Request $request)
    {
        return $this->success($this->reservationService->paginate($request->all()));
    }

    public function myReservations(Request $request)
    {
        $guest = \App\Models\Guest::where('email', auth()->user()->email)->first();
        if (!$guest) {
            return $this->success([]);
        }
        return $this->success($this->reservationService->findByGuestPaginate($guest->id, $request->all()));
    }

    public function store(StoreReservationRequest $request)
    {
        $reservation = $this->reservationService->create($request->validated());
        return $this->success($reservation, 'Reservation created', 201);
    }

    public function show(int $id)
    {
        return $this->success($this->reservationService->find($id));
    }

    public function update(UpdateReservationRequest $request, int $id)
    {
        $reservation = $this->reservationService->update($id, $request->validated());
        return $this->success($reservation, 'Reservation updated');
    }

    public function destroy(int $id)
    {
        $this->reservationService->delete($id);
        return $this->success(null, 'Reservation deleted');
    }

    public function exportCsv(Request $request)
    {
        $reservations = $this->reservationService->all($request->all());
        $filename = 'reservations-' . now()->format('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        $callback = function () use ($reservations) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Booking Code', 'Guest Name', 'Guest Email', 'Room', 'Check In', 'Check Out', 'Total Price', 'Status', 'Created At']);

            foreach ($reservations as $r) {
                fputcsv($handle, [
                    $r->booking_code,
                    $r->guest?->full_name ?? 'N/A',
                    $r->guest?->email ?? 'N/A',
                    $r->room?->room_number ?? 'N/A',
                    $r->check_in,
                    $r->check_out,
                    $r->total_price,
                    $r->status,
                    $r->created_at,
                ]);
            }
            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}