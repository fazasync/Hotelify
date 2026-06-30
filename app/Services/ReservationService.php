<?php

namespace App\Services;

use App\Repositories\ReservationRepository;
use App\Repositories\RoomRepository;

class ReservationService
{
    public function __construct(
        protected ReservationRepository $reservationRepository,
        protected RoomRepository $roomRepository
    ) {}

    public function all(array $filters = [])
    {
        return $this->reservationRepository->all();
    }

    public function paginate(array $filters = [])
    {
        return $this->reservationRepository->paginate(15, $filters);
    }

    public function find(int $id)
    {
        return $this->reservationRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->reservationRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->reservationRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->reservationRepository->delete($id);
    }

    public function findByGuest(int $guestId)
    {
        return $this->reservationRepository->findByGuest($guestId);
    }

    public function findByGuestPaginate(int $guestId, array $filters = [])
    {
        $paginator = $this->reservationRepository->paginate(15, $filters);
        $paginator->setCollection(
            $paginator->getCollection()->filter(fn($r) => $r->guest_id === $guestId)->values()
        );
        return $paginator;
    }
}