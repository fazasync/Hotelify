<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'amount',
        'payment_method',
        'status',
        'stripe_payment_intent_id',
        'stripe_payment_method_id',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
