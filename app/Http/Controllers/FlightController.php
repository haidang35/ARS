<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\FlightSeat;
use App\Models\Price;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function getAllFlight()
    {
        $flights = Flight::with("Destination")->with("Departure")->with("Airline")->get();
        return response()->json($flights);
    }
    public function getFlightDetails($id)
    {
        $flight = Flight::with("Destination")->with("Departure")->with("Airline")->find($id);
        return response()->json($flight);
    }
    public function updateFlightInfo($id, Request $request)
    {
        $data = [
            "flight_code" => $request->flight_code,
            "departure_datetime" => $request->departure_datetime,
            "arrival_datetime" => $request->arrival_datetime,
            "aircraft" => $request->aircraft,
            "airline_id" => $request->airline_id,
            "departure_id" => $request->departure_id,
            "destination_id" => $request->destination_id,
            "capacity" => $request->capacity,
            "seats_reserved" => $request->seats_reserved,
            "seats_available" => $request->seats_available
        ];
        $flight = Flight::with("Destination")->with("Departure")->with("Airline")->find($id);
        $flight->update($data);
        return response()->json($flight);
    }

    public function addNewFlight(Request $request)
    {
        $data = [
            "flight_code" => $request->flight_code,
            "departure_datetime" => $request->departure_datetime,
            "arrival_datetime" => $request->arrival_datetime,
            "aircraft" => $request->aircraft,
            "airline_id" => $request->airline_id,
            "departure_id" => $request->departure_id,
            "destination_id" => $request->destination_id,
            "capacity" => $request->capacity,
            "seats_reserved" => $request->seats_reserved,
            "seats_available" => $request->seats_available,
            "business_seats" => $request->business_seats,
            "economy_seats" => $request->economy_seats,
            "exit_seats" => $request->exit_seats,
            "first_economy_seats" => $request->first_economy_seats
        ];
        $flight = Flight::create($data);
        $priceData = $request->price_data;
        foreach ($priceData as $item) {
            Price::create([
                "flight_id" => $flight["id"],
                "class" => $item["class"],
                "price" => $item["price"]
            ]);
        }
        return response()->json($flight);
    }

    public function deleteFlight($id)
    {
        $flight = Flight::findOrFail($id);
        $flight->delete();
        return $flight;
    }
    public function getFlightClasses($id)
    {
        $flightClasses = Price::where("flight_id", $id)->with("Flight")->get();
        return response()->json($flightClasses);
    }
}
