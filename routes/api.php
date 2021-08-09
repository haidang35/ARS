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
use App\Http\Controllers\UserController;

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
    Route::get('auth/me', [AuthController::class, "getMyInfo"]);
});

Route::post('auth/register', [AuthController::class, "register"]);
Route::post('auth/login', [AuthController::class, "login"]);


//Destination
Route::get('destinations', [DestinationController::class, "getAllDestination"]);
// Airline
Route::get('airlines', [AirlineController::class, "getAllAirline"]);
Route::get('airlines/{id}', [AirlineController::class, "getAirlineDetails"]);
// Flight
Route::get('flights', [FlightController::class, "getAllFlight"]);
// Ticket
Route::get('tickets', [TicketController::class,  "getAllTicket"]);
// Booking
Route::get('bookings', [BookingController::class,  "getAllBooking"]);
// Passenger
Route::get('passengers', [PassengerController::class,  "getAllPassenger"]);

//User
Route::post('user/flights/search', [UserController::class, "searchTickets"]);
Route::post('user/flights', [UserController::class, "searchTicketsWithoutDate"]);
Route::get('user/destinations/{id}', [UserController::class, "getDestinationInfo"]);
Route::post('user/flights/ticket/{id}', [UserController::class, "getFlightTicket"]);
Route::post('user/booking', [UserController::class, "bookingFlightTicket"]);
