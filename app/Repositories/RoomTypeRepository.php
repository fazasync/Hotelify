<?php

namespace App\Repositories;

use App\Models\RoomType;

class RoomTypeRepository extends BaseRepository
{
    protected array $searchable = ['name', 'description'];

    public function __construct(RoomType $roomType)
    {
        parent::__construct($roomType);
    }

    public function findBySlug(string $slug)
    {
        return $this->model->where('slug', $slug)->first();
    }
}