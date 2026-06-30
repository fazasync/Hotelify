<?php

namespace App\Services;

use App\Repositories\RoomTypeRepository;

class RoomTypeService
{
    public function __construct(
        protected RoomTypeRepository $roomTypeRepository
    ) {}

    public function all(array $filters = [])
    {
        return $this->roomTypeRepository->all();
    }

    public function paginate(array $filters = [])
    {
        return $this->roomTypeRepository->paginate(15, $filters);
    }

    public function find(int $id)
    {
        return $this->roomTypeRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->roomTypeRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->roomTypeRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->roomTypeRepository->delete($id);
    }
}