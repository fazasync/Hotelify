<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\CheckInOutService;

class CheckInOutController extends Controller
{
    public function __construct(
        protected CheckInOutService $checkInOutService
    ) {}

    public function checkIn(\Illuminate\Http\Request $request)
    {
        $request->validate(['reservation_id' => ['required', 'exists:reservations,id']]);

        try {
            $checkIn = $this->checkInOutService->checkIn($request->reservation_id);
            return $this->success($checkIn, 'Check-in successful');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 422);
        }
    }

    public function checkOut(\Illuminate\Http\Request $request)
    {
        $request->validate(['reservation_id' => ['required', 'exists:reservations,id']]);

        try {
            $checkOut = $this->checkInOutService->checkOut($request->reservation_id);
            return $this->success($checkOut, 'Check-out successful');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 422);
        }
    }
}