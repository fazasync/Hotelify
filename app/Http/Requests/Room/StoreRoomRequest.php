<?php

namespace App\Http\Requests\Room;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_type_id' => ['required', 'exists:room_types,id'],
            'room_number' => ['required', 'string', 'unique:rooms,room_number'],
            'floor' => ['nullable', 'integer'],
            'status' => ['sometimes', 'in:available,occupied,maintenance'],
        ];
    }
}