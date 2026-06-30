<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'identity_number',
        'address',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
