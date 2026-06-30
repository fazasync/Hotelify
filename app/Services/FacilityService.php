<?php

namespace App\Services;

use App\Repositories\FacilityRepository;

class FacilityService
{
    public function __construct(
        protected FacilityRepository $facilityRepository
    ) {}

    public function all(array $filters = [])
    {
        return $this->facilityRepository->all();
    }

    public function paginate(array $filters = [])
    {
        return $this->facilityRepository->paginate(15, $filters);
    }

    public function find(int $id)
    {
        return $this->facilityRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->facilityRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->facilityRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->facilityRepository->delete($id);
    }
}