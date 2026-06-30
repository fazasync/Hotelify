<?php

namespace App\Http\Requests\Room;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_type_id' => ['sometimes', 'exists:room_types,id'],
            'room_number' => ['sometimes', 'string', 'unique:rooms,room_number,' . $this->route('room')],
            'floor' => ['nullable', 'integer'],
            'status' => ['sometimes', 'in:available,occupied,maintenance'],
        ];
    }
}