<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Flight;
use App\Models\Ticket;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // public function searchFlightTicket(Request $request)
    // {
    //     $tripType = $request->trip_type;
    //     $passengers = $request->passenger;
    //     $departureTime = $request->departure_time;
    //     $departureId = $request->departure;
    //     $destinationId = $request->destination;
    //     $flights = [];
    //     try {
    //        $flights = Flight::with("Ticket")->with("Destination")->with("Departure")->with("Airline")
    //         ->departure($departureId)->destination($destinationId)
    //         ->departuretime($departureTime)->get();
    //     foreach ($flights as $item) {
    //         $item["trip_type"] = $tripType;
    //         $item["passenger"] = $passengers;
    //      }  
    //     }catch(\Exception $exeption) {
    //     }
    //     return $flights;
    // }

    public function searchTickets(Request $request)
    {
        $tripType = $request->trip_type;
        $passengers = array();
        $passenger = $request->passenger;
        // foreach ($passenger as $item) {
        //     if ($item->quantity > 0) {
        //         $pass = [];
        //         $pass["passenger_type"] = $item->passenger_type;
        //         $pass["quantity"] = $item->quantity;
        //         $passengers[] = $pass;
        //     }
        // }
        $departureTime = $request->departure_time;
        $departureId = $request->departure;
        $destinationId = $request->destination;
        $flight = Flight::with("Ticket")->with("Destination")->with("Departure")->with("Airline")
            ->departure($departureId)->destination($destinationId)->departuretime($departureTime)
            ->first();
        $tickets = [];
        try {
            $tickets = Ticket::where("flight_id", $flight->id)->get();
            foreach ($tickets as $item) {
                $item["trip_type"] = $tripType;
                $item["passenger"] = $passenger;
                $item["flight"] = $flight;
            }
        } catch (\Exception) {
        }
        return $tickets;
    }

    public function getDestinationInfo($id)
    {
        $destination = Destination::find($id);
        return response()->json($destination);
    }

    public function searchTicketsWithoutDate(Request $request)
    {
        $departureId = $request->departure;
        $destinationId = $request->destination;
        $flight = Flight::with("Ticket")->with("Destination")->with("Departure")->with("Airline")
            ->departure($departureId)->destination($destinationId)
            ->first();
        $tickets = Ticket::where("flight_id", $flight->id)->get();
        foreach ($tickets as $item) {
            $item["flight"] = $flight;
        }

        return $tickets;
    }
}
