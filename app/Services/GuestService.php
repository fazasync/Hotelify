<?php

namespace App\Services;

use App\Repositories\GuestRepository;

class GuestService
{
    public function __construct(
        protected GuestRepository $guestRepository
    ) {}

    public function all(array $filters = [])
    {
        return $this->guestRepository->all();
    }

    public function paginate(array $filters = [])
    {
        return $this->guestRepository->paginate(15, $filters);
    }

    public function find(int $id)
    {
        return $this->guestRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->guestRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->guestRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->guestRepository->delete($id);
    }
}