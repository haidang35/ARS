<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function getAllFlight() {
        $flights = Flight::with("Destination")->with("Airline")->get();
        return response()->json($flights);
    }
    public function getFlightDetails($id){
        $flight = Flight::with("Destination")->with("Airline")->find($id);
        return response()->json($flight);
    }
    public function updateFlightInfo($id,Request $request){
        $data =[
            "flight_code"=>$request->flight_code,
            "departure_datetime" =>$request->departure_datetime,
            "arrival_datetime"=>$request->arrival_datetime,
            "aircraft"=>$request->aircraft,
            "airline_id"=>$request->airline_id,
            "destination_id"=>$request->destination_id,
            "capacity"=>$request->capacity,
            "seats_reserved"=>$request->seats_reserved,
            "seats_available"=>$request->seats_available
        ];
        $flight = Flight::with("Destination")->with("Airline")->find($id);      
        $flight->update($data);
        return response()->json($flight);
    }

    public function addNewFlight(Request $request){
        $data = [
            "flight_code" => $request->flight_code,
            "departute_datetime" => $request->departure_datetime,
            "arrival_datetime" => $request->arrival_datetime,
            "aircraft" => $request->aircraft,
            "airline_id" => $request->airline_id,
            "destination_id" => $request->destination_id,
            "capacity" => $request->capacity,
            "seats_reserved" => $request->seats_reserved,
            "seats_available" => $request->seats_available
        ];
        $flight = Flight::with("Destination")->with("Airline")->create($data);
        return response()->json($flight);
    }
}
