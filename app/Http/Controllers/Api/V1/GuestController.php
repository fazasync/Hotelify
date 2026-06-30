<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\StoreGuestRequest;
use App\Http\Requests\Guest\UpdateGuestRequest;
use App\Services\GuestService;
use Illuminate\Http\Request;

class GuestController extends Controller
{
    public function __construct(
        protected GuestService $guestService
    ) {}

    public function index(Request $request)
    {
        return $this->success($this->guestService->paginate($request->all()));
    }

    public function store(StoreGuestRequest $request)
    {
        $guest = $this->guestService->create($request->validated());
        return $this->success($guest, 'Guest created', 201);
    }

    public function show(int $id)
    {
        return $this->success($this->guestService->find($id));
    }

    public function update(UpdateGuestRequest $request, int $id)
    {
        $guest = $this->guestService->update($id, $request->validated());
        return $this->success($guest, 'Guest updated');
    }

    public function destroy(int $id)
    {
        $this->guestService->delete($id);
        return $this->success(null, 'Guest deleted');
    }

    public function exportCsv(Request $request)
    {
        $guests = $this->guestService->all($request->all());
        $filename = 'guests-' . now()->format('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        $callback = function () use ($guests) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Full Name', 'Email', 'Phone', 'Identity Number', 'Address', 'Created At']);

            foreach ($guests as $g) {
                fputcsv($handle, [
                    $g->full_name,
                    $g->email,
                    $g->phone,
                    $g->identity_number,
                    $g->address,
                    $g->created_at,
                ]);
            }
            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}