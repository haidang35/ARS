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

   
}