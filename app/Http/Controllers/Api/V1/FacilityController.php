<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Facility\StoreFacilityRequest;
use App\Http\Requests\Facility\UpdateFacilityRequest;
use App\Services\FacilityService;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    public function __construct(
        protected FacilityService $facilityService
    ) {}

    public function index(Request $request)
    {
        return $this->success($this->facilityService->paginate($request->all()));
    }

    public function show(int $id)
    {
        return $this->success($this->facilityService->find($id));
    }

    public function store(StoreFacilityRequest $request)
    {
        $facility = $this->facilityService->create($request->validated());
        return $this->success($facility, 'Facility created', 201);
    }

    public function update(UpdateFacilityRequest $request, int $id)
    {
        $facility = $this->facilityService->update($id, $request->validated());
        return $this->success($facility, 'Facility updated');
    }

    public function destroy(int $id)
    {
        $this->facilityService->delete($id);
        return $this->success(null, 'Facility deleted');
    }
}