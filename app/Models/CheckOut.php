<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckOut extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'checked_out_at',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
