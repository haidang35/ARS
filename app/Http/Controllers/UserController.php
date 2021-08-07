<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Flight;
use App\Models\Passenger;
use App\Models\Ticket;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function searchTickets(Request $request)
    {
        $tripType = $request->trip_type;
        $passenger = $request->passenger;
        $departureTime = $request->departure_time;
        $departureId = $request->departure;
        $destinationId = $request->destination;
        $flights = Flight::with("Ticket")->with("Destination")->with("Departure")->with("Airline")
            ->departure($departureId)->destination($destinationId)->departuretime($departureTime)
            ->get();
        $tickets = [];
        foreach ($flights as $flight) {
            $ticketFlight = Ticket::where("flight_id", $flight->id)->get();
            foreach ($ticketFlight as $item) {
                $item["trip_type"] = $tripType;
                $item["passenger"] = $passenger;
                $item["flight"] = $flight;
                $item["total_price"] = $item->price + $item->tax;
                $item["into_money"] = $this->calcIntoMoney($passenger, $item->price, $item->tax);
                $tickets[] = $item;
            }
        }
        return $tickets;
    }

    private function calcIntoMoney($passengers, $price, $tax)
    {
        $intoMoney = 0;
        foreach ($passengers as $item) {
            if ($item["quantity"] > 0) {
                $intoMoney += $item["quantity"] * $price + $tax;
            }
        }
        return $intoMoney;
    }


    public function getDestinationInfo($id)
    {
        $destination = Destination::find($id);
        return response()->json($destination);
    }

    public function searchTicketsWithoutDate(Request $request)
    {
        $tripType = $request->trip_type;
        $passenger = $request->passenger;
        $departureId = $request->departure;
        $destinationId = $request->destination;
        $flights = [];
        $flights = Flight::with("Ticket")->with("Destination")->with("Departure")->with("Airline")
            ->departure($departureId)->destination($destinationId)
            ->get();
        $tickets = [];
        foreach ($flights as $flight) {
            $ticketFlight = Ticket::where("flight_id", $flight->id)->get();
            foreach ($ticketFlight as $item) {
                $item["trip_type"] = $tripType;
                $item["passenger"] = $passenger;
                $item["flight"] = $flight;
                $item["total_price"] = $item->price + $item->tax;
                $item["into_money"] = $this->calcIntoMoney($passenger, $item->price, $item->tax);
                $tickets[] = $item;
            }
        }

        return $tickets;
    }

    public function getFlightTicket($id, Request $request)
    {
        $tripType = $request->trip_type;
        $passenger = $request->passenger;
        $ticket = Ticket::findOrFail($id);
        $flight = Flight::with("Departure")->with("Destination")->with("Airline")->find($ticket->flight_id);
        $ticket["trip_type"] = $tripType;
        $ticket["passenger"] = $passenger;
        $ticket["total_price"] = $ticket->price + $ticket->tax;
        $ticket["into_money"] = $this->calcIntoMoney($passenger, $ticket->price, $ticket->tax);
        $ticket["flight"] = $flight;

        return response()->json($ticket);
    }
}
