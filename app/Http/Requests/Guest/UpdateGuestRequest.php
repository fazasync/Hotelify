<?php

namespace App\Http\Requests\Guest;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGuestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'unique:guests,email,' . $this->route('guest')],
            'phone' => ['nullable', 'string'],
            'identity_number' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
        ];
    }
}