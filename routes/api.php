<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\AirlineController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PassengerController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/me', [AuthController::class, "getMyInfo"] );
});

Route::post('auth/register', [AuthController::class, "register"]);
Route::post('auth/login', [AuthController::class, "login"]);


//Destination
Route::get('destinations', [DestinationController::class, "getAllDestination"]);

Route::get('airlines', [AirlineController::class, "getAllAirline"]);

Route::get('flights', [FlightController::class, "getAllFlight"]);

Route::get('tickets', [TicketController::class,  "getAllTicket"]);

Route::get('bookings', [BookingController::class,  "getAllBooking"]);

Route::get('passengers', [PassengerController::class,  "getAllPassenger"]);

Route::post('user/flights/search', [TicketController::class, "searchFlightTicket"]);
