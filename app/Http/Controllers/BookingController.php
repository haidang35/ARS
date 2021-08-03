<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use App\Models\Booking;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Flight;
use App\Models\Ticket;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function getAllBooking() {
        $bookings = Booking::with("Ticket")->withCount("Passenger")->get();
        foreach($bookings as $item) {
            $flightDetails = Flight::find($item->ticket->flight_id);
            $airlineDetails = Airline::find($flightDetails->airline_id);
            $departureDetails = Departure::find($flightDetails->departure_id);
            $destinationDetails = Destination::find($flightDetails->destination_id);
            $item["flight"] = $flightDetails;
            $item["airline"] = $airlineDetails;
            $item["departure"] = $departureDetails;
            $item["destination"] = $destinationDetails;
        }
        return response() ->json($bookings);
    }
}
