<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\StorePaymentRequest;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentService $paymentService
    ) {}

    public function index(Request $request)
    {
        return $this->success($this->paymentService->paginate($request->all()));
    }

    public function store(StorePaymentRequest $request)
    {
        $payment = $this->paymentService->processPayment($request->validated());
        return $this->success($payment, 'Payment processed', 201);
    }

    public function show(int $id)
    {
        return $this->success($this->paymentService->find($id));
    }

    public function verify(int $id)
    {
        $payment = $this->paymentService->verify($id);
        return $this->success($payment, 'Payment verified');
    }
}