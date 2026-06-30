<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Guest;
use App\Models\Room;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function revenue(array $filters = [])
    {
        $query = Payment::where('status', 'verified')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(amount) as total'))
            ->groupBy('date')
            ->orderBy('date', 'desc');

        if (!empty($filters['start_date'])) {
            $query->whereDate('created_at', '>=', $filters['start_date']);
        }
        if (!empty($filters['end_date'])) {
            $query->whereDate('created_at', '<=', $filters['end_date']);
        }

        return [
            'data' => $query->get(),
            'total_revenue' => Payment::where('status', 'verified')->sum('amount'),
        ];
    }

    public function occupancy()
    {
        $totalRooms = Room::count();
        $occupiedRooms = Room::where('status', 'occupied')->count();
        $availableRooms = Room::where('status', 'available')->count();
        $maintenanceRooms = Room::where('status', 'maintenance')->count();

        return [
            'total_rooms' => $totalRooms,
            'occupied_rooms' => $occupiedRooms,
            'available_rooms' => $availableRooms,
            'maintenance_rooms' => $maintenanceRooms,
            'occupancy_rate' => $totalRooms > 0 ? round(($occupiedRooms / $totalRooms) * 100, 2) : 0,
        ];
    }

    public function bookings()
    {
        return [
            'total' => Reservation::count(),
            'pending' => Reservation::where('status', 'pending')->count(),
            'confirmed' => Reservation::where('status', 'confirmed')->count(),
            'checked_in' => Reservation::where('status', 'checked_in')->count(),
            'checked_out' => Reservation::where('status', 'checked_out')->count(),
            'cancelled' => Reservation::where('status', 'cancelled')->count(),
        ];
    }

    public function guests()
    {
        return [
            'total_guests' => Guest::count(),
            'new_guests' => Guest::whereDate('created_at', '>=', now()->subDays(30))->count(),
        ];
    }
}