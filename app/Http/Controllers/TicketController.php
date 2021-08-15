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
    public function getAllTicket()
    {
        $tickets = Ticket::with("Flight")->get();
        foreach ($tickets as $item) {
            $departure = Destination::find($item["flight"]["departure_id"]);
            $destination = Destination::find($item["flight"]["destination_id"]);
            $airline = Airline::find($item["flight"]["airline_id"]);
            $item["departure"] = $departure;
            $item["destination"] = $destination;
            $item["airline"] = $airline;
        }
        return response()->json($tickets);
    }

    public function getTicketDetails($id)
    {
        $ticket = Ticket::with("Flight")->find($id);
        $departure = Destination::find($ticket["flight"]["departure_id"]);
        $destination = Destination::find($ticket["flight"]["destination_id"]);
        $airline = Airline::find($ticket["flight"]["airline_id"]);
        $ticket["departure"] = $departure;
        $ticket["destination"] = $destination;
        $ticket["airline"] = $airline;
        return response()->json($ticket);
    }

    public function updateTicketInfo($id, Request $request)
    {
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

    public function addNewTicket(Request $request)
    {
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
        $ticket = Ticket::create($data);
        return response()->json($ticket);
    }



    // -------- User --------- //


}
