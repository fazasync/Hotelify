<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());

        return $this->success($result, 'Login successful');
    }

    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register($request->validated());

        return $this->success($result, 'Registration successful', 201);
    }

    public function logout()
    {
        $this->authService->logout(auth()->user());

        return $this->success(null, 'Logged out successfully');
    }

    public function me()
    {
        return $this->success(auth()->user(), 'Authenticated user');
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());
        return $this->success($user, 'Profile updated');
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = $request->user();
        if (!\Illuminate\Support\Facades\Hash::check($request->current_password, $user->password)) {
            return $this->error('Current password is incorrect', 422);
        }
        $user->update(['password' => bcrypt($request->new_password)]);
        return $this->success(null, 'Password updated');
    }
}