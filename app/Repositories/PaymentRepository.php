<?php

namespace App\Repositories;

use App\Models\Payment;

class PaymentRepository extends BaseRepository
{
    protected array $searchable = ['method', 'status'];

    public function __construct(Payment $payment)
    {
        parent::__construct($payment);
    }

    public function findByReservation(int $reservationId)
    {
        return $this->model->where('reservation_id', $reservationId)->first();
    }
}