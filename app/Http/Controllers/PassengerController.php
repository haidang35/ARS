<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Flight;
use App\Models\Passenger;
use App\Models\Ticket;
use Illuminate\Http\Request;

class PassengerController extends Controller
{
    public function getAllPassenger() {
        $passengers = Passenger::with("Booking")->get();
        foreach($passengers as $item) {
            $ticketDetails = Ticket::find($item->booking->ticket_id);
            // $flightDetails = Flight::find($ticketDetails->flight_id);
            $item["ticket"] = $ticketDetails;
            // $item["flight"] = $flightDetails;
        }
        return response()->json($passengers);
    }

    
}
