<?php

namespace App\Repositories;

use App\Models\Room;

class RoomRepository extends BaseRepository
{
    protected array $searchable = ['room_number'];

    public function __construct(Room $room)
    {
        parent::__construct($room);
    }

    public function findAvailable()
    {
        return $this->model->where('status', 'available')->get();
    }

    public function findByRoomType(int $roomTypeId)
    {
        return $this->model->where('room_type_id', $roomTypeId)
            ->where('status', 'available')
            ->get();
    }
}