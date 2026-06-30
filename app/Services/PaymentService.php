<?php

namespace App\Services;

use App\Repositories\PaymentRepository;
use App\Repositories\ReservationRepository;
use App\Models\Invoice;
use Illuminate\Support\Str;

class PaymentService
{
    public function __construct(
        protected PaymentRepository $paymentRepository,
        protected ReservationRepository $reservationRepository
    ) {}

    public function all(array $filters = [])
    {
        return $this->paymentRepository->all();
    }

    public function paginate(array $filters = [])
    {
        return $this->paymentRepository->paginate(15, $filters);
    }

    public function find(int $id)
    {
        return $this->paymentRepository->find($id);
    }

    public function processPayment(array $data)
    {
        $payment = $this->paymentRepository->create($data);

        $reservation = $this->reservationRepository->find($data['reservation_id']);
        $reservation->update(['status' => 'confirmed']);

        Invoice::create([
            'reservation_id' => $reservation->id,
            'invoice_number' => 'INV-' . strtoupper(Str::random(8)),
            'total' => $reservation->total_price,
        ]);

        return $payment->load('reservation');
    }

    public function verify(int $id)
    {
        $payment = $this->paymentRepository->find($id);
        $payment->update(['status' => 'verified']);
        return $payment;
    }
}