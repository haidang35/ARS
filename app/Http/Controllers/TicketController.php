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
            $destinationDetails = Destination::find($item->flight->destination_id); 
            $item["airline"] = $airlineDetails;
            $item["destination"]  = $destinationDetails;
        }
        return response()->json($tickets);
    }

    public function getTicketDetails($id){
        $ticket = Ticket::with("Flight")->find($id);
        return response()->json($ticket);
    }

    public function updateTicketInfo($id, Request $request){
        $data = [
            "flight_id" => $request->flight_id,
            "ticket_type" => $request->ticket_type,
            "available_class" => $request->available_class,
            "status" => $request->status,
            "carbin_bag" => $request->carbin_bag,
            "checkin_bag" => $request->checkin_bag,
            "price" => $request->price,
            "tax" => $request->tax
        ];
        $ticket = Ticket::with("Flight")->find($id);
        $ticket->update($data);
        return response()->json($ticket);
    }

    public function addNewTicket(Request $request){
        $ticket = Ticket::create([
            "flight_id" => $request->flight_id,
            "ticket_type" => $request->ticket_type,
            "available_class" => $request->available_class,
            "status" => $request->status,
            "carbin_bag" => $request->carbin_bag,
            "checkin_bag" => $request->checkin_bag,
            "price" => $request->price,
            "tax" => $request->tax
        ]);
        $flight = Flight::find($request->flight_id);
        return response()->json($ticket);
    }



    // -------- User --------- //

   
}