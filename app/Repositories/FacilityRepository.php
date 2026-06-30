<?php

namespace App\Repositories;

use App\Models\Facility;

class FacilityRepository extends BaseRepository
{
    protected array $searchable = ['name'];

    public function __construct(Facility $facility)
    {
        parent::__construct($facility);
    }
}