<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/stripe/webhook', [\App\Http\Controllers\Api\V1\StripeController::class, 'webhook']);

    Route::prefix('auth')->group(function () {
        Route::post('/login', [\App\Http\Controllers\Api\V1\AuthController::class, 'login']);
        Route::post('/register', [\App\Http\Controllers\Api\V1\AuthController::class, 'register']);
        Route::post('/logout', [\App\Http\Controllers\Api\V1\AuthController::class, 'logout'])->middleware('auth:sanctum');
        Route::get('/me', [\App\Http\Controllers\Api\V1\AuthController::class, 'me'])->middleware('auth:sanctum');
        Route::post('/update-profile', [\App\Http\Controllers\Api\V1\AuthController::class, 'updateProfile'])->middleware('auth:sanctum');
        Route::post('/update-password', [\App\Http\Controllers\Api\V1\AuthController::class, 'updatePassword'])->middleware('auth:sanctum');
    });

    // Public read-only endpoints
    Route::post('/contact', function (\Illuminate\Http\Request $request) {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        \App\Models\Contact::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully. We will get back to you soon.'
        ]);
    });
    Route::apiResource('room-types', \App\Http\Controllers\Api\V1\RoomTypeController::class)->only(['index', 'show']);
    Route::apiResource('rooms', \App\Http\Controllers\Api\V1\RoomController::class)->only(['index', 'show']);
    Route::apiResource('facilities', \App\Http\Controllers\Api\V1\FacilityController::class)->only(['index', 'show']);
    Route::post('/bookings/check-availability', [\App\Http\Controllers\Api\V1\BookingController::class, 'checkAvailability']);
    Route::post('/bookings', [\App\Http\Controllers\Api\V1\BookingController::class, 'store']);

    // Authenticated routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/bookings/reserve', [\App\Http\Controllers\Api\V1\BookingController::class, 'reserve']);
        Route::get('/my-reservations', [\App\Http\Controllers\Api\V1\ReservationController::class, 'myReservations']);
        Route::post('/stripe/create-payment-intent', [\App\Http\Controllers\Api\V1\StripeController::class, 'createPaymentIntent']);

        // Admin/Staff routes
        Route::middleware('role:admin,receptionist,manager,owner')->group(function () {
            Route::apiResource('room-types', \App\Http\Controllers\Api\V1\RoomTypeController::class)->except(['index', 'show']);
            Route::apiResource('rooms', \App\Http\Controllers\Api\V1\RoomController::class)->except(['index', 'show']);
            Route::apiResource('guests', \App\Http\Controllers\Api\V1\GuestController::class);
            Route::get('/notifications', function() {
                return response()->json(['success' => true, 'data' => \App\Models\Notification::where('user_id', auth()->id())->latest()->take(10)->get()]);
            });
            Route::post('/notifications/{id}/read', function($id) {
                $n = \App\Models\Notification::findOrFail($id);
                $n->update(['read_at' => now()]);
                return response()->json(['success' => true, 'message' => 'Marked as read']);
            });
            Route::apiResource('reservations', \App\Http\Controllers\Api\V1\ReservationController::class)->only(['index', 'show', 'update', 'destroy']);
            Route::get('/reservations/export/csv', [\App\Http\Controllers\Api\V1\ReservationController::class, 'exportCsv']);
            Route::get('/guests/export/csv', [\App\Http\Controllers\Api\V1\GuestController::class, 'exportCsv']);
            Route::apiResource('facilities', \App\Http\Controllers\Api\V1\FacilityController::class)->except(['index', 'show']);
            Route::apiResource('payments', \App\Http\Controllers\Api\V1\PaymentController::class)->only(['index', 'show', 'store']);
            Route::post('payments/{payment}/verify', [\App\Http\Controllers\Api\V1\PaymentController::class, 'verify']);
            Route::post('/checkin', [\App\Http\Controllers\Api\V1\CheckInOutController::class, 'checkIn']);
            Route::post('/checkout', [\App\Http\Controllers\Api\V1\CheckInOutController::class, 'checkOut']);
            Route::prefix('reports')->group(function () {
                Route::get('/revenue', [\App\Http\Controllers\Api\V1\ReportController::class, 'revenue']);
                Route::get('/occupancy', [\App\Http\Controllers\Api\V1\ReportController::class, 'occupancy']);
                Route::get('/bookings', [\App\Http\Controllers\Api\V1\ReportController::class, 'bookings']);
                Route::get('/guests', [\App\Http\Controllers\Api\V1\ReportController::class, 'guests']);
            });
        });
    });
});
