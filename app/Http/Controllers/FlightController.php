<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function getAllFlight() {
        $flights = Flight::with("Destination")->with("Departure")->with("Airline")->get();
        return response()->json($flights);
    }
}
