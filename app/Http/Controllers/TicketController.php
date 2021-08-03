<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Flight;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function getAllTicket() {
        $tickets = Ticket::with("Flight")->get();
        foreach($tickets as $item) {
            $airlineDetails = Airline::find($item->flight->airline_id); 
            $departureDetails = Departure::find($item->flight->departure_id); 
            $destinationDetails = Destination::find($item->flight->destination_id); 
            $item["airline"] = $airlineDetails;
            $item["departure"] = $departureDetails;
            $item["destination"]  = $destinationDetails;
        }
        return response()->json($tickets);
    }

    // -------- User --------- //

    public function searchFlightTicket(Request $request) {
        $tripType = $request->trip_type;
        $passengers = $request->passenger;
        $departureTime = $request->departure_time;
        $departureId = $request->departure;
        $destinationId = $request->destination;
        $flights = Flight::with("Ticket")->with("Destination")->with("Departure")->with("Airline")
                    ->departure($departureId)->destination($destinationId)
                    ->departuretime($departureTime)->get();
        foreach($flights as $item) {
            $item["trip_type"] = $tripType;
            $item["passenger"] = $passengers;
        }

        return $flights;

    }
}