<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Flight;
use App\Models\Ticket;
use Carbon\Carbon;
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

    public function getTicketRoundtripDetails($firstId, $secondId)
    {
        $firstTicket = Ticket::find($firstId);
        $secondTicket = Ticket::find($secondId);
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
        $flight = Flight::findOrFail($request->flight_id);
        if ($flight["seats_available"] > 0) {
            $data = [
                "flight_id" => $request->flight_id,
                "ticket_type" => $request->ticket_type,
                "available_class" => $request->available_class,
                "status" => $request->status,
                "carbin_bag" => $request->carbin_bag,
                "checkin_bag" => $request->checkin_bag,
                "price" => $request->price,
                "tax" => $request->tax,
                "business_seat_fee" => $request->business_seat_fee,
                "economy_seat_fee" => $request->economy_seat_fee,
                "deluxe_seat_fee" => $request->deluxe_seat_fee,
                "exit_seat_fee" => $request->exit_seat_fee,
            ];
            $ticket = Ticket::create($data);
            return response()->json($ticket);
        } else {
            return response()->isServerError();
        }
    }

    public function deleteTicket($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();
        return response()->json($ticket);
    }

    public function getTicketHasDepartureLocation($destinationId)
    {
        $ticketList = [];
        $flights = Flight::with("Departure")->with("Airline")->departure($destinationId)->get();
        foreach ($flights as $item) {
            $departureTime = new Carbon($item["departure_datetime"]);
            if ($departureTime->isFuture()) {
                $ticket = Ticket::where("flight_id", $item["id"])->first();
                $item["destination"] = Destination::with("Image")->find($item["destination_id"]);
                $ticket["flight"] = $item;
                $ticketList[] = $ticket;
            }
        }

        return response()->json($ticketList);
    }

    public function getDiscountTickets()
    {
        $discountTickets = Ticket::all();
        $discTickets = [];
        foreach ($discountTickets as $item) {
            if (($item["price"] + $item["tax"]) < 2000000) {

                $flight = Flight::with("Airline")->with("Departure")->find($item["flight_id"]);
                $flight["destination"] = Destination::with("Image")->find($flight["destination_id"]);
                $item["flight"] = $flight;


                $discTickets[] = $item;
            }
        }
        return response()->json($discTickets);
    }



    // -------- User --------- //


}
