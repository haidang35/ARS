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
use App\Models\Destination;

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
    Route::get('user/my-info', [AuthController::class, "getMyInfo"]);
    Route::get('user/get-booking', [AuthController::class, "getMyBooking"]);
    Route::get('user/get-password', [AuthController::class, "getMyPassword"]);
    Route::put('user/update-password', [AuthController::class, "updatePassword"]);
    Route::patch('user/update-info', [AuthController::class, "upDateMyInfo"]);
});

Route::post('user/register', [AuthController::class, "register"]);
Route::post('user/login', [AuthController::class, "login"]);


//Destination
Route::get('destinations', [DestinationController::class, "getAllDestination"]);
Route::get('destinations/{id}', [DestinationController::class, "getDestinationDetails"]);
Route::patch('destinations/update/{id}', [DestinationController::class, "updateDestinationInfo"]);
Route::post('destinations',[DestinationController::class,"addNewDestination"]);

// Airline
Route::get('airlines', [AirlineController::class, "getAllAirline"]);
Route::get('airlines/{id}', [AirlineController::class, "getAirlineDetails"]);
Route::patch('airlines/update/{id}',[AirlineController::class,"updateAirlineInfo"]);
Route::post('airlines',[AirlineController::class,"addNewAirline"]);

// Flight
Route::get('flights', [FlightController::class, "getAllFlight"]);
Route::get('flights/{id}',[FlightController::class,"getFlightDetails"]);
Route::patch('flights/update/{id}',[FlightController::class,"updateFlightInfo"]);
<<<<<<< HEAD
Route::post('flights',[FlightController::class,"addNewFlight"]);
=======
>>>>>>> ab425e93d5476962b172474bd613d3763ba1213b
// Ticket
Route::get('tickets', [TicketController::class,  "getAllTicket"]);
Route::get('tickets/{id}',[TicketController::class, "getTicketDetails"]);
Route::patch('tickets/update/{id}',[TicketController::class,"updateTicketInfo"]);
Route::post('tickets',[TicketController::class,"addNewTicket"]);
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
Route::post('user/find-route', [UserController::class, "findRouteFlight"]);
