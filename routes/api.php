<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\AirlineController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ChatBoxController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\UserController;
use App\Models\Destination;
use App\Models\Flight;
use App\Models\Notification;

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
    Route::delete('user/booking/{id}', [UserController::class, "cancelBooking"]);
    // Route::get('user/booking/{id}', [UserController::class, "getBookingDetails"]);

    //Message
    Route::get('my-message', [ChatBoxController::class, "fetchMessage"]);
    Route::post('send-message', [ChatBoxController::class, "sendMessage"]);
    Route::get('list-people-chat', [ChatBoxController::class, "getListPeopleChat"]);
    Route::get('messages/{userId}', [ChatBoxController::class, "getIncomingMessage"]);
});

Route::post('user/register', [AuthController::class, "register"]);
Route::post('user/login', [AuthController::class, "login"]);
Route::post('admin/login', [AuthController::class, "adminLogin"]);
Route::post('admin/register', [AuthController::class, "adminRegister"]);

//Overview
Route::get('overview-info', [AdminController::class, "getOverviewInfo"]);


//Destination
Route::get('destinations', [DestinationController::class, "getAllDestination"]);
Route::get('destinations/{id}', [DestinationController::class, "getDestinationDetails"]);
Route::patch('destinations/update/{id}', [DestinationController::class, "updateDestinationInfo"]);
Route::post('destinations', [DestinationController::class, "addNewDestination"]);
Route::put('destinations/favourite/{id}', [DestinationController::class, "updateFavouriteDestination"]);
Route::get('destinations/favourite/get', [DestinationController::class, "getFavouriteDestinations"]);
Route::post('destinations/upload-image/{id}', [DestinationController::class, "uploadImageDestination"]);
Route::delete('destinations/{id}', [DestinationController::class, "deleteDestination"]);

// Airline
Route::get('airlines', [AirlineController::class, "getAllAirline"]);
Route::get('airlines/{id}', [AirlineController::class, "getAirlineDetails"]);
Route::patch('airlines/update/{id}', [AirlineController::class, "updateAirlineInfo"]);
Route::post('airlines', [AirlineController::class, "addNewAirline"]);
Route::delete('airlines/{id}', [AirlineController::class, "deleteAirline"]);

// Flight
Route::get('flights', [FlightController::class, "getAllFlight"]);
Route::get('flights/{id}', [FlightController::class, "getFlightDetails"]);
Route::patch('flights/update/{id}', [FlightController::class, "updateFlightInfo"]);
Route::post('flights', [FlightController::class, "addNewFlight"]);
Route::delete('flights/{id}', [FlightController::class, "deleteFlight"]);
Route::get('flights/class/{id}', [FlightController::class, "getFlightClasses"]);
Route::get('flights/seats-reserved/{id}', [FlightController::class, "getSeatReserved"]);


// Ticket
Route::get('tickets', [TicketController::class,  "getAllTicket"]);
Route::get('tickets/{id}', [TicketController::class, "getTicketDetails"]);
Route::get('tickets/{firstId}/{secondId}', [TicketController::class, "getTicketRoundtripDetails"]);
Route::patch('tickets/update/{id}', [TicketController::class, "updateTicketInfo"]);
Route::post('tickets', [TicketController::class, "addNewTicket"]);
Route::delete('tickets/{id}', [TicketController::class, "deleteTicket"]);
Route::get('tickets-location/{destinationId}', [TicketController::class, "getTicketHasDepartureLocation"]);
Route::get('discount-tickets', [TicketController::class, "getDiscountTickets"]);

// Booking
Route::get('bookings', [BookingController::class,  "getAllBooking"]);
Route::get('bookings/{id}', [BookingController::class, "getBookingDetails"]);
Route::patch('bookings/update/{id}', [BookingController::class, "updateBooking"]);
Route::put('bookings/confirm/{id}', [BookingController::class, "updateBookingStatus"]);

// Passenger
Route::get('passengers', [PassengerController::class,  "getAllPassenger"]);
Route::get('passengers/{id}', [PassengerController::class, "getPassengerDetails"]);


//User
Route::post('user/flights/search', [UserController::class, "searchTickets"]);
Route::post('user/flights', [UserController::class, "searchTicketsWithoutDate"]);
Route::get('user/destinations/{id}', [UserController::class, "getDestinationInfo"]);
Route::post('user/flights/ticket/{id}', [UserController::class, "getFlightTicket"]);
Route::post('user/booking', [UserController::class, "bookingFlightTicket"]);
Route::put('user/booking/payment/{id}', [UserController::class, "paymentBooking"]);
Route::get('user/booking/{id}', [UserController::class, "getBookingInfo"]);
Route::post('user/find-route', [UserController::class, "findRouteFlight"]);
Route::get('user/payment', [UserController::class, "bookingPayment"]);
Route::post('user/search/flight', [UserController::class, "searchFlightInfo"]);
Route::get('user/booking-info/{bookingCode}', [UserController::class, "getBookingInfoWithCode"]);
Route::get('user/ticket/seats/{id}', [UserController::class, "getSeatsFlightInfo"]);
Route::get('user/flight-seats/{ticketId}', [UserController::class, "getFlightSeatReserved"]);
Route::post('user/choose-seat/{ticketId}', [UserController::class, "chooseFlightSeat"]);
Route::post('user/cancel-choose-seat/{ticketId}', [UserController::class, "cancelChooseFlightSeat"]);

//Image
Route::get("destinations/images/{id}", [DestinationController::class, "getImageList"]);

//Notification
Route::get("notifications", [NotificationController::class, "getNotificationList"]);
Route::get("notifications/new", [NotificationController::class, "getNewNotification"]);
Route::patch("notifications/update", [NotificationController::class, "updateReadNotification"]);
