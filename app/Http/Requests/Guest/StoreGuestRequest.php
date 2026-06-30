<?php

namespace App\Http\Requests\Guest;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:guests,email'],
            'phone' => ['nullable', 'string'],
            'identity_number' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
        ];
    }
}