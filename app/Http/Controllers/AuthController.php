<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLogin;
use Illuminate\Http\Request;
use App\Http\Requests\UserRegister;
use App\Http\Requests\UserUpdateInfo;
use App\Models\Booking;
use App\Models\BookingTicket;
use App\Models\Flight;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
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

    public function getMyBooking()
    {
        $userId = auth()->user()->id;
        $bookings = [];
        $bookings = Booking::where("user_id", $userId)->with("Passenger")->get();
        foreach ($bookings as $item) {
            $bookingTicket = BookingTicket::where("booking_id", $item["id"])->with("Ticket")->first();
            $ticket = Ticket::find($bookingTicket["ticket_id"]);
            $flight = Flight::with("Destination")->with("Departure")->with("Airline")->find($bookingTicket["ticket"]["flight_id"]);
            $item["flight"] = $flight;
            $item["ticket"] = $ticket;
        }
        return response()->json($bookings);
    }

    public function getMyPassword()
    {
        $password = auth()->user()->password;
        return response()->json($password);
    }

    public function updatePassword(Request $request)
    {
        $user = auth()->user();
        $userInfo = User::findOrFail($user->id);
        $userInfo->update([
            "password" => Hash::make($request->password)
        ]);
        $password = Crypt::decrypt(auth()->user()->password);
        return  $password;
    }

    public function upDateMyInfo(UserUpdateInfo $request)
    {
        $validated = $request->validated();
        $userId = auth()->user()->id;
        $user = User::findOrFail($userId);
        if ($user["email"] == $validated["email"]) {
            $user->update($validated);
            return response()->json($user);
        } else {
            $findEmailExist = User::where("email", $validated["email"])->first();
            if ($findEmailExist) {
                return response()->isServerError(500);
            }
            $user->update($validated);
            return response()->json($user);
        }
    }
}
