<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomType\StoreRoomTypeRequest;
use App\Http\Requests\RoomType\UpdateRoomTypeRequest;
use App\Services\RoomTypeService;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{
    public function __construct(
        protected RoomTypeService $roomTypeService
    ) {}

    public function index(Request $request)
    {
        return $this->success($this->roomTypeService->paginate($request->all()));
    }

    public function store(StoreRoomTypeRequest $request)
    {
        $roomType = $this->roomTypeService->create($request->validated());
        return $this->success($roomType, 'Room type created', 201);
    }

    public function show(int $id)
    {
        return $this->success($this->roomTypeService->find($id));
    }

    public function update(UpdateRoomTypeRequest $request, int $id)
    {
        $roomType = $this->roomTypeService->update($id, $request->validated());
        return $this->success($roomType, 'Room type updated');
    }

    public function destroy(int $id)
    {
        $this->roomTypeService->delete($id);
        return $this->success(null, 'Room type deleted');
    }
}