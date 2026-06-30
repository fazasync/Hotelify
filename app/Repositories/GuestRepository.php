<?php

namespace App\Repositories;

use App\Models\Guest;

class GuestRepository extends BaseRepository
{
    protected array $searchable = ['full_name', 'email', 'phone'];

    public function __construct(Guest $guest)
    {
        parent::__construct($guest);
    }

    public function findByEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }
}