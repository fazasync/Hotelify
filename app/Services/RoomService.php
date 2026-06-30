<?php

namespace App\Services;

use App\Repositories\RoomRepository;

class RoomService
{
    public function __construct(
        protected RoomRepository $roomRepository
    ) {}

    public function all(array $filters = [])
    {
        return $this->roomRepository->with(['roomType', 'images'])->all();
    }

    public function paginate(array $filters = [])
    {
        return $this->roomRepository->with(['roomType', 'images'])->paginate(15, $filters);
    }

    public function find(int $id)
    {
        return $this->roomRepository->find($id)->load(['roomType', 'images', 'facilities']);
    }

    public function create(array $data)
    {
        return $this->roomRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->roomRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->roomRepository->delete($id);
    }

    public function findAvailable()
    {
        return $this->roomRepository->findAvailable()->load('roomType');
    }
}