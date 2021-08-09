<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLogin;
use Illuminate\Http\Request;
use App\Http\Requests\UserRegister;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(UserRegister $request)
    {
        $validated = $request->validated();
        $validated["password"] = Hash::make($validated["password"]);
        $user = User::create($validated);
        return response()->json(["user" => $user, "msg" => "Register successful !"], 200);
    }

    public function login(UserLogin $request)
    {
        $validated = $request->validated();
        if (auth()->attempt($validated)) {
            $user = Auth::user();
            $token = $user->createToken('dnj')->plainTextToken;
            return response()->json(["user" => $user, "token" => $token]);
        } else {
            return response()->json(["message" => "Login failed !"], 211);
        }
    }

    public function getMyInfo()
    {
        return auth()->user();
    }
}
