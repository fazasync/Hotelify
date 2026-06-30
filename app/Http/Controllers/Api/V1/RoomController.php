<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Room\StoreRoomRequest;
use App\Http\Requests\Room\UpdateRoomRequest;
use App\Services\RoomService;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function __construct(
        protected RoomService $roomService
    ) {}

    public function index(Request $request)
    {
        return $this->success($this->roomService->paginate($request->all()));
    }

    public function store(StoreRoomRequest $request)
    {
        $room = $this->roomService->create($request->validated());
        return $this->success($room, 'Room created', 201);
    }

    public function show(int $id)
    {
        return $this->success($this->roomService->find($id));
    }

    public function update(UpdateRoomRequest $request, int $id)
    {
        $room = $this->roomService->update($id, $request->validated());
        return $this->success($room, 'Room updated');
    }

    public function destroy(int $id)
    {
        $this->roomService->delete($id);
        return $this->success(null, 'Room deleted');
    }
}