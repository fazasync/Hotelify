<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckIn extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'checked_in_at',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
