<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\ReportService;

class ReportController extends Controller
{
    public function __construct(
        protected ReportService $reportService
    ) {}

    public function revenue(\Illuminate\Http\Request $request)
    {
        $filters = $request->only(['start_date', 'end_date']);
        return $this->success($this->reportService->revenue($filters));
    }

    public function occupancy()
    {
        return $this->success($this->reportService->occupancy());
    }

    public function bookings()
    {
        return $this->success($this->reportService->bookings());
    }

    public function guests()
    {
        return $this->success($this->reportService->guests());
    }
}